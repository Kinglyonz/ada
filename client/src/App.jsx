import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Scanner from './pages/Scanner'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/sitemap" element={<ComingSoon title="Site Map" />} />
        <Route path="/documents" element={<ComingSoon title="Document Scanner" />} />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
      </Routes>
    </BrowserRouter>
  )
}

function ComingSoon({ title }) {
  return (
    <div className="main-content">
      <header className="page-header">
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">This feature is coming soon</p>
      </header>
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">🚧</div>
          <p>Under construction</p>
        </div>
      </div>
    </div>
  )
}

export default App
