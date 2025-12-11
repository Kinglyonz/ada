const express = require('express');
const pa11y = require('pa11y');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

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
app.use(express.json());
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
      console.log(`Checking PDF: ${file.originalname}`);
      
      // Run basic PDF accessibility check using PAC (if installed) or custom logic
      // For now, we'll do a simple file analysis
      const pdfResult = {
        filename: file.originalname,
        size: file.size,
        issues: [],
        warnings: []
      };

      // Basic PDF checks (can be enhanced with actual PDF parsing library)
      const stats = fs.statSync(file.path);
      
      // Check file size
      if (stats.size < 1000) {
        pdfResult.issues.push('PDF file appears to be empty or corrupted');
      }

      // Read file to check if it's tagged (basic check)
      const buffer = fs.readFileSync(file.path);
      const pdfContent = buffer.toString('latin1');
      
      if (!pdfContent.includes('/StructTreeRoot')) {
        pdfResult.issues.push('PDF does not appear to be tagged (missing structure tree)');
      }
      
      if (!pdfContent.includes('/Lang')) {
        pdfResult.warnings.push('PDF language not specified');
      }

      if (!pdfContent.includes('/Title')) {
        pdfResult.warnings.push('PDF title metadata not set');
      }

      results.push(pdfResult);
      
      // Clean up uploaded file
      fs.unlinkSync(file.path);
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
        try { fs.unlinkSync(file.path); } catch (e) {}
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

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 ADA Scanner Server running at http://localhost:${PORT}`);
  console.log(`\nOpen your browser and visit: http://localhost:${PORT}\n`);
});
