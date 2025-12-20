/**
 * Supabase Database Adapter for ADA Scanner
 * 
 * This replaces the SQLite db.js for cloud deployment.
 * Requires SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.
 */
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔗 Connected to Supabase:', supabaseUrl);

// Compatibility layer - mimics SQLite db object for existing server.js code
const db = {
    // Run a query (for INSERT/UPDATE with callback)
    run: function (sql, params, callback) {
        // Parse SQL to determine operation
        const sqlLower = sql.toLowerCase().trim();

        if (sqlLower.startsWith('insert into crawls')) {
            supabase
                .from('crawls')
                .insert({ domain: params[0], status: 'discovering', total_pages: 0 })
                .select('id')
                .single()
                .then(({ data, error }) => {
                    if (error) {
                        if (callback) callback.call({ lastID: null }, error);
                    } else {
                        if (callback) callback.call({ lastID: data.id }, null);
                    }
                });
        } else if (sqlLower.startsWith('insert into scans')) {
            // Check parameter count to identify which query it is
            // server.js (Discovery): VALUES (?, 0, ..., ?, 'pending', ?, ?) -> 4 params: [url, crawl_id, depth, parent_url]
            // Default assumption otherwise: [url, scan_status, crawl_id, depth, parent_url]

            let insertData = {};
            if (params.length === 4) {
                insertData = {
                    url: params[0],
                    crawl_id: params[1],
                    depth: params[2],
                    parent_url: params[3],
                    scan_status: 'pending',
                    score: 0,
                    total_issues: 0,
                    errors: 0,
                    warnings: 0,
                    notices: 0,
                    detailed_json: []
                };
            } else {
                insertData = {
                    url: params[0],
                    scan_status: params[1] || 'pending',
                    crawl_id: params[2],
                    depth: params[3] || 0,
                    parent_url: params[4] || null
                };
            }

            supabase
                .from('scans')
                .insert(insertData)
                .select('id')
                .single()
                .then(({ data, error }) => {
                    if (error) {
                        if (callback) callback.call({ lastID: null }, error);
                    } else {
                        if (callback) callback.call({ lastID: data.id }, null);
                    }
                });
        } else if (sqlLower.startsWith('update crawls set total_pages')) {
            // UPDATE crawls SET total_pages = ?, status = ? WHERE id = ?
            supabase
                .from('crawls')
                .update({ total_pages: params[0], status: params[1] })
                .eq('id', params[2])
                .then(({ error }) => {
                    if (callback) callback(error);
                });
        } else if (sqlLower.startsWith('update crawls set status')) {
            // UPDATE crawls SET status = ? WHERE id = ?
            supabase
                .from('crawls')
                .update({ status: params[0] })
                .eq('id', params[1])
                .then(({ error }) => {
                    if (callback) callback(error);
                });
        } else if (sqlLower.startsWith('update scans set scan_status')) {
            // UPDATE scans SET scan_status = ? WHERE id = ?
            supabase
                .from('scans')
                .update({ scan_status: params[0] })
                .eq('id', params[1])
                .then(({ error }) => {
                    if (callback) callback(error);
                });
        } else if (sqlLower.startsWith('update scans set score')) {
            // UPDATE scans SET score, total_issues, errors, warnings, notices, detailed_json, scan_status WHERE id = ?
            supabase
                .from('scans')
                .update({
                    score: params[0],
                    total_issues: params[1],
                    errors: params[2],
                    warnings: params[3],
                    notices: params[4],
                    detailed_json: params[5],
                    scan_status: params[6]
                })
                .eq('id', params[7])
                .then(({ error }) => {
                    if (callback) callback(error);
                });
        } else {
            console.warn('⚠️ Unhandled SQL in db.run:', sql);
            if (callback) callback(null);
        }
    },

    // Get single row
    get: function (sql, params, callback) {
        // Handle case where params is actually the callback (no params passed)
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }

        const sqlLower = sql.toLowerCase().trim();

        if (sqlLower.includes('from crawls where id')) {
            supabase
                .from('crawls')
                .select('*')
                .eq('id', params[0])
                .single()
                .then(({ data, error }) => {
                    callback(error, data);
                });
        } else if (sqlLower.includes('from scans where id')) {
            supabase
                .from('scans')
                .select('*')
                .eq('id', params[0])
                .single()
                .then(({ data, error }) => {
                    callback(error, data);
                });
        } else if (sqlLower.includes('from crawls order by timestamp desc limit 1')) {
            supabase
                .from('crawls')
                .select('id')
                .order('timestamp', { ascending: false })
                .limit(1)
                .single()
                .then(({ data, error }) => {
                    callback(error, data);
                });
        } else {
            console.warn('⚠️ Unhandled SQL in db.get:', sql);
            callback(null, null);
        }
    },

    // Get multiple rows
    all: function (sql, params, callback) {
        const sqlLower = sql.toLowerCase().trim();

        if (sqlLower.includes('from scans where crawl_id')) {
            const getAllScans = async () => {
                let allRows = [];
                let from = 0;
                let step = 1000;
                let more = true;

                while (more) {
                    const { data, error } = await supabase
                        .from('scans')
                        .select('id, url, score, total_issues, errors, timestamp, scan_status, depth, parent_url')
                        .eq('crawl_id', params[0])
                        .order('depth', { ascending: true })
                        .order('timestamp', { ascending: false })
                        .range(from, from + step - 1);

                    if (error) return { error };

                    if (data && data.length > 0) {
                        allRows = allRows.concat(data);
                        from += step;
                        if (data.length < step) more = false;
                    } else {
                        more = false;
                    }
                }
                return { data: allRows };
            };

            getAllScans().then(({ data, error }) => {
                callback(error, data || []);
            });
        } else if (sqlLower.includes('scan_status = \'pending\'')) {
            supabase
                .from('scans')
                .select('*')
                .eq('crawl_id', params[0])
                .eq('scan_status', 'pending')
                .then(({ data, error }) => {
                    callback(error, data || []);
                });
        } else if (sqlLower.includes('from scans where crawl_id = ?') && !sqlLower.includes('scan_status')) {
            // For CSV export - get all scans
            supabase
                .from('scans')
                .select('*')
                .eq('crawl_id', params[0])
                .then(({ data, error }) => {
                    callback(error, data || []);
                });
        } else {
            console.warn('⚠️ Unhandled SQL in db.all:', sql);
            callback(null, []);
        }
    },

    // Prepare statement (Mock for SQLite compatibility)
    prepare: function (sql) {
        return {
            run: function (...args) {
                // Extract callback (last argument)
                const callback = typeof args[args.length - 1] === 'function' ? args.pop() : null;
                // Forward to db.run
                db.run(sql, args, callback);
            },
            finalize: function () { } // No-op
        };
    }
};

function init() {
    console.log('📦 Supabase database ready');
    // Tables are created via migration in Supabase dashboard
}

// Save a single scan result (for Website Audit single-page scans)
async function saveScan(data) {
    const { summary, detailedIssues, crawlId, scanId } = data;
    const score = Math.max(0, 100 - (summary.errors * 5) - (summary.warnings * 1));

    if (scanId) {
        // Update existing scan record
        const { error } = await supabase
            .from('scans')
            .update({
                score,
                total_issues: summary.total,
                errors: summary.errors,
                warnings: summary.warnings,
                notices: summary.notices,
                detailed_json: detailedIssues,
                scan_status: data.status || 'complete'
            })
            .eq('id', scanId);

        if (error) throw error;
        return scanId;
    } else {
        // Create new scan record
        const { data: newScan, error } = await supabase
            .from('scans')
            .insert({
                url: summary.url,
                score,
                total_issues: summary.total,
                errors: summary.errors,
                warnings: summary.warnings,
                notices: summary.notices,
                detailed_json: detailedIssues,
                crawl_id: crawlId || null,
                scan_status: data.status || 'complete'
            })
            .select('id')
            .single();

        if (error) throw error;
        return newScan.id;
    }
}

// Get recent history
async function getHistory(limit = 20) {
    const { data, error } = await supabase
        .from('scans')
        .select('id, url, score, total_issues, timestamp')
        .is('crawl_id', null)
        .order('timestamp', { ascending: false })
        .limit(limit);

    if (error) throw error;
    return data || [];
}

// Get full scan details
async function getScanDetails(id) {
    const { data, error } = await supabase
        .from('scans')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    if (!data) return null;

    data.detailedIssues = data.detailed_json;
    return data;
}

module.exports = {
    db,
    supabase,
    init,
    saveScan,
    getHistory,
    getScanDetails
};
