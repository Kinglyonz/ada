import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Search, Map, FileText, Settings } from 'lucide-react'

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">ADA Scanner</div>
            <div className="sidebar-subtitle">Professional Compliance Intelligence</div>

            <nav>
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    Dashboard
                </NavLink>
                <NavLink to="/scanner" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Search size={20} />
                    Compliance Scanner
                </NavLink>
                <NavLink to="/sitemap" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Map size={20} />
                    Site Map
                </NavLink>
                <NavLink to="/documents" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <FileText size={20} />
                    Document Scanner
                </NavLink>
            </nav>

            <div style={{ marginTop: 'auto' }}>
                <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Settings size={20} />
                    Settings
                </NavLink>
            </div>
        </aside>
    )
}
