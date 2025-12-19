const puppeteer = require('puppeteer');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Track active crawls for abort capability
const activeCrawls = new Map(); // crawlId -> { aborted: false }

function abortCrawl(crawlId) {
    const crawl = activeCrawls.get(crawlId);
    if (crawl) {
        crawl.aborted = true;
        console.log(`🛑 Crawl ${crawlId} abort signal set`);
        return true;
    }
    return false;
}

function startCrawlTracking(crawlId) {
    activeCrawls.set(crawlId, { aborted: false });
}

function isAborted(crawlId) {
    const crawl = activeCrawls.get(crawlId);
    return crawl ? crawl.aborted : false;
}

function cleanupCrawl(crawlId) {
    activeCrawls.delete(crawlId);
}

// Helper to ensure protocol
const ensureProtocol = (url) => {
    if (!url.match(/^https?:\/\//i)) {
        return 'https://' + url;
    }
    return url;
};

// FAST CRAWL request wrapper with Redirect support
const fetchUrl = (url, headers) => {
    return new Promise((resolve) => {
        const protocol = url.startsWith('https') ? https : http;
        const req = protocol.get(url, { headers, timeout: 8000 }, (res) => {
            // Handle Redirects
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                try {
                    const redirectUrl = new URL(res.headers.location, url).href;
                    resolve(fetchUrl(redirectUrl, headers)); // Recursive follow
                } catch {
                    resolve({ error: 'Invalid redirect' });
                }
                return;
            }

            let data = '';
            res.setEncoding('utf8');
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ body: data, status: res.statusCode }));
        });
        req.on('error', (e) => resolve({ error: e }));
        req.on('timeout', () => { req.destroy(); resolve({ timeout: true }); });
    });
};

// FAST CRAWL with Depth Tracking (Static)
async function fastCrawl(startUrl, maxPages, onDiscover) {
    console.log(`🚀 Starting FAST static crawl with DEPTH TRACKING for ${startUrl}`);
    const visited = new Set();
    const depthMap = new Map(); // url -> {depth, parentUrl}

    // Queue now holds objects with depth info
    const queue = [{ url: startUrl, depth: 0, parentUrl: null }];
    const results = [];
    const domain = new URL(startUrl).hostname;

    // Add start URL immediately (depth 0)
    depthMap.set(startUrl, { depth: 0, parentUrl: null });
    if (onDiscover) onDiscover(startUrl, 0, null);

    const normalizeUrl = (url) => {
        try {
            const u = new URL(url);
            return u.origin + u.pathname;
        } catch { return null; }
    };

    const MAX_CONCURRENT = 10;
    const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

    while (queue.length > 0 && visited.size < maxPages) {
        const batch = [];
        while (queue.length > 0 && batch.length < MAX_CONCURRENT && visited.size + batch.length < maxPages) {
            const item = queue.shift();
            if (!visited.has(item.url)) {
                visited.add(item.url);
                batch.push(item);
                results.push({ url: item.url, depth: item.depth, parentUrl: item.parentUrl });

                // Call callback with depth info
                if (onDiscover && item.url !== startUrl) {
                    onDiscover(item.url, item.depth, item.parentUrl);
                }
            }
        }

        if (batch.length === 0) break;

        await Promise.all(batch.map(async (item) => {
            const res = await fetchUrl(item.url, { 'User-Agent': UA });

            if (res.body && res.status >= 200 && res.status < 300) {
                // Extract links
                const linkRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']*)["']/gi;
                let match;
                while ((match = linkRegex.exec(res.body)) !== null) {
                    try {
                        const absolute = new URL(match[1], item.url).href;
                        const norm = normalizeUrl(absolute);
                        if (norm && new URL(norm).hostname.replace(/^www\./, '') === domain.replace(/^www\./, '') && !norm.match(/\.(pdf|jpg|png|css|js|zip|docx|xml)$/i)) {
                            if (!visited.has(norm) && !queue.some(q => q.url === norm)) {
                                // New page found - it's one level deeper than current page
                                queue.push({
                                    url: norm,
                                    depth: item.depth + 1,
                                    parentUrl: item.url
                                });
                            }
                        }
                    } catch (e) { }
                }
            }
        }));

        await new Promise(r => setTimeout(r, 100));
    }

    console.log(`✅ Fast crawl complete. Max depth reached: ${Math.max(...results.map(r => r.depth))}`);
    return results;
}

// MAIN CRAWL FUNCTION with Depth Tracking
async function crawl(rawUrl, maxPages = Infinity, onDiscover = null) {
    const startUrl = ensureProtocol(rawUrl);
    let allResults = [];
    let staticResults = [];

    try {
        console.log(`🕵️ Attempting Fast Static Discovery with DEPTH TRACKING for ${startUrl}...`);
        staticResults = await fastCrawl(startUrl, maxPages, onDiscover);
        allResults = staticResults;
        console.log(`⚡ Fast Discovery found ${staticResults.length} pages. Max depth: ${Math.max(...staticResults.map(r => r.depth || 0))}`);
    } catch (e) {
        console.error('Fast crawl failed, continuing to Puppeteer:', e.message);
    }

    // FALLBACK TO PUPPETEER for deeper crawling
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu'
            ],
            ignoreHTTPSErrors: true
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(15000);

        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'stylesheet', 'font', 'media', 'other'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        const normalizeUrl = (url) => {
            try {
                const urlObj = new URL(url);
                return urlObj.origin + urlObj.pathname;
            } catch { return url; }
        };

        const visited = new Set();
        const depthMap = new Map();

        // Initialize with start URL
        const startNorm = normalizeUrl(startUrl);
        let queue = [{ url: startNorm, depth: 0, parentUrl: null }];
        depthMap.set(startNorm, { depth: 0, parentUrl: null });

        // Add static results to queue with their known depths
        if (staticResults && staticResults.length > 0) {
            staticResults.forEach(item => {
                const norm = normalizeUrl(item.url || item);
                const depth = item.depth || 1;
                const parentUrl = item.parentUrl || startNorm;

                if (norm !== startNorm && !queue.some(q => q.url === norm)) {
                    queue.push({ url: norm, depth, parentUrl });
                    depthMap.set(norm, { depth, parentUrl });
                }
            });
            console.log(`📥 Seeded Puppeteer queue with ${queue.length} pages from Fast Crawl`);
        }

        const results = [];
        let domain;
        try { domain = new URL(startUrl).hostname; } catch (e) { domain = ''; }

        console.log(`🕷️ Starting Puppeteer crawl of ${domain} with DEPTH TRACKING`);

        let consecutiveNoNewPages = 0;
        const STALENESS_LIMIT = 15;

        while (queue.length > 0 && visited.size < maxPages) {
            if (consecutiveNoNewPages >= STALENESS_LIMIT) {
                console.log(`🛑 Discovery Staled: No new pages found in last ${STALENESS_LIMIT} visits. Stopping early.`);
                break;
            }

            const item = queue.shift();
            if (visited.has(item.url)) continue;

            try {
                await page.goto(item.url, { waitUntil: 'domcontentloaded' });
                visited.add(item.url);
                results.push({ url: item.url, depth: item.depth, parentUrl: item.parentUrl });

                if (onDiscover) onDiscover(item.url, item.depth, item.parentUrl);

                const links = await page.evaluate((currentDomain) => {
                    if (!currentDomain) return [];
                    const normalizeHost = (host) => host.replace(/^www\./i, '');
                    const normalizedDomain = normalizeHost(currentDomain);
                    return Array.from(document.querySelectorAll('a'))
                        .map(a => a.href)
                        .filter(href => {
                            try {
                                const url = new URL(href);
                                return normalizeHost(url.hostname) === normalizedDomain && !href.match(/\.(pdf|jpg|png|css|js|zip|docx)$/i);
                            } catch { return false; }
                        });
                }, domain);

                let addedNew = false;
                for (const link of links) {
                    const normalizedLink = normalizeUrl(link);
                    if (!visited.has(normalizedLink) && !queue.some(q => q.url === normalizedLink)) {
                        queue.push({
                            url: normalizedLink,
                            depth: item.depth + 1,
                            parentUrl: item.url
                        });
                        addedNew = true;
                    }
                }

                if (addedNew) {
                    consecutiveNoNewPages = 0;
                } else {
                    consecutiveNoNewPages++;
                }

            } catch (e) {
                console.error(`Failed to crawl ${item.url}:`, e.message);
            }
        }

        // Merge results - prefer puppeteer results as they have more accurate depth
        const finalResults = results.length > 0 ? results : allResults;
        const maxDepth = Math.max(...finalResults.map(r => r.depth || 0));
        console.log(`✅ Crawl complete. Total pages: ${finalResults.length}, Max depth: ${maxDepth}`);

        return finalResults;

    } catch (error) {
        console.error('Crawl fatal error:', error);
        throw error;
    } finally {
        if (browser) await browser.close();
    }
}

module.exports = { crawl, abortCrawl, startCrawlTracking, isAborted, cleanupCrawl };
