import { useState, type ReactNode } from 'react'
import Sidebar from './Sidebar'
import '../styles/DashboardLayout.css'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <div className="dashboard-root">
            <Sidebar />

            {/* Mobile overlay drawer */}
            {mobileOpen && (
                <div className="mobile-drawer" role="dialog" aria-hidden={!mobileOpen}>
                    <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)} />
                    <div className="mobile-drawer-panel">
                        <button className="drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <Sidebar />
                    </div>
                </div>
            )}

            <div className="main-area">
                {/* Top Navigation Bar */}
                <header className="topbar">
                    <div className="topbar-left">
                        <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                        <div className="page-title">
                            <h1>Dashboard Overview</h1>
                            <p>Monitor your store performance</p>
                        </div>
                    </div>

                    <div className="topbar-right">
                        <div className="search-wrapper">
                            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input 
                                type="search"
                                className="search-input" 
                                placeholder="Search products, orders..." 
                                aria-label="Search" 
                            />
                        </div>

                        <button className="icon-btn" title="Notifications" aria-label="Notifications">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                            <span className="notification-badge">3</span>
                        </button>

                        <button className="icon-btn" title="Settings" aria-label="Settings">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M12 1v6m0 6v6m7.07-14.07-4.24 4.24m-5.66 5.66L4.93 19.07m14.14 0-4.24-4.24m-5.66-5.66L4.93 4.93"></path>
                            </svg>
                        </button>

                        <div className="user-menu">
                            <div className="avatar">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div className="user-info">
                                <div className="user-name">Admin</div>
                                <div className="user-role">Administrator</div>
                            </div>
                            <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="content-area">{children}</main>

                {/* Footer */}
                <footer className="dashboard-footer">
                    <div className="footer-content">
                        <div className="footer-left">
                            <span>© {new Date().getFullYear()} MyStore Admin</span>
                            <span className="footer-divider">•</span>
                            <span>All rights reserved</span>
                        </div>
                        <div className="footer-right">
                            <a href="#" className="footer-link">Help</a>
                            <a href="#" className="footer-link">Documentation</a>
                            <a href="#" className="footer-link">Support</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}