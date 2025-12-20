-- ADA Scanner Database Schema for Supabase
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/dlfxpkixljqdiajantxy/sql

-- Crawls table (stores discovery sessions)
CREATE TABLE IF NOT EXISTS crawls (
    id BIGSERIAL PRIMARY KEY,
    domain TEXT NOT NULL,
    status TEXT DEFAULT 'discovering',
    total_pages INTEGER DEFAULT 0,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Scans table (stores individual page scan results)
CREATE TABLE IF NOT EXISTS scans (
    id BIGSERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    score INTEGER DEFAULT 100,
    total_issues INTEGER DEFAULT 0,
    errors INTEGER DEFAULT 0,
    warnings INTEGER DEFAULT 0,
    notices INTEGER DEFAULT 0,
    detailed_json JSONB,
    crawl_id BIGINT REFERENCES crawls(id) ON DELETE CASCADE,
    scan_status TEXT DEFAULT 'pending',
    depth INTEGER DEFAULT 0,
    parent_url TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_scans_crawl_id ON scans(crawl_id);
CREATE INDEX IF NOT EXISTS idx_scans_status ON scans(scan_status);
CREATE INDEX IF NOT EXISTS idx_scans_depth ON scans(depth);
CREATE INDEX IF NOT EXISTS idx_crawls_status ON crawls(status);

-- Enable Row Level Security (optional - for multi-tenant later)
-- ALTER TABLE crawls ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
