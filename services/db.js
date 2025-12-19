const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize DB
const dbPath = path.join(__dirname, '../scans.db');
const db = new sqlite3.Database(dbPath);

function init() {
    db.serialize(() => {
        // Scans Table (Single Page) with Depth Tracking
        db.run(`CREATE TABLE IF NOT EXISTS scans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT,
      score INTEGER,
      total_issues INTEGER,
      errors INTEGER,
      warnings INTEGER,
      notices INTEGER,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      crawl_id INTEGER,
      detailed_json TEXT,
      scan_status TEXT DEFAULT 'complete',
      depth INTEGER DEFAULT 0,
      parent_url TEXT
    )`);

        // Add scan_status column if it doesn't exist (for existing databases)
        db.run(`ALTER TABLE scans ADD COLUMN scan_status TEXT DEFAULT 'complete'`, (err) => {
            if (err && !err.message.includes('duplicate column')) {
                // Ignore duplicate column errors
            }
        });

        // Add depth column if it doesn't exist (for existing databases)
        db.run(`ALTER TABLE scans ADD COLUMN depth INTEGER DEFAULT 0`, (err) => {
            if (err && !err.message.includes('duplicate column')) {
                // Ignore duplicate column errors
            }
        });

        // Add parent_url column if it doesn't exist (for existing databases)
        db.run(`ALTER TABLE scans ADD COLUMN parent_url TEXT`, (err) => {
            if (err && !err.message.includes('duplicate column')) {
                // Ignore duplicate column errors
            }
        });

        // Crawls Table (Full Site)
        db.run(`CREATE TABLE IF NOT EXISTS crawls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      domain TEXT,
      status TEXT,
      total_pages INTEGER,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    });
    console.log('📦 Database initialized at ' + dbPath);
}

// Save a single scan result
function saveScan(data) {
    return new Promise((resolve, reject) => {
        const { summary, detailedIssues, crawlId, scanId } = data;
        const score = Math.max(0, 100 - (summary.errors * 5) - (summary.warnings * 1));

        // If scanId is provided, update existing scan record (split spider)
        if (scanId) {
            const stmt = db.prepare(`UPDATE scans SET score = ?, total_issues = ?, errors = ?, warnings = ?, notices = ?, detailed_json = ?, scan_status = ? WHERE id = ?`);
            stmt.run(
                score,
                summary.total,
                summary.errors,
                summary.warnings,
                summary.notices,
                JSON.stringify(detailedIssues),
                data.status || 'complete',
                scanId,
                function (err) {
                    if (err) reject(err);
                    else resolve(scanId);
                }
            );
            stmt.finalize();
        } else {
            // Otherwise, create new scan record (old-style crawl)
            const stmt = db.prepare(`INSERT INTO scans (url, score, total_issues, errors, warnings, notices, detailed_json, crawl_id, scan_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
            stmt.run(
                summary.url,
                score,
                summary.total,
                summary.errors,
                summary.warnings,
                summary.notices,
                JSON.stringify(detailedIssues),
                crawlId || null,
                data.status || 'complete',
                function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
            stmt.finalize();
        }
    });
}

// Get recent history
function getHistory(limit = 20) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT id, url, score, total_issues, timestamp FROM scans WHERE crawl_id IS NULL ORDER BY timestamp DESC LIMIT ?`, [limit], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Get full scan details
function getScanDetails(id) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM scans WHERE id = ?`, [id], (err, row) => {
            if (err) reject(err);
            else if (!row) resolve(null);
            else {
                row.detailedIssues = JSON.parse(row.detailed_json);
                resolve(row);
            }
        });
    });
}

module.exports = {
    db,
    init,
    saveScan,
    getHistory,
    getScanDetails
};
