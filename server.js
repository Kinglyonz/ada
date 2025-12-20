require('dotenv').config();
const express = require('express');
const pa11y = require('pa11y');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { exec } = require('child_process');

// Import data services
let db;
if (process.env.DATABASE_URL) {
  console.log('🐘 Using AWS RDS / PostgreSQL Database');
  db = require('./services/db-postgres');
} else if (process.env.SUPABASE_URL) {
  console.log('☁️ Using Supabase Database');
  db = require('./services/db-supabase');
} else {
  console.log('📂 Using Local SQLite Database');
  db = require('./services/db');
}
const crawler = require('./services/crawler');
const scanQueue = require('./services/scanQueue');
const contentAnalysis = require('./services/contentAnalysis');
const { generateExecutiveReport, generateCrawlReport } = require('./services/reportGenerator');

// Initialize Database
db.init();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Support form submissions

// Cache-busting middleware - prevent browser from caching during development
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

app.use(express.static('public'));

// Scanner configuration
const scanOptions = {
  standard: 'WCAG2AA',
  runners: ['axe'],
  includeNotices: false,
  includeWarnings: true,
  timeout: 30000,
  wait: 1000,
  chromeLaunchConfig: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
};

// API endpoint to scan PDFs
app.post('/api/scan-pdf', upload.array('pdfs', 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No PDF files uploaded' });
  }

  try {
    const results = [];

    for (const file of req.files) {
      console.log(`Checking File: ${file.originalname}`);

      const pdfResult = {
        filename: file.originalname,
        size: file.size,
        issues: [],
        warnings: []
      };

      const buffer = fs.readFileSync(file.path);

      try {
        if (file.mimetype === 'application/pdf') {
          // 1. Tag Check (Basic Manual Check)
          const rawAndSimple = buffer.toString('latin1');

          // CRITICAL: Check for structure tags
          if (!rawAndSimple.includes('/StructTreeRoot')) {
            pdfResult.issues.push('PDF is not tagged (missing structure tree) - Screen readers cannot navigate this document');
          }

          // Document language is required for ADA compliance
          if (!rawAndSimple.includes('/Lang')) {
            pdfResult.issues.push('Document language is not specified - Screen readers may mispronounce content');
          }

          // Check for document title (required for accessibility)
          if (!rawAndSimple.includes('/Title')) {
            pdfResult.issues.push('Document title metadata is missing - Users cannot identify document purpose');
          }

          // Check for bookmarks/outlines (important for navigation)
          if (!rawAndSimple.includes('/Outlines')) {
            pdfResult.warnings.push('Document lacks bookmarks/navigation - Large documents need table of contents');
          }

          // 2. Content Analysis (Text Layer vs Scan)
          const analysis = await contentAnalysis.analyzePDF(buffer);

          // Merge detailed issues from analysis
          if (analysis.issues && analysis.issues.length > 0) {
            pdfResult.issues.push(...analysis.issues);
          }

          if (analysis.warnings && analysis.warnings.length > 0) {
            pdfResult.warnings.push(...analysis.warnings);
          }

          // Pass the generated HTML preview
          if (analysis.htmlPreview) {
            console.log(`[Server] Attaching HTML Preview (${analysis.htmlPreview.length} chars)`);
            pdfResult.htmlPreview = analysis.htmlPreview;
          } else {
            console.log('[Server] No HTML Preview generated from analysis');
          }

          if (analysis.isScanned) {
            // Already handled in analysis.issues usually, but ensure note is set
            pdfResult.scannerNote = "Requires OCR";
          }

          // Check if document has very little text (possible scan)
          if (analysis.textLength < 50) {
            pdfResult.issues.push('Document appears to be image-only or has minimal text content - May require OCR');
          }

        } else if (file.mimetype.startsWith('image/')) {
          // It's an image, let's OCR it
          console.log('Running OCR on image...');
          const ocrResult = await contentAnalysis.analyzeImage(buffer);
          pdfResult.warnings.push(`OCR Text Extracted: "${ocrResult.text.substring(0, 50).replace(/\n/g, ' ')}..."`);
          pdfResult.issues.push('Image file used as document. Ensure Alt Text is provided if embedded.');
        }

      } catch (err) {
        console.error(`Analysis failed for ${file.originalname}:`, err);
        pdfResult.warnings.push('Failed to fully analyze document content.');
      }

      results.push(pdfResult);

      // Clean up uploaded file
      try { fs.unlinkSync(file.path); } catch (e) { }
    }

    res.json({
      totalFiles: results.length,
      results: results,
      summary: {
        totalIssues: results.reduce((sum, r) => sum + r.issues.length, 0),
        totalWarnings: results.reduce((sum, r) => sum + r.warnings.length, 0)
      }
    });

  } catch (error) {
    console.error('PDF scan error:', error);
    // Clean up files on error
    if (req.files) {
      req.files.forEach(file => {
        try { fs.unlinkSync(file.path); } catch (e) { }
      });
    }
    res.status(500).json({
      error: 'PDF scan failed',
      message: error.message
    });
  }
});

// API endpoint to scan a URL
app.post('/api/scan', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    console.log(`Scanning: ${url}`);
    const results = await pa11y(url, scanOptions);

    const summary = {
      url: results.pageUrl,
      title: results.documentTitle,
      total: results.issues.length,
      errors: results.issues.filter(i => i.type === 'error').length,
      warnings: results.issues.filter(i => i.type === 'warning').length,
      notices: results.issues.filter(i => i.type === 'notice').length,
      timestamp: new Date().toISOString()
    };

    // Categorize issues
    const categories = {
      'Perceivable': 0,
      'Operable': 0,
      'Understandable': 0,
      'Robust': 0,
      'Other': 0
    };

    results.issues.forEach(issue => {
      const code = issue.code.toUpperCase();
      if (code.includes('IMAGE') || code.includes('CONTRAST') || code.includes('COLOR') || code.includes('TEXT')) {
        categories['Perceivable']++;
      } else if (code.includes('LINK') || code.includes('BUTTON') || code.includes('FOCUS') || code.includes('KEYBOARD')) {
        categories['Operable']++;
      } else if (code.includes('LABEL') || code.includes('LANG') || code.includes('HEADING')) {
        categories['Understandable']++;
      } else if (code.includes('ARIA') || code.includes('ROLE') || code.includes('MARKUP')) {
        categories['Robust']++;
      } else {
        categories['Other']++;
      }
    });

    // Group issues by code with full details for each occurrence
    const issueGroups = {};
    results.issues.forEach(issue => {
      const key = issue.code;
      if (!issueGroups[key]) {
        issueGroups[key] = {
          code: issue.code,
          type: issue.type,
          message: issue.message,
          count: 0,
          impact: issue.runnerExtras?.impact || 'unknown',
          helpUrl: issue.runnerExtras?.helpUrl || issue.runnerExtras?.help || '',
          occurrences: []
        };
      }
      issueGroups[key].count++;
      issueGroups[key].occurrences.push({
        selector: issue.selector,
        context: issue.context,
        runner: issue.runner
      });
    });

    // Sort by count (most common first)
    const detailedIssues = Object.values(issueGroups)
      .sort((a, b) => b.count - a.count);

    res.json({
      summary,
      categories,
      detailedIssues, // All issues with locations
      totalUniqueIssues: detailedIssues.length
    });

  } catch (error) {
    console.error('Scan error:', error);
    res.status(500).json({
      error: 'Scan failed',
      message: error.message
    });
  }
});

// --- Compliance Scanner (Crawler) ---
app.post('/api/crawl/start', upload.none(), async (req, res) => {
  const { url, maxPages } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  console.log(`[API] Starting crawl for ${url}`);
  try {
    const domain = new URL(url).hostname;

    // Create Crawl Record
    db.db.run("INSERT INTO crawls (domain, status, total_pages) VALUES (?, 'running', 0)", [domain], async function (err) {
      if (err) return res.status(500).json({ error: 'DB Error' });

      const crawlId = this.lastID;
      res.json({ success: true, crawlId, message: 'Crawl started' });

      // Start Background Crawl
      try {
        const urls = await crawler.crawl(url, maxPages ? parseInt(maxPages) : Infinity);
        console.log(`[API] Crawl found ${urls.length} pages. Queueing scans...`);

        db.db.run("UPDATE crawls SET total_pages = ? WHERE id = ?", [urls.length, crawlId]);

        urls.forEach(u => scanQueue.addJob(u, crawlId));

      } catch (e) {
        console.error('[API] Crawl failed', e);
        db.db.run("UPDATE crawls SET status = 'failed' WHERE id = ?", [crawlId]);
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// File Logger
function logError(msg, err) {
  const log = `[${new Date().toISOString()}] ${msg} ${err ? (err.stack || err) : ''}\n`;
  try { fs.appendFileSync('server_error.log', log); } catch (e) { }
  console.error(msg, err);
}

// Discovery-Only Crawl (Phase 1 of Split Spider)
app.post('/api/crawl/discover', upload.none(), async (req, res) => {
  const { url, maxPages } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  logError(`[API] Starting discovery for ${url}`);
  try {
    const domain = new URL(url).hostname;

    // Create Crawl Record with 'discovering' status
    db.db.run("INSERT INTO crawls (domain, status, total_pages) VALUES (?, 'discovering', 0)", [domain], async function (err) {
      if (err) return res.status(500).json({ error: 'DB Error' });

      const crawlId = this.lastID;
      res.json({ success: true, crawlId, status: 'discovering', message: 'Discovery started' });

      // Start Background Discovery (Live Streaming)
      try {
        const limit = maxPages ? parseInt(maxPages) : Infinity; // No limit by default - scan all pages
        const discoveredUrls = new Set();

        // Callback for real-time DB insertion with DEPTH TRACKING
        const onDiscover = (u, depth = 0, parentUrl = null) => {
          // CHECK ABORT FLAG - stop inserting if user clicked Stop
          const crawlStatus = crawler.isAborted ? crawler.isAborted(crawlId) : false;
          if (crawlStatus) {
            console.log(`🛑 Skipping insert for ${u} - crawl aborted`);
            return;
          }

          if (!u || discoveredUrls.has(u)) return;
          discoveredUrls.add(u);

          const stmt = db.db.prepare(`INSERT INTO scans (url, score, total_issues, errors, warnings, notices, detailed_json, crawl_id, scan_status, depth, parent_url) VALUES (?, 0, 0, 0, 0, 0, '[]', ?, 'pending', ?, ?)`);
          stmt.run(u, crawlId, depth, parentUrl, (err) => {
            stmt.finalize();
          });
        };

        // Register this crawl for abort tracking
        crawler.startCrawlTracking(crawlId);

        const urls = await crawler.crawl(url, limit, onDiscover, crawlId);

        console.log(`[API] Discovery finished. Unique pages found: ${discoveredUrls.size}`);
        db.db.run("UPDATE crawls SET total_pages = ?, status = 'discovered' WHERE id = ?", [discoveredUrls.size, crawlId]);

      } catch (e) {
        logError('[API] Crawl failed', e);
        db.db.run("UPDATE crawls SET status = 'failed' WHERE id = ?", [crawlId]);
      }
    });
  } catch (e) {
    logError('[API] Outer Discovery Error', e);
    res.status(500).json({ error: e.message });
  }
});

// Stop Discovery (Abort crawl)
app.post('/api/crawl/stop/:id', (req, res) => {
  const crawlId = parseInt(req.params.id);
  console.log(`[API] Stopping discovery for crawl ${crawlId}`);

  // Set abort flag in crawler
  const aborted = crawler.abortCrawl(crawlId);

  // Update DB status to stopped
  db.db.run("UPDATE crawls SET status = 'stopped' WHERE id = ?", [crawlId]);

  res.json({ success: true, aborted, message: 'Discovery stopped' });
});

// Get the latest crawl ID (for Site Map refresh after page reload)
app.get('/api/crawl/latest', (req, res) => {
  db.db.get("SELECT id FROM crawls ORDER BY timestamp DESC LIMIT 1", [], (err, row) => {
    if (err || !row) return res.json({ crawlId: null });
    res.json({ crawlId: row.id });
  });
});

app.get('/api/crawl/status/:id', (req, res) => {
  const crawlId = req.params.id;
  db.db.get("SELECT * FROM crawls WHERE id = ?", [crawlId], (err, crawl) => {
    if (err || !crawl) return res.status(404).json({ error: 'Not found' });

    db.db.all("SELECT id, url, score, total_issues, errors, timestamp, scan_status, depth, parent_url FROM scans WHERE crawl_id = ? ORDER BY depth ASC, timestamp DESC", [crawlId], (err, scans) => {
      if (err) return res.status(500).json({ error: 'DB Error' });

      const progress = crawl.total_pages > 0 ? Math.round((scans.length / crawl.total_pages) * 100) : 0;
      res.json({ crawl, scans, progress });
    });
  });
});

// Scan a single pending page (Phase 2 of Split Spider)
app.post('/api/scan/page/:scanId', async (req, res) => {
  const scanId = req.params.scanId;

  // Get the scan record
  db.db.get("SELECT * FROM scans WHERE id = ?", [scanId], async (err, scan) => {
    if (err || !scan) return res.status(404).json({ error: 'Scan not found' });
    if (scan.scan_status !== 'pending') {
      return res.status(400).json({ error: 'Page already scanned or in progress' });
    }

    // Update status to 'scanning'
    db.db.run("UPDATE scans SET scan_status = 'scanning' WHERE id = ?", [scanId]);

    res.json({ success: true, message: 'Scan started' });

    // Queue the scan
    scanQueue.addJob(scan.url, scan.crawl_id, scanId);
  });
});

// Scan all pending pages in a crawl (Phase 2 of Split Spider)
app.post('/api/scan/all/:crawlId', async (req, res) => {
  const crawlId = req.params.crawlId;

  // Get all pending scans for this crawl
  db.db.all("SELECT * FROM scans WHERE crawl_id = ? AND scan_status = 'pending'", [crawlId], (err, scans) => {
    if (err) return res.status(500).json({ error: 'DB Error' });

    if (scans.length === 0) {
      return res.json({ success: true, message: 'No pending pages to scan', totalPages: 0 });
    }

    // Update crawl status to 'scanning'
    db.db.run("UPDATE crawls SET status = 'scanning' WHERE id = ?", [crawlId]);

    // Queue all pending scans
    scans.forEach(scan => {
      db.db.run("UPDATE scans SET scan_status = 'scanning' WHERE id = ?", [scan.id]);
      scanQueue.addJob(scan.url, crawlId, scan.id);
    });

    res.json({ success: true, message: `Queued ${scans.length} pages for scanning`, totalPages: scans.length });
  });
});

// Stop scanning (Clear queue)
app.post('/api/scan/stop/:crawlId', async (req, res) => {
  const crawlId = req.params.crawlId;

  console.log(`[API] Stopping scans for crawl ${crawlId}`);

  // 1. Clear memory queue
  scanQueue.clear(crawlId);

  // 2. Update DB: Mark 'scanning' items as 'pending' (or 'stopped'?)
  // Actually, let's mark the CRAWL as 'stopped'
  db.db.run("UPDATE crawls SET status = 'stopped' WHERE id = ?", [crawlId]);

  // 3. Mark any 'scanning' items that haven't finished as 'pending' (so they can be retried)
  // Or stuck in 'scanning'? Pa11y might still be running for a few.
  // Best to just leave them. The queue clear prevents NEW ones.
  // We can updated 'scanning' to 'pending' if we want to reset them.
  // But let's just accept that 'scanning' ones will finish or timeout.

  res.json({ success: true, message: 'Scan stopped' });
});

// Get detailed issues for a specific scan
app.get('/api/scan/:id/issues', (req, res) => {
  const scanId = req.params.id;
  db.db.get("SELECT url, detailed_json FROM scans WHERE id = ?", [scanId], (err, row) => {
    if (err || !row) return res.status(404).json({ error: 'Scan not found' });

    try {
      const issues = row.detailed_json ? JSON.parse(row.detailed_json) : [];
      res.json({ url: row.url, issues });
    } catch (e) {
      res.status(500).json({ error: 'Failed to parse issues' });
    }
  });
});

// --- Reports & History ---
app.get('/api/report/crawl/:id', (req, res) => {
  const crawlId = req.params.id;
  db.db.get("SELECT * FROM crawls WHERE id = ?", [crawlId], (err, crawl) => {
    if (err || !crawl) return res.status(404).json({ error: 'Crawl not found' });
    db.db.all("SELECT * FROM scans WHERE crawl_id = ?", [crawlId], (err, scans) => {
      if (err) return res.status(500).json({ error: 'DB Error ' });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=compliance-report-${crawlId}.pdf`);
      generateCrawlReport(crawl, scans, res);
    });
  });
});

app.get('/api/report/crawl/:id/csv', (req, res) => {
  const crawlId = req.params.id;
  db.db.get("SELECT * FROM crawls WHERE id = ?", [crawlId], (err, crawl) => {
    if (err || !crawl) return res.status(404).send('Crawl not found');

    db.db.all("SELECT * FROM scans WHERE crawl_id = ?", [crawlId], (err, scans) => {
      if (err) return res.status(500).send('DB Error');

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename=compliance-report-${crawl.domain}-${new Date().toISOString().split('T')[0]}.csv`);

      // Enhanced CSV with detailed issue breakdown
      let csv = '\uFEFF'; // UTF-8 BOM for Excel compatibility
      csv += 'URL,Total Issues,Errors,Warnings,Issue Code,Issue Type,Issue Message,Occurrences\n';

      scans.forEach(scan => {
        const safeUrl = scan.url.includes(',') ? `"${scan.url}"` : scan.url;

        // Parse detailed issues if available
        let issues = [];
        try {
          issues = scan.detailed_json ? JSON.parse(scan.detailed_json) : [];
        } catch (e) {
          console.error('Failed to parse issues for', scan.url);
        }

        if (issues.length > 0) {
          // Group issues by code
          const issueGroups = {};
          issues.forEach(issue => {
            const key = issue.code;
            if (!issueGroups[key]) {
              issueGroups[key] = {
                code: issue.code,
                type: issue.type,
                message: issue.message,
                count: 0
              };
            }
            issueGroups[key].count++;
          });

          // Write one row per unique issue type
          Object.values(issueGroups).forEach(issue => {
            const safeMessage = `"${issue.message.replace(/"/g, '""')}"`;
            csv += `${safeUrl},${scan.total_issues},${scan.errors},${scan.warnings},${issue.code},${issue.type},${safeMessage},${issue.count}\n`;
          });
        } else {
          // No detailed issues, just write summary row
          csv += `${safeUrl},${scan.total_issues},${scan.errors},${scan.warnings},,,No issues found,0\n`;
        }
      });

      res.send(csv);
    });
  });
});

app.get('/api/reports/history', async (req, res) => {
  try {
    const history = await db.getHistory(20);
    res.json(history);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/reports/executive/:id', async (req, res) => {
  try {
    const scan = await db.getScanDetails(req.params.id);
    if (!scan) return res.status(404).json({ error: 'Scan not found' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=executive-report-${scan.id}.pdf`);
    generateExecutiveReport(scan, res);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// API endpoint to get detailed issues for a specific scan
app.get('/api/scan/:id/issues', (req, res) => {
  const scanId = req.params.id;

  db.db.get('SELECT detailed_json FROM scans WHERE id = ?', [scanId], (err, row) => {
    if (err) {
      console.error('Error fetching scan issues:', err);
      return res.status(500).json({ error: 'Failed to fetch issues' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    try {
      const issues = row.detailed_json ? JSON.parse(row.detailed_json) : [];
      res.json({ issues });
    } catch (parseError) {
      console.error('Error parsing issues JSON:', parseError);
      res.status(500).json({ error: 'Failed to parse issues data' });
    }
  });
});

// Echo endpoint to force file download with correct name (CSV)
app.post('/api/download-csv', (req, res) => {
  try {
    const { csv, filename } = req.body;
    if (!csv) return res.status(400).send('Missing CSV data');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'export.csv'}"`);
    res.send(csv);
  } catch (e) {
    console.error('Download error:', e);
    res.status(500).send('Download failed');
  }
});

// Echo endpoint for HTML
app.post('/api/download-html', (req, res) => {
  try {
    const { html, filename } = req.body;
    if (!html) return res.status(400).send('Missing HTML data');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'document.html'}"`);
    res.send(html);
  } catch (e) {
    console.error('Download HTML error:', e);
    res.status(500).send('Download failed');
  }
});

// CSV Export for Crawl Results (Compliance Scanner)
app.get('/api/report/crawl/:id/csv', (req, res) => {
  const crawlId = req.params.id;

  // First get the crawl to get domain name for filename
  db.db.get("SELECT domain FROM crawls WHERE id = ?", [crawlId], (err, crawl) => {
    if (err || !crawl) {
      return res.status(404).json({ error: 'Crawl not found' });
    }

    const domain = crawl.domain || 'unknown';
    const date = new Date().toISOString().split('T')[0];

    db.db.all("SELECT url, scan_status, errors, warnings, total_issues, detailed_json FROM scans WHERE crawl_id = ? ORDER BY errors DESC", [crawlId], (err, scans) => {
      if (err) {
        console.error('CSV Export error:', err);
        return res.status(500).json({ error: 'Failed to export' });
      }

      if (!scans || scans.length === 0) {
        return res.status(404).json({ error: 'No scans found for this crawl' });
      }

      // Build CSV
      const BOM = '\uFEFF'; // UTF-8 BOM for Excel compatibility
      let csv = BOM + 'URL,Status,Errors,Warnings,Total Issues,Top Issue\n';

      scans.forEach(scan => {
        // Get top issue from detailed_json if available
        let topIssue = '';
        try {
          const issues = JSON.parse(scan.detailed_json || '[]');
          if (issues.length > 0) {
            // Group and find most common
            const counts = {};
            issues.forEach(i => {
              const code = i.code || 'unknown';
              counts[code] = (counts[code] || 0) + 1;
            });
            const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
            if (sorted.length > 0) {
              topIssue = sorted[0][0].replace(/,/g, ';'); // Escape commas
            }
          }
        } catch (e) { }

        // Escape URL for CSV
        const url = scan.url.replace(/"/g, '""');
        const status = scan.scan_status || 'pending';
        const errors = scan.errors || 0;
        const warnings = scan.warnings || 0;
        const total = scan.total_issues || 0;

        csv += `"${url}",${status},${errors},${warnings},${total},"${topIssue}"\n`;
      });

      // Send as download with proper domain-based filename
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="compliance-report-${domain}-${date}.csv"`);
      res.send(csv);
    });
  });
});


// Graceful Shutdown
function gracefulShutdown(signal) {
  console.log(`\n[${signal}] Received. Closing HTTP server...`);
  server.close(() => {
    console.log('HTTP server closed.');
    db.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
        process.exit(1);
      }
      console.log('Database connection closed.');
      process.exit(0);
    });
  });
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n🚀 ADA Scanner Server running at http://localhost:${PORT}`);
  console.log(`\nOpen your browser and visit: http://localhost:${PORT}\n`);
});
