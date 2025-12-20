require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStats() {
    console.log('Connecting to Supabase...');

    // Check Crawls
    const { count: crawlCount, error: err1 } = await supabase
        .from('crawls')
        .select('*', { count: 'exact', head: true });

    if (err1) console.error('Error checking crawls:', err1.message);
    else console.log(`✅ Total Crawls: ${crawlCount}`);

    // Check Scans
    const { count: scanCount, error: err2 } = await supabase
        .from('scans')
        .select('*', { count: 'exact', head: true });

    if (err2) console.error('Error checking scans:', err2.message);
    else console.log(`✅ Total Pages/Scans: ${scanCount}`);

    // Get latest crawl count
    const { data: latestCrawl } = await supabase
        .from('crawls')
        .select('id, total_pages')
        .order('id', { ascending: false })
        .limit(1)
        .single();

    if (latestCrawl) {
        console.log(`ℹ️ Latest Crawl ID: ${latestCrawl.id} (Recorded Pages: ${latestCrawl.total_pages})`);

        // Check actual scans for this crawl
        const { count: actualScans } = await supabase
            .from('scans')
            .select('*', { count: 'exact', head: true })
            .eq('crawl_id', latestCrawl.id);

        console.log(`ℹ️ Actual Rows for Latest Crawl: ${actualScans}`);
    }
}

checkStats();
