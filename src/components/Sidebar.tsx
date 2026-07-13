// import { NavLink, useNavigate } from "react-router-dom";
// import '../styles/Sidebar.css'
// const menuItems = [
//     {
//         to: '/admin/dashboard',
//         label: 'Dashboard',
//         icon: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <rect x="3" y="3" width="7" height="7"></rect>
//                 <rect x="14" y="3" width="7" height="7"></rect>
//                 <rect x="14" y="14" width="7" height="7"></rect>
//                 <rect x="3" y="14" width="7" height="7"></rect>
//             </svg>
//         )
//     },
//     {
//         to: '/admin/products',
//         label: 'Products',
//         icon: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
//                 <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
//                 <line x1="12" y1="22.08" x2="12" y2="12"></line>
//             </svg>
//         )
//     },
//     {
//         to: '/admin/categories',
//         label: 'Categories',
//         icon: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <line x1="8" y1="6" x2="21" y2="6"></line>
//                 <line x1="8" y1="12" x2="21" y2="12"></line>
//                 <line x1="8" y1="18" x2="21" y2="18"></line>
//                 <line x1="3" y1="6" x2="3.01" y2="6"></line>
//                 <line x1="3" y1="12" x2="3.01" y2="12"></line>
//                 <line x1="3" y1="18" x2="3.01" y2="18"></line>
//             </svg>
//         )
//     },
//     {
//         to: '/admin/orders',
//         label: 'Orders',
//         icon: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
//                 <line x1="3" y1="6" x2="21" y2="6"></line>
//                 <path d="M16 10a4 4 0 0 1-8 0"></path>
//             </svg>
//         )
//     },
//     {
//         to: '/admin/customers',
//         label: 'Customers',
//         icon: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                 <circle cx="9" cy="7" r="4"></circle>
//                 <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//                 <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//             </svg>
//         )
//     },
//     {
//         to: '/admin/inventory',
//         label: 'Inventory',
//         icon: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <rect x="3" y="3" width="18" height="13" rx="2"></rect>
//                 <line x1="3" y1="9" x2="21" y2="9"></line>
//                 <line x1="8" y1="21" x2="16" y2="21"></line>
//                 <line x1="12" y1="16" x2="12" y2="21"></line>
//             </svg>
//         )
//     },
//     {
//         to: '/admin/reviews',
//         label: 'Reviews',
//         icon: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M12 17l-5.5 3 1.5-6.5L3 9h6L12 2l3 7h6l-5 4.5 1.5 6.5z"></path>
//             </svg>
//         )
//     },
//     {
//         to: '/admin/discounts',
//         label: 'Discounts',
//         icon: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle cx="12" cy="12" r="10"></circle>
//                 <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
//                 <path d="M12 18V6"></path>
//             </svg>
//         )
//     },
//     {
//         to: '/admin/settings',
//         label: 'Settings',
//         icon: (
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle cx="12" cy="12" r="3"></circle>
//                 <path d="M12 1v6m0 6v6m7.07-14.07l-4.24 4.24m-5.66 5.66L4.93 19.07m14.14 0l-4.24-4.24m-5.66-5.66L4.93 4.93"></path>
//             </svg>
//         )
//     },
// ]

// export default function Sidebar() {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         navigate("/admin/login");
//     }

//     return (
//         <aside className="app-sidebar" aria-label="Main navigation">
//             {/* Sidebar Header */}
//             <div className="sidebar-header">
//                 <div className="brand">
//                     <div className="brand-icon">
//                         <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
//                             <rect width="40" height="40" rx="8" fill="url(#brandGradient)" />
//                             <path d="M20 12L28 18V26L20 32L12 26V18L20 12Z" fill="white" />
//                             <defs>
//                                 <linearGradient id="brandGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
//                                     <stop stopColor="#667eea" />
//                                     <stop offset="1" stopColor="#764ba2" />
//                                 </linearGradient>
//                             </defs>
//                         </svg>
//                     </div>
//                     <div className="brand-content">
//                         <div className="brand-title">Homies</div>
//                         <div className="brand-subtitle">Admin Panel</div>
//                     </div>
//                 </div>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="sidebar-nav">
//                 <div className="nav-section">
//                     <div className="nav-section-title">MENU</div>
//                     {menuItems.map((item) => (
//                         <NavLink
//                             key={item.to}
//                             to={item.to}
//                             className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
//                         >
//                             <div className="nav-icon">
//                                 {item.icon}
//                             </div>
//                             <span className="nav-label">{item.label}</span>
//                             <div className="nav-indicator"></div>
//                         </NavLink>
//                     ))}
//                 </div>
//             </nav>

//             {/* User Section */}
//             <div className="sidebar-footer">
//                 {/* <div className="user-card">
//                     <div className="user-avatar">
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                             <circle cx="12" cy="7" r="4"></circle>
//                         </svg>
//                     </div>
//                     <div className="user-info">
//                         <div className="user-name">Admin User</div>
//                         <div className="user-email">admin@store.com</div>
//                     </div>
//                 </div> */}

//                 <button className="logout-button" aria-label="Logout" onClick={handleLogout}>
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//                         <polyline points="16 17 21 12 16 7"></polyline>
//                         <line x1="21" y1="12" x2="9" y2="12"></line>
//                     </svg>
//                     <span>Logout</span>
//                 </button>
//             </div>

//             {/* Decorative Elements */}
//             <div className="sidebar-decoration decoration-1"></div>
//             <div className="sidebar-decoration decoration-2"></div>
//         </aside>
//     )
// }

import { NavLink, useNavigate } from 'react-router-dom'
// import { authService } from '../../../ecommerce-admin-backend/services/auth.service';
import '../styles/Sidebar.css'

const menuGroups = [
  {
    label: 'Overview',
    items: [
      {
        to: '/admin/dashboard',
        label: 'Dashboard',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'Catalogue',
    items: [
      {
        to: '/admin/products',
        label: 'Products',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        ),
      },
      {
        to: '/admin/categories',
        label: 'Categories',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h10M4 18h6" />
          </svg>
        ),
      },
      {
        to: '/admin/inventory',
        label: 'Inventory',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 8h14M5 8a2 2 0 1 0-4 0v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8m-14 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'Commerce',
    items: [
      {
        to: '/admin/orders',
        label: 'Orders',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        ),
      },
      {
        to: '/admin/customers',
        label: 'Customers',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        to: '/admin/discounts',
        label: 'Discounts',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        ),
      },
      {
        to: '/admin/reviews',
        label: 'Reviews',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        to: '/admin/settings',
        label: 'Settings',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        ),
      },
    ],
  },
]

interface SidebarProps {
  onClose?: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    // await authService.logout()
    navigate('/admin/login')
  }

  return (
    <aside className="sb-root" aria-label="Main navigation">
      {/* ── Header ── */}
      <div className="sb-header">
        <div className="sb-brand">
          <div className="sb-brand-icon">
            <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="9" fill="rgba(0,201,167,0.15)" />
              <path d="M18 8L27 13.5V22.5L18 28L9 22.5V13.5L18 8Z" fill="#00c9a7" />
            </svg>
          </div>
          <div>
            <div className="sb-brand-name">Homies</div>
            <div className="sb-brand-sub">Admin Panel</div>
          </div>
        </div>

        {onClose && (
          <button className="sb-close" onClick={onClose} aria-label="Close sidebar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="sb-nav">
        {menuGroups.map((group) => (
          <div key={group.label} className="sb-group">
            <span className="sb-group-label">{group.label}</span>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `sb-item${isActive ? ' sb-item--active' : ''}`}
              >
                <span className="sb-item-icon">{item.icon}</span>
                <span className="sb-item-label">{item.label}</span>
                <span className="sb-item-pip" />
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="sb-footer">
        <div className="sb-divider" />
        <button className="sb-logout" onClick={handleLogout}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Sign out</span>
        </button>
      </div>

      {/* ambient glow */}
      <div className="sb-glow" aria-hidden="true" />
    </aside>
  )
}
