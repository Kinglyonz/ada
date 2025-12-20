import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { AlertCircle, CheckCircle, Clock, Search } from 'lucide-react'

export default function Scanner() {
    const [url, setUrl] = useState('')
    const [isDiscovering, setIsDiscovering] = useState(false)
    const [currentCrawlId, setCurrentCrawlId] = useState(null)
    const [pages, setPages] = useState([])
    const [stats, setStats] = useState({ total: 0, scanned: 0, errors: 0, pending: 0 })
    const [timer, setTimer] = useState(0)

    // Poll for updates when discovering
    useEffect(() => {
        let interval
        if (currentCrawlId) {
            interval = setInterval(() => {
                fetchPages(currentCrawlId)
            }, 2000)
        }
        return () => clearInterval(interval)
    }, [currentCrawlId])

    // Timer
    useEffect(() => {
        let interval
        if (isDiscovering) {
            interval = setInterval(() => setTimer(t => t + 1), 1000)
        }
        return () => clearInterval(interval)
    }, [isDiscovering])

    const fetchPages = async (crawlId) => {
        const { data, error } = await supabase
            .from('scans')
            .select('id, url, score, total_issues, errors, scan_status, depth')
            .eq('crawl_id', crawlId)
            .order('depth', { ascending: true })
            .limit(1000)

        if (data) {
            setPages(data)
            const scanned = data.filter(p => p.scan_status === 'complete').length
            const errors = data.reduce((sum, p) => sum + (p.errors || 0), 0)
            const pending = data.filter(p => p.scan_status === 'pending').length
            setStats({ total: data.length, scanned, errors, pending })
        }
    }

    const startDiscovery = async () => {
        if (!url) return

        setIsDiscovering(true)
        setTimer(0)
        setPages([])

        try {
            const formData = new FormData()
            formData.append('url', url.startsWith('http') ? url : `https://${url}`)

            const res = await fetch('/api/crawl/discover', {
                method: 'POST',
                body: formData
            })
            const data = await res.json()

            if (data.crawlId) {
                setCurrentCrawlId(data.crawlId)
            }
        } catch (error) {
            console.error('Discovery failed:', error)
            setIsDiscovering(false)
        }
    }

    const stopDiscovery = async () => {
        if (currentCrawlId) {
            await fetch(`/api/crawl/stop/${currentCrawlId}`, { method: 'POST' })
        }
        setIsDiscovering(false)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="main-content">
            <header className="page-header">
                <h1 className="page-title">Compliance Scanner</h1>
                <p className="page-subtitle">Discover and scan all pages on a website for ADA compliance issues</p>
            </header>

            <div className="card">
                <div className="scanner-input-group">
                    <input
                        type="text"
                        className="scanner-input"
                        placeholder="Enter website URL (e.g., www.cityofbowie.org)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={isDiscovering}
                    />
                    {isDiscovering ? (
                        <button className="btn-primary btn-danger" onClick={stopDiscovery}>
                            Stop Discovery
                        </button>
                    ) : (
                        <button className="btn-primary" onClick={startDiscovery} disabled={!url}>
                            <Search size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                            Discover Pages
                        </button>
                    )}
                </div>

                {isDiscovering && (
                    <div className="discovery-status">
                        <div className="discovery-spinner"></div>
                        <div className="discovery-text">
                            <div className="discovery-title">🔍 Discovering pages...</div>
                            <div className="discovery-subtitle">Found {stats.total} pages • {formatTime(timer)}</div>
                        </div>
                    </div>
                )}

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>{stats.total}</div>
                        <div className="stat-label">Pages Found</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value" style={{ color: 'var(--accent-success)' }}>{stats.scanned}</div>
                        <div className="stat-label">Scanned</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value" style={{ color: 'var(--accent-warning)' }}>{stats.pending}</div>
                        <div className="stat-label">Pending</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value" style={{ color: 'var(--accent-error)' }}>{stats.errors}</div>
                        <div className="stat-label">Total Errors</div>
                    </div>
                </div>
            </div>

            {pages.length > 0 && (
                <div className="card">
                    <h3 className="card-title">Discovered Pages ({pages.length})</h3>
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Page URL</th>
                                <th>Depth</th>
                                <th>Issues</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages.slice(0, 100).map((page) => (
                                <tr key={page.id}>
                                    <td className="url-cell" title={page.url}>
                                        {page.url.replace(/^https?:\/\/[^\/]+/, '')}
                                    </td>
                                    <td>{page.depth}</td>
                                    <td>
                                        {page.scan_status === 'complete' ? (
                                            <span style={{ color: page.errors > 0 ? 'var(--accent-error)' : 'var(--accent-success)' }}>
                                                {page.errors || 0}
                                            </span>
                                        ) : '-'}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${page.scan_status}`}>
                                            {page.scan_status === 'pending' && <Clock size={12} style={{ marginRight: 4 }} />}
                                            {page.scan_status === 'complete' && <CheckCircle size={12} style={{ marginRight: 4 }} />}
                                            {page.scan_status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pages.length > 100 && (
                        <div style={{ textAlign: 'center', padding: 16, color: 'var(--text-secondary)' }}>
                            Showing 100 of {pages.length} pages
                        </div>
                    )}
                </div>
            )}

            {pages.length === 0 && !isDiscovering && (
                <div className="card">
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <p>Enter a URL above to discover pages</p>
                    </div>
                </div>
            )}
        </div>
    )
}
