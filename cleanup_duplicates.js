require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function cleanDuplicates() {
    console.log('🔍 Checking for duplicate URLs...\n');

    // Find duplicate URLs (same URL appearing in multiple crawls)
    const { data: allScans } = await supabase
        .from('scans')
        .select('id, url, crawl_id, timestamp')
        .order('timestamp', { ascending: false });

    const urlMap = new Map();
    const duplicateIds = [];

    allScans.forEach(scan => {
        const key = `${scan.crawl_id}-${scan.url}`;
        if (urlMap.has(key)) {
            // This is a duplicate within the same crawl
            duplicateIds.push(scan.id);
        } else {
            urlMap.set(key, scan);
        }
    });

    console.log(`📊 Total scans: ${allScans.length}`);
    console.log(`🔁 Duplicates found (same URL in same crawl): ${duplicateIds.length}`);

    if (duplicateIds.length > 0) {
        console.log('\n🗑️ Deleting duplicates...');

        // Delete in batches of 100
        for (let i = 0; i < duplicateIds.length; i += 100) {
            const batch = duplicateIds.slice(i, i + 100);
            const { error } = await supabase
                .from('scans')
                .delete()
                .in('id', batch);

            if (error) {
                console.error('Delete error:', error.message);
            } else {
                console.log(`  Deleted batch ${Math.floor(i / 100) + 1}: ${batch.length} rows`);
            }
        }

        console.log(`\n✅ Cleaned up ${duplicateIds.length} duplicate records!`);
    } else {
        console.log('\n✅ No duplicates found! Database is clean.');
    }

    // Show final count
    const { count } = await supabase
        .from('scans')
        .select('*', { count: 'exact', head: true });

    console.log(`\n📊 Final scan count: ${count}`);
}

cleanDuplicates();
