const { Pool } = require('pg');
require('dotenv').config();

// Initialize Postgres Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Required for RDS/AWS usually
    }
});

/**
 * Convert SQLite/Standard SQL (?) placeholders to Postgres ($1, $2, ...)
 */
function convertSql(sql) {
    let i = 1;
    // Replace ? with $1, $2, etc.
    let converted = sql.replace(/\?/g, () => `$${i++}`);

    // Replace conversion quirks if any
    converted = converted.replace('datetime(\'now\')', 'NOW()');
    converted = converted.replace(/INTEGER PRIMARY KEY AUTOINCREMENT/gi, 'SERIAL PRIMARY KEY');

    return converted;
}

const db = {
    // Generic Query Wrapper
    query: async (text, params) => {
        const start = Date.now();
        const res = await pool.query(text, params);
        // console.log('executed query', { text, duration: Date.now() - start, rows: res.rowCount });
        return res;
    },

    // Initialize Schema
    init: async function () {
        try {
            console.log('🐘 Initializing PostgreSQL Schema...');
            const client = await pool.connect();
            try {
                // Scans Table
                await client.query(`
                    CREATE TABLE IF NOT EXISTS scans (
                        id SERIAL PRIMARY KEY,
                        url TEXT,
                        score INTEGER,
                        total_issues INTEGER,
                        errors INTEGER,
                        warnings INTEGER,
                        notices INTEGER,
                        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        crawl_id INTEGER,
                        detailed_json TEXT,
                        scan_status TEXT DEFAULT 'complete',
                        depth INTEGER DEFAULT 0,
                        parent_url TEXT
                    );
                `);

                // Crawls Table
                await client.query(`
                    CREATE TABLE IF NOT EXISTS crawls (
                        id SERIAL PRIMARY KEY,
                        domain TEXT,
                        status TEXT,
                        total_pages INTEGER,
                        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                `);

                console.log('✅ PostgreSQL Schema Ready');
            } finally {
                client.release();
            }
        } catch (err) {
            console.error('❌ Failed to initialize schema:', err);
        }
    },

    // Adapter Methods (match sqlite3 API)

    // db.run(sql, params, callback)
    run: function (sql, params, callback) {
        // Handle optional params
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        params = params || [];

        const pgSql = convertSql(sql);

        // Postgres doesn't return lastID automatically like SQLite
        // We need to append RETURNING id if it's an INSERT
        let isInsert = pgSql.trim().toLowerCase().startsWith('insert');
        let finalSql = pgSql;

        if (isInsert && !pgSql.toLowerCase().includes('returning')) {
            finalSql += ' RETURNING id';
        }

        pool.query(finalSql, params)
            .then(res => {
                // Simulate 'this' context of sqlite3
                const context = {};
                if (isInsert && res.rows.length > 0) {
                    context.lastID = res.rows[0].id;
                }
                context.changes = res.rowCount;

                if (callback) callback.call(context, null);
            })
            .catch(err => {
                if (callback) callback(err);
                else console.error('DB Run Error:', err);
            });
    },

    // db.get(sql, params, callback) -> Single Row
    get: function (sql, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        params = params || [];

        const pgSql = convertSql(sql);

        pool.query(pgSql, params)
            .then(res => {
                if (callback) callback(null, res.rows[0]);
            })
            .catch(err => {
                if (callback) callback(err);
            });
    },

    // db.all(sql, params, callback) -> All Rows
    all: function (sql, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        params = params || [];

        const pgSql = convertSql(sql);

        pool.query(pgSql, params)
            .then(res => {
                if (callback) callback(null, res.rows);
            })
            .catch(err => {
                if (callback) callback(err);
            });
    },

    // Helper: Compatibility wrappers if internal services use them
    saveScan: null, // If services/db.js had helpers, server.js might use them. 
    // But checking server.js, it seems to call db.run/get mostly. 
    // Re-checking db.js, it exported saveScan/getHistory. 
    // server.js might rely on them. 
    // !!! IMPORTANT: If server.js imports db and calls saveScan, I must implement it here too.
};

// Re-implement Helper Functions (Copied/Adapted from db.js)
db.saveScan = function (data) {
    return new Promise((resolve, reject) => {
        const { summary, detailedIssues, crawlId, scanId } = data;
        const score = Math.max(0, 100 - (summary.errors * 5) - (summary.warnings * 1));

        if (scanId) {
            // Update
            db.run(
                `UPDATE scans SET score = ?, total_issues = ?, errors = ?, warnings = ?, notices = ?, detailed_json = ?, scan_status = ? WHERE id = ?`,
                [score, summary.total, summary.errors, summary.warnings, summary.notices, JSON.stringify(detailedIssues), data.status || 'complete', scanId],
                function (err) {
                    if (err) reject(err);
                    else resolve(scanId);
                }
            );
        } else {
            // Insert
            db.run(
                `INSERT INTO scans (url, score, total_issues, errors, warnings, notices, detailed_json, crawl_id, scan_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [summary.url, score, summary.total, summary.errors, summary.warnings, summary.notices, JSON.stringify(detailedIssues), crawlId || null, data.status || 'complete'],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        }
    });
};

db.getHistory = function (limit = 20) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT id, url, score, total_issues, timestamp FROM scans WHERE crawl_id IS NULL ORDER BY timestamp DESC LIMIT ?`, [limit], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

db.getScanDetails = function (id) {
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
};


module.exports = db;
