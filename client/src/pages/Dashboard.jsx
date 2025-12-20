import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { BarChart3, AlertTriangle, CheckCircle, Globe } from 'lucide-react'

export default function Dashboard() {
    const [recentCrawls, setRecentCrawls] = useState([])
    const [stats, setStats] = useState({ totalPages: 0, totalErrors: 0, crawlsRun: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        // Get recent crawls
        const { data: crawls } = await supabase
            .from('crawls')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(5)

        // Get total stats
        const { count: pageCount } = await supabase
            .from('scans')
            .select('*', { count: 'exact', head: true })

        const { data: errorData } = await supabase
            .from('scans')
            .select('errors')
            .gt('errors', 0)

        const totalErrors = errorData?.reduce((sum, s) => sum + (s.errors || 0), 0) || 0

        setRecentCrawls(crawls || [])
        setStats({
            totalPages: pageCount || 0,
            totalErrors,
            crawlsRun: crawls?.length || 0
        })
        setLoading(false)
    }

    if (loading) {
        return (
            <div className="main-content">
                <div className="loading">
                    <div className="discovery-spinner"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="main-content">
            <header className="page-header">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-subtitle">Overview of your ADA compliance scanning activity</p>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <Globe size={24} style={{ color: 'var(--accent-primary)', marginBottom: 8 }} />
                    <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>{stats.totalPages.toLocaleString()}</div>
                    <div className="stat-label">Total Pages Scanned</div>
                </div>
                <div className="stat-card">
                    <AlertTriangle size={24} style={{ color: 'var(--accent-error)', marginBottom: 8 }} />
                    <div className="stat-value" style={{ color: 'var(--accent-error)' }}>{stats.totalErrors.toLocaleString()}</div>
                    <div className="stat-label">Total Issues Found</div>
                </div>
                <div className="stat-card">
                    <BarChart3 size={24} style={{ color: 'var(--accent-success)', marginBottom: 8 }} />
                    <div className="stat-value" style={{ color: 'var(--accent-success)' }}>{stats.crawlsRun}</div>
                    <div className="stat-label">Crawls Run</div>
                </div>
                <div className="stat-card">
                    <CheckCircle size={24} style={{ color: 'var(--accent-warning)', marginBottom: 8 }} />
                    <div className="stat-value" style={{ color: 'var(--accent-warning)' }}>WCAG 2.1</div>
                    <div className="stat-label">Standard</div>
                </div>
            </div>

            <div className="card">
                <h3 className="card-title">Recent Scans</h3>
                {recentCrawls.length > 0 ? (
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Domain</th>
                                <th>Pages</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentCrawls.map((crawl) => (
                                <tr key={crawl.id}>
                                    <td className="url-cell">{crawl.domain}</td>
                                    <td>{crawl.total_pages || 0}</td>
                                    <td>
                                        <span className={`status-badge ${crawl.status === 'discovered' ? 'complete' : crawl.status}`}>
                                            {crawl.status}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--text-secondary)' }}>
                                        {new Date(crawl.timestamp).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">📊</div>
                        <p>No scans yet. Start by scanning a website!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
