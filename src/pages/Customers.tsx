// import { useState } from "react";
// import "../styles/Customers.css";

// type OrderHistory = {
//     id: string;
//     date: string;
//     total: number;
//     status: "completed" | "pending" | "cancelled";
//     items: string[];
// };

// type Customer = {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//     city: string;
//     country: string;
//     joinDate: string;
//     status: "active" | "inactive";
//     totalOrders: number;
//     totalSpent: number;
//     averageOrderValue: number;
//     lastOrderDate: string;
//     orderHistory: OrderHistory[];
// };

// const dummyCustomers: Customer[] = [
//     {
//         id: "CU001",
//         name: "John Doe",
//         email: "john.doe@example.com",
//         phone: "+1 234 567 8900",
//         address: "123 Main Street",
//         city: "New York",
//         country: "USA",
//         joinDate: "2024-01-15",
//         status: "active",
//         totalOrders: 15,
//         totalSpent: 4250.50,
//         averageOrderValue: 283.37,
//         lastOrderDate: "2025-11-28",
//         orderHistory: [
//             { id: "ORD101", date: "2025-11-28", total: 299.99, status: "completed", items: ["Wireless Headphones", "USB Cable"] },
//             { id: "ORD092", date: "2025-10-15", total: 149.99, status: "completed", items: ["Phone Case"] },
//             { id: "ORD083", date: "2025-09-20", total: 89.99, status: "completed", items: ["Screen Protector"] },
//         ],
//     },
//     {
//         id: "CU002",
//         name: "Jane Smith",
//         email: "jane.smith@example.com",
//         phone: "+1 234 567 8901",
//         address: "456 Oak Avenue",
//         city: "Los Angeles",
//         country: "USA",
//         joinDate: "2024-03-20",
//         status: "active",
//         totalOrders: 8,
//         totalSpent: 1890.00,
//         averageOrderValue: 236.25,
//         lastOrderDate: "2025-11-25",
//         orderHistory: [
//             { id: "ORD098", date: "2025-11-25", total: 450.00, status: "completed", items: ["Smart Watch", "Fitness Band"] },
//             { id: "ORD075", date: "2025-09-10", total: 320.00, status: "completed", items: ["Laptop Stand"] },
//         ],
//     },
//     {
//         id: "CU003",
//         name: "Robert Johnson",
//         email: "robert.j@example.com",
//         phone: "+1 234 567 8902",
//         address: "789 Pine Street",
//         city: "Chicago",
//         country: "USA",
//         joinDate: "2023-11-10",
//         status: "inactive",
//         totalOrders: 3,
//         totalSpent: 450.00,
//         averageOrderValue: 150.00,
//         lastOrderDate: "2024-08-12",
//         orderHistory: [
//             { id: "ORD045", date: "2024-08-12", total: 150.00, status: "completed", items: ["T-Shirt"] },
//         ],
//     },
// ];

// export default function Customers() {
//     const [customers, setCustomers] = useState<Customer[]>(dummyCustomers);
//     const [showModal, setShowModal] = useState(false);
//     const [modalType, setModalType] = useState<"view" | "add">("view");
//     const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
//     const [editMode, setEditMode] = useState(false);
//     const [formData, setFormData] = useState<Partial<Customer>>({});
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
//     const [selectedOrder, setSelectedOrder] = useState<OrderHistory | null>(null);

//     function openViewModal(customer: Customer) {
//         setModalType("view");
//         setSelectedCustomer(customer);
//         setFormData(customer);
//         setEditMode(false);
//         setSelectedOrder(null);
//         setShowModal(true);
//     }

//     function openAddModal() {
//         setModalType("add");
//         setFormData({ status: "active", totalOrders: 0, totalSpent: 0, averageOrderValue: 0, orderHistory: [] });
//         setSelectedCustomer(null);
//         setEditMode(true);
//         setShowModal(true);
//     }

//     function handleInputChange(field: keyof Customer, value: any) {
//         setFormData({ ...formData, [field]: value });
//     }

//     function handleSaveCustomer() {
//         if (modalType === "add") {
//             const newCustomer: Customer = {
//                 id: `CU${(customers.length + 1).toString().padStart(3, "0")}`,
//                 name: formData.name || "",
//                 email: formData.email || "",
//                 phone: formData.phone || "",
//                 address: formData.address || "",
//                 city: formData.city || "",
//                 country: formData.country || "",
//                 joinDate: new Date().toISOString().split("T")[0],
//                 status: (formData.status as "active" | "inactive") || "active",
//                 totalOrders: 0,
//                 totalSpent: 0,
//                 averageOrderValue: 0,
//                 lastOrderDate: "",
//                 orderHistory: [],
//             };
//             setCustomers([...customers, newCustomer]);
//             setShowModal(false);
//         } else if (editMode && selectedCustomer) {
//             setCustomers(
//                 customers.map((c) =>
//                     c.id === selectedCustomer.id ? { ...selectedCustomer, ...formData } : c
//                 )
//             );
//             setSelectedCustomer({ ...selectedCustomer, ...formData } as Customer);
//             setEditMode(false);
//         }
//     }

//     function handleDeleteCustomer(id: string) {
//         if (window.confirm("Are you sure you want to delete this customer?")) {
//             setCustomers(customers.filter((c) => c.id !== id));
//             setShowModal(false);
//         }
//     }

//     const filteredCustomers = customers.filter((c) => {
//         const matchesSearch =
//             c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             c.email.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesStatus = filterStatus === "all" || c.status === filterStatus;
//         return matchesSearch && matchesStatus;
//     });

//     return (
//         <div className="customers-page">
//             {/* PAGE HEADER */}
//             <div className="page-header">
//                 <div>
//                     <h2>Customers</h2>
//                     <p>Manage customer information, view order history and track customer value</p>
//                 </div>
//                 <button className="action-btn primary" onClick={openAddModal}>
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <line x1="12" y1="5" x2="12" y2="19"></line>
//                         <line x1="5" y1="12" x2="19" y2="12"></line>
//                     </svg>
//                     Add Customer
//                 </button>
//             </div>

//             {/* STATS CARDS */}
//             <div className="stats-grid">
//                 <div className="stat-card">
//                     <div className="stat-icon customers-icon">
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                             <circle cx="9" cy="7" r="4"></circle>
//                             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//                             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//                         </svg>
//                     </div>
//                     <div className="stat-content">
//                         <div className="stat-label">Total Customers</div>
//                         <div className="stat-value">{customers.length}</div>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <div className="stat-icon active-icon">
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
//                         </svg>
//                     </div>
//                     <div className="stat-content">
//                         <div className="stat-label">Active Customers</div>
//                         <div className="stat-value">{customers.filter(c => c.status === "active").length}</div>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <div className="stat-icon revenue-icon">
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <line x1="12" y1="1" x2="12" y2="23"></line>
//                             <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//                         </svg>
//                     </div>
//                     <div className="stat-content">
//                         <div className="stat-label">Total Revenue</div>
//                         <div className="stat-value">${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}</div>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <div className="stat-icon orders-icon">
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
//                             <line x1="3" y1="6" x2="21" y2="6"></line>
//                         </svg>
//                     </div>
//                     <div className="stat-content">
//                         <div className="stat-label">Total Orders</div>
//                         <div className="stat-value">{customers.reduce((sum, c) => sum + c.totalOrders, 0)}</div>
//                     </div>
//                 </div>
//             </div>

//             {/* FILTERS */}
//             <div className="filters">
//                 <div className="search-box">
//                     <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <circle cx="11" cy="11" r="8"></circle>
//                         <path d="m21 21-4.35-4.35"></path>
//                     </svg>
//                     <input
//                         type="text"
//                         placeholder="Search by name or email..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//                 <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
//                     <option value="all">All Status</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                 </select>
//             </div>

//             {/* CUSTOMERS TABLE */}
//             <div className="card customers-table-card">
//                 <table className="customers-table">
//                     <thead>
//                         <tr>
//                             <th>Customer ID</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Location</th>
//                             <th>Total Orders</th>
//                             <th>Total Spent</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredCustomers.map((customer) => (
//                             <tr key={customer.id} onClick={() => openViewModal(customer)} style={{ cursor: "pointer" }}>
//                                 <td className="customer-id">{customer.id}</td>
//                                 <td className="customer-name">{customer.name}</td>
//                                 <td className="customer-email">{customer.email}</td>
//                                 <td>{customer.city}, {customer.country}</td>
//                                 <td className="text-center">{customer.totalOrders}</td>
//                                 <td className="customer-spent">${customer.totalSpent.toFixed(2)}</td>
//                                 <td>
//                                     <span className={`status-badge ${customer.status}`}>
//                                         {customer.status}
//                                     </span>
//                                 </td>
//                                 <td className="actions" onClick={(e) => e.stopPropagation()}>
//                                     <button className="view-btn" onClick={() => openViewModal(customer)}>
//                                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                                             <circle cx="12" cy="12" r="3"></circle>
//                                         </svg>
//                                         View
//                                     </button>
//                                     <button className="delete-btn" onClick={() => handleDeleteCustomer(customer.id)}>
//                                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                             <polyline points="3 6 5 6 21 6"></polyline>
//                                             <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//                                         </svg>
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* CUSTOMER MODAL */}
//             {showModal && (
//                 <div className="customer-modal">
//                     <div className="customer-modal-content">
//                         <div className="modal-header">
//                             <h3>
//                                 {modalType === "add" ? "Add New Customer" : selectedCustomer?.name}
//                             </h3>
//                             <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
//                         </div>

//                         <div className="modal-body">
//                             {modalType === "view" && selectedCustomer && !selectedOrder ? (
//                                 <>
//                                     {/* Customer Overview */}
//                                     <div className="customer-overview">
//                                         <div className="customer-avatar">
//                                             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                                                 <circle cx="12" cy="7" r="4"></circle>
//                                             </svg>
//                                         </div>
//                                         <div className="customer-summary">
//                                             <div className="summary-item">
//                                                 <span className="summary-label">Customer Since</span>
//                                                 <span className="summary-value">{new Date(selectedCustomer.joinDate).toLocaleDateString()}</span>
//                                             </div>
//                                             <div className="summary-item">
//                                                 <span className="summary-label">Last Order</span>
//                                                 <span className="summary-value">{selectedCustomer.lastOrderDate ? new Date(selectedCustomer.lastOrderDate).toLocaleDateString() : "No orders"}</span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Customer Stats */}
//                                     <div className="customer-stats">
//                                         <div className="stat-item">
//                                             <div className="stat-number">{selectedCustomer.totalOrders}</div>
//                                             <div className="stat-text">Total Orders</div>
//                                         </div>
//                                         <div className="stat-item">
//                                             <div className="stat-number">${selectedCustomer.totalSpent.toFixed(2)}</div>
//                                             <div className="stat-text">Total Spent</div>
//                                         </div>
//                                         <div className="stat-item">
//                                             <div className="stat-number">${selectedCustomer.averageOrderValue.toFixed(2)}</div>
//                                             <div className="stat-text">Avg Order Value</div>
//                                         </div>
//                                     </div>

//                                     <h4 className="section-title">Customer Information</h4>
//                                     {editMode ? (
//                                         <div className="form-grid">
//                                             <div className="form-group">
//                                                 <label>Name</label>
//                                                 <input type="text" value={formData.name || ""} onChange={(e) => handleInputChange("name", e.target.value)} />
//                                             </div>
//                                             <div className="form-group">
//                                                 <label>Email</label>
//                                                 <input type="email" value={formData.email || ""} onChange={(e) => handleInputChange("email", e.target.value)} />
//                                             </div>
//                                             <div className="form-group">
//                                                 <label>Phone</label>
//                                                 <input type="text" value={formData.phone || ""} onChange={(e) => handleInputChange("phone", e.target.value)} />
//                                             </div>
//                                             <div className="form-group">
//                                                 <label>Status</label>
//                                                 <select value={formData.status || "active"} onChange={(e) => handleInputChange("status", e.target.value)}>
//                                                     <option value="active">Active</option>
//                                                     <option value="inactive">Inactive</option>
//                                                 </select>
//                                             </div>
//                                             <div className="form-group full-width">
//                                                 <label>Address</label>
//                                                 <input type="text" value={formData.address || ""} onChange={(e) => handleInputChange("address", e.target.value)} />
//                                             </div>
//                                             <div className="form-group">
//                                                 <label>City</label>
//                                                 <input type="text" value={formData.city || ""} onChange={(e) => handleInputChange("city", e.target.value)} />
//                                             </div>
//                                             <div className="form-group">
//                                                 <label>Country</label>
//                                                 <input type="text" value={formData.country || ""} onChange={(e) => handleInputChange("country", e.target.value)} />
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <div className="info-grid">
//                                             <div className="info-item">
//                                                 <span className="info-label">Email</span>
//                                                 <span className="info-value">{selectedCustomer.email}</span>
//                                             </div>
//                                             <div className="info-item">
//                                                 <span className="info-label">Phone</span>
//                                                 <span className="info-value">{selectedCustomer.phone}</span>
//                                             </div>
//                                             <div className="info-item">
//                                                 <span className="info-label">Address</span>
//                                                 <span className="info-value">{selectedCustomer.address}</span>
//                                             </div>
//                                             <div className="info-item">
//                                                 <span className="info-label">City</span>
//                                                 <span className="info-value">{selectedCustomer.city}</span>
//                                             </div>
//                                             <div className="info-item">
//                                                 <span className="info-label">Country</span>
//                                                 <span className="info-value">{selectedCustomer.country}</span>
//                                             </div>
//                                             <div className="info-item">
//                                                 <span className="info-label">Status</span>
//                                                 <span className={`status-badge ${selectedCustomer.status}`}>{selectedCustomer.status}</span>
//                                             </div>
//                                         </div>
//                                     )}

//                                     {/* Order History */}
//                                     <h4 className="section-title">Order History</h4>
//                                     <div className="order-history">
//                                         {selectedCustomer.orderHistory.length > 0 ? (
//                                             selectedCustomer.orderHistory.map((order) => (
//                                                 <div key={order.id} className="order-card" onClick={() => setSelectedOrder(order)}>
//                                                     <div className="order-header-row">
//                                                         <span className="order-id">#{order.id}</span>
//                                                         <span className={`order-status ${order.status}`}>{order.status}</span>
//                                                     </div>
//                                                     <div className="order-details-row">
//                                                         <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
//                                                         <span className="order-total">${order.total.toFixed(2)}</span>
//                                                     </div>
//                                                     <div className="order-items">{order.items.join(", ")}</div>
//                                                 </div>
//                                             ))
//                                         ) : (
//                                             <div className="empty-state">No orders yet</div>
//                                         )}
//                                     </div>
//                                 </>
//                             ) : modalType === "view" && selectedOrder ? (
//                                 <>
//                                     {/* Order Detail View */}
//                                     <button className="back-btn" onClick={() => setSelectedOrder(null)}>
//                                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                             <line x1="19" y1="12" x2="5" y2="12"></line>
//                                             <polyline points="12 19 5 12 12 5"></polyline>
//                                         </svg>
//                                         Back to Customer
//                                     </button>
//                                     <h4 className="section-title">Order Details - #{selectedOrder.id}</h4>
//                                     <div className="order-detail-card">
//                                         <div className="detail-row">
//                                             <span className="detail-label">Order Date</span>
//                                             <span className="detail-value">{new Date(selectedOrder.date).toLocaleDateString()}</span>
//                                         </div>
//                                         <div className="detail-row">
//                                             <span className="detail-label">Status</span>
//                                             <span className={`status-badge ${selectedOrder.status}`}>{selectedOrder.status}</span>
//                                         </div>
//                                         <div className="detail-row">
//                                             <span className="detail-label">Total Amount</span>
//                                             <span className="detail-value total">${selectedOrder.total.toFixed(2)}</span>
//                                         </div>
//                                         <div className="detail-row">
//                                             <span className="detail-label">Items Ordered</span>
//                                             <div className="items-list">
//                                                 {selectedOrder.items.map((item, idx) => (
//                                                     <span key={idx} className="item-badge">{item}</span>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <>
//                                     {/* Add Customer Form */}
//                                     <h4 className="section-title">Customer Information</h4>
//                                     <div className="form-grid">
//                                         <div className="form-group">
//                                             <label>Name</label>
//                                             <input type="text" placeholder="Enter name" value={formData.name || ""} onChange={(e) => handleInputChange("name", e.target.value)} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Email</label>
//                                             <input type="email" placeholder="Enter email" value={formData.email || ""} onChange={(e) => handleInputChange("email", e.target.value)} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Phone</label>
//                                             <input type="text" placeholder="Enter phone" value={formData.phone || ""} onChange={(e) => handleInputChange("phone", e.target.value)} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Status</label>
//                                             <select value={formData.status || "active"} onChange={(e) => handleInputChange("status", e.target.value)}>
//                                                 <option value="active">Active</option>
//                                                 <option value="inactive">Inactive</option>
//                                             </select>
//                                         </div>
//                                         <div className="form-group full-width">
//                                             <label>Address</label>
//                                             <input type="text" placeholder="Enter address" value={formData.address || ""} onChange={(e) => handleInputChange("address", e.target.value)} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>City</label>
//                                             <input type="text" placeholder="Enter city" value={formData.city || ""} onChange={(e) => handleInputChange("city", e.target.value)} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Country</label>
//                                             <input type="text" placeholder="Enter country" value={formData.country || ""} onChange={(e) => handleInputChange("country", e.target.value)} />
//                                         </div>
//                                     </div>
//                                 </>
//                             )}
//                         </div>

//                         <div className="modal-footer">
//                             {modalType === "view" && !selectedOrder && (
//                                 <>
//                                     {editMode ? (
//                                         <>
//                                             <button className="save-btn" onClick={handleSaveCustomer}>Save Changes</button>
//                                             <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <button className="edit-action-btn" onClick={() => setEditMode(true)}>Edit Customer</button>
//                                             <button className="delete-btn" onClick={() => handleDeleteCustomer(selectedCustomer!.id)}>Delete Customer</button>
//                                         </>
//                                     )}
//                                 </>
//                             )}
//                             {modalType === "add" && (
//                                 <button className="save-btn" onClick={handleSaveCustomer}>Add Customer</button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import '../styles/Customers.css'
import { customerService, type Customer, type OrderHistoryItem, type CustomerStatus } from '../services/customer.service';

/* ─────────────────────────────────────
   Helpers
───────────────────────────────────── */
function formatDate(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}

function initials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map(s => s.charAt(0).toUpperCase()).join('') || '?'
}

/* ─────────────────────────────────────
   Sub-components
───────────────────────────────────── */
const StatusBadge: React.FC<{ status: CustomerStatus }> = ({ status }) => (
  <span className={`cu-badge cu-badge--${status}`}>{status === 'active' ? 'Active' : 'Inactive'}</span>
)

const OrderStatusBadge: React.FC<{ status: OrderHistoryItem['status'] }> = ({ status }) => (
  <span className={`cu-order-status cu-order-status--${status}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
)

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <tr>
    <td colSpan={7} className="cu-empty">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      </svg>
      <p>{message}</p>
    </td>
  </tr>
)

/* ─────────────────────────────────────
   Main component
───────────────────────────────────── */
export default function Customers() {
  const [customers,        setCustomers]       = useState<Customer[]>([])
  const [loading,          setLoading]         = useState(true)
  const [showModal,        setShowModal]       = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [editMode,         setEditMode]        = useState(false)
  const [formData,         setFormData]        = useState<Partial<Customer>>({})
  const [searchTerm,       setSearchTerm]      = useState('')
  const [filterStatus,     setFilterStatus]    = useState<'all' | CustomerStatus>('all')
  const [selectedOrder,    setSelectedOrder]   = useState<OrderHistoryItem | null>(null)
  const [saving,           setSaving]          = useState(false)
  const [toast,            setToast]           = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [sortBy,           setSortBy]          = useState<'recent' | 'spent' | 'orders'>('recent')

  /* ── Toast auto-dismiss ── */
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(t)
  }, [toast])

  /* ── Load customers (stats already aggregated server-side) ── */
  const loadCustomers = useCallback(async () => {
    setLoading(true)
    try {
      const data = await customerService.getCustomers()
      setCustomers(data)
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to load customers', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadCustomers() }, [loadCustomers])

  /* ── Keyboard / scroll lock ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowModal(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  /* ── Open / close ── */
  async function openViewModal(customer: Customer) {
    setSelectedCustomer(customer)
    setFormData(customer)
    setEditMode(false)
    setSelectedOrder(null)
    setShowModal(true)
    // Refresh with full order history in case the list view trimmed it
    try {
      const fresh = await customerService.getCustomer(customer.id)
      setSelectedCustomer(fresh)
      setFormData(fresh)
    } catch (err) {
      console.error(err)
      // keep the row data already shown rather than blocking
    }
  }

  function closeModal() {
    setShowModal(false)
    setSelectedCustomer(null)
    setSelectedOrder(null)
    setEditMode(false)
  }

  function handleInput(field: keyof Customer, value: unknown) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  /* ── Save profile edits (never touches stats — those are derived) ── */
  async function handleSaveCustomer() {
    if (!selectedCustomer) return
    if (!formData.name?.trim()) { setToast({ msg: 'Name is required', type: 'error' }); return }
    if (!formData.email?.trim()) { setToast({ msg: 'Email is required', type: 'error' }); return }

    setSaving(true)
    try {
      await customerService.updateCustomer(selectedCustomer.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        status: formData.status as CustomerStatus,
      })
      const updated = { ...selectedCustomer, ...formData } as Customer
      setCustomers(prev => prev.map(c => c.id === selectedCustomer.id ? updated : c))
      setSelectedCustomer(updated)
      setEditMode(false)
      setToast({ msg: 'Customer updated', type: 'success' })
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to update customer', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  /* ── Toggle active/inactive (soft action, preserves order history) ── */
  async function handleToggleStatus(customer: Customer) {
    const goingInactive = customer.status === 'active'
    try {
      if (goingInactive) await customerService.deactivateCustomer(customer.id)
      else await customerService.activateCustomer(customer.id)

      const newStatus: CustomerStatus = goingInactive ? 'inactive' : 'active'
      setCustomers(prev => prev.map(c => c.id === customer.id ? { ...c, status: newStatus } : c))
      if (selectedCustomer?.id === customer.id) {
        setSelectedCustomer({ ...selectedCustomer, status: newStatus })
        setFormData(f => ({ ...f, status: newStatus }))
      }
      setToast({ msg: goingInactive ? 'Customer deactivated' : 'Customer reactivated', type: 'success' })
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to update status', type: 'error' })
    }
  }

  /* ── Hard delete (backend should reject if order history exists) ── */
  async function handleDeleteCustomer(id: number) {
    if (!window.confirm('Delete this customer permanently? This is only possible if they have no order history.')) return
    try {
      await customerService.deleteCustomer(id)
      setCustomers(prev => prev.filter(c => c.id !== id))
      setToast({ msg: 'Customer deleted', type: 'success' })
      closeModal()
    } catch (err: any) {
      console.error(err)
      const msg = err?.response?.status === 409
        ? 'Cannot delete — this customer has order history. Deactivate instead.'
        : 'Failed to delete customer'
      setToast({ msg, type: 'error' })
    }
  }

  /* ── Filter + sort ── */
  const filtered = useMemo(() => {
    let list = customers.filter(c => {
      const term = searchTerm.toLowerCase()
      const matchSearch = c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term)
      const matchStatus = filterStatus === 'all' || c.status === filterStatus
      return matchSearch && matchStatus
    })
    if (sortBy === 'spent')  list = [...list].sort((a, b) => b.totalSpent - a.totalSpent)
    if (sortBy === 'orders') list = [...list].sort((a, b) => b.totalOrders - a.totalOrders)
    if (sortBy === 'recent') list = [...list].sort((a, b) => new Date(b.lastOrderDate ?? 0).getTime() - new Date(a.lastOrderDate ?? 0).getTime())
    return list
  }, [customers, searchTerm, filterStatus, sortBy])

  /* ── Aggregate stats ── */
  const totalRevenue = useMemo(() => customers.reduce((s, c) => s + c.totalSpent, 0), [customers])
  const totalOrders  = useMemo(() => customers.reduce((s, c) => s + c.totalOrders, 0), [customers])
  const activeCount  = customers.filter(c => c.status === 'active').length
  const repeatCount  = customers.filter(c => c.totalOrders > 1).length

  /* ─────────────────────────────────────
     Render
  ───────────────────────────────────── */
  return (
    <div className="cu-page">

      {/* ── Toast ── */}
      {toast && (
        <div className={`cu-toast cu-toast--${toast.type}`} role="alert">
          {toast.type === 'success'
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          }
          {toast.msg}
        </div>
      )}

      {/* ── Header ── */}
      <div className="cu-header">
        <div className="cu-header-text">
          <h2>Customers</h2>
          <p>Built automatically from order history — totals and order counts are always live</p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="cu-stats-grid">
        <div className="cu-stat-card">
          <div className="cu-stat-icon cu-stat-icon--teal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <div className="cu-stat-content">
            <div className="cu-stat-label">Total Customers</div>
            <div className="cu-stat-value">{loading ? '—' : customers.length}</div>
          </div>
        </div>
        <div className="cu-stat-card">
          <div className="cu-stat-icon cu-stat-icon--green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
          </div>
          <div className="cu-stat-content">
            <div className="cu-stat-label">Active</div>
            <div className="cu-stat-value">{loading ? '—' : activeCount}</div>
          </div>
        </div>
        <div className="cu-stat-card">
          <div className="cu-stat-icon cu-stat-icon--amber">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
          </div>
          <div className="cu-stat-content">
            <div className="cu-stat-label">Total Revenue</div>
            <div className="cu-stat-value">{loading ? '—' : `$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}</div>
          </div>
        </div>
        <div className="cu-stat-card">
          <div className="cu-stat-icon cu-stat-icon--blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /></svg>
          </div>
          <div className="cu-stat-content">
            <div className="cu-stat-label">Total Orders</div>
            <div className="cu-stat-value">{loading ? '—' : totalOrders}</div>
          </div>
        </div>
        <div className="cu-stat-card">
          <div className="cu-stat-icon cu-stat-icon--purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>
          </div>
          <div className="cu-stat-content">
            <div className="cu-stat-label">Repeat Customers</div>
            <div className="cu-stat-value">{loading ? '—' : repeatCount}</div>
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="cu-filters">
        <div className="cu-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input
            type="search"
            placeholder="Search by name or email…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search customers"
          />
        </div>
        <select className="cu-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value as typeof filterStatus)} aria-label="Filter by status">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select className="cu-select" value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} aria-label="Sort by">
          <option value="recent">Most Recent Order</option>
          <option value="spent">Highest Spend</option>
          <option value="orders">Most Orders</option>
        </select>
      </div>

      {/* ── Table card ── */}
      <div className="cu-card">
        <div className="cu-table-wrap">
          <table className="cu-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Location</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j}><div className="cu-shimmer" style={{ height: 16, borderRadius: 6 }} /></td>
                      ))}
                    </tr>
                  ))
                : filtered.length === 0
                  ? <EmptyState message={searchTerm || filterStatus !== 'all' ? 'No customers match your filters' : 'No customers yet — they appear here automatically once orders come in'} />
                  : filtered.map(customer => (
                      <tr key={customer.id} className="cu-row" onClick={() => openViewModal(customer)}>
                        <td>
                          <div className="cu-customer-cell">
                            <div className="cu-avatar">{initials(customer.name)}</div>
                            <span className="cu-customer-name">{customer.name}</span>
                          </div>
                        </td>
                        <td className="cu-muted">{customer.email}</td>
                        <td className="cu-muted">{customer.city}{customer.country ? `, ${customer.country}` : ''}</td>
                        <td className="cu-text-center"><span className="cu-order-count">{customer.totalOrders}</span></td>
                        <td><span className="cu-spent">${customer.totalSpent.toFixed(2)}</span></td>
                        <td><StatusBadge status={customer.status} /></td>
                        <td onClick={e => e.stopPropagation()}>
                          <div className="cu-actions">
                            <button className="cu-action-btn cu-action-btn--view" onClick={() => openViewModal(customer)}>View</button>
                            <button
                              className={`cu-action-btn ${customer.status === 'active' ? 'cu-action-btn--deactivate' : 'cu-action-btn--activate'}`}
                              onClick={() => handleToggleStatus(customer)}
                            >
                              {customer.status === 'active' ? 'Deactivate' : 'Activate'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* ──────────── MODAL ──────────── */}
      {showModal && selectedCustomer && (
        <div className="cu-modal-overlay" role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="cu-modal">

            {/* Header */}
            <div className="cu-modal-header">
              <h3>{selectedCustomer.name}</h3>
              <button className="cu-close-btn" onClick={closeModal} aria-label="Close">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="cu-modal-body">
              {!selectedOrder ? (
                <>
                  {/* Overview */}
                  <div className="cu-overview">
                    <div className="cu-overview-avatar">{initials(selectedCustomer.name)}</div>
                    <div className="cu-overview-meta">
                      <div className="cu-overview-item">
                        <span className="cu-overview-label">Customer Since</span>
                        <span className="cu-overview-value">{formatDate(selectedCustomer.joinDate)}</span>
                      </div>
                      <div className="cu-overview-item">
                        <span className="cu-overview-label">Last Order</span>
                        <span className="cu-overview-value">{formatDate(selectedCustomer.lastOrderDate)}</span>
                      </div>
                    </div>
                    <StatusBadge status={selectedCustomer.status} />
                  </div>

                  {/* Stats */}
                  <div className="cu-stat-trio">
                    <div className="cu-trio-item">
                      <div className="cu-trio-num">{selectedCustomer.totalOrders}</div>
                      <div className="cu-trio-lbl">Total Orders</div>
                    </div>
                    <div className="cu-trio-item">
                      <div className="cu-trio-num">${selectedCustomer.totalSpent.toFixed(2)}</div>
                      <div className="cu-trio-lbl">Total Spent</div>
                    </div>
                    <div className="cu-trio-item">
                      <div className="cu-trio-num">${selectedCustomer.averageOrderValue.toFixed(2)}</div>
                      <div className="cu-trio-lbl">Avg Order Value</div>
                    </div>
                  </div>

                  {/* Profile info */}
                  <div className="cu-section">
                    <div className="cu-section-title-row">
                      <div className="cu-section-title"><span className="cu-section-bar" />Profile Information</div>
                      {!editMode && (
                        <button className="cu-edit-link" onClick={() => setEditMode(true)}>Edit</button>
                      )}
                    </div>

                    {editMode ? (
                      <div className="cu-form-grid">
                        <div className="cu-field">
                          <label>Name</label>
                          <input value={formData.name ?? ''} onChange={e => handleInput('name', e.target.value)} />
                        </div>
                        <div className="cu-field">
                          <label>Email</label>
                          <input type="email" value={formData.email ?? ''} onChange={e => handleInput('email', e.target.value)} />
                        </div>
                        <div className="cu-field">
                          <label>Phone</label>
                          <input value={formData.phone ?? ''} onChange={e => handleInput('phone', e.target.value)} />
                        </div>
                        <div className="cu-field">
                          <label>Status</label>
                          <select className="cu-select" value={formData.status ?? 'active'} onChange={e => handleInput('status', e.target.value)}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                        <div className="cu-field cu-field--full">
                          <label>Address</label>
                          <input value={formData.address ?? ''} onChange={e => handleInput('address', e.target.value)} />
                        </div>
                        <div className="cu-field">
                          <label>City</label>
                          <input value={formData.city ?? ''} onChange={e => handleInput('city', e.target.value)} />
                        </div>
                        <div className="cu-field">
                          <label>Country</label>
                          <input value={formData.country ?? ''} onChange={e => handleInput('country', e.target.value)} />
                        </div>
                      </div>
                    ) : (
                      <div className="cu-info-grid">
                        <div className="cu-info-item"><span className="cu-info-label">Email</span><span className="cu-info-value">{selectedCustomer.email}</span></div>
                        <div className="cu-info-item"><span className="cu-info-label">Phone</span><span className="cu-info-value">{selectedCustomer.phone || '—'}</span></div>
                        <div className="cu-info-item"><span className="cu-info-label">Address</span><span className="cu-info-value">{selectedCustomer.address || '—'}</span></div>
                        <div className="cu-info-item"><span className="cu-info-label">City</span><span className="cu-info-value">{selectedCustomer.city || '—'}</span></div>
                        <div className="cu-info-item"><span className="cu-info-label">Country</span><span className="cu-info-value">{selectedCustomer.country || '—'}</span></div>
                      </div>
                    )}
                  </div>

                  {/* Order history */}
                  <div className="cu-section">
                    <div className="cu-section-title"><span className="cu-section-bar" />Order History</div>
                    {selectedCustomer.orderHistory.length === 0 ? (
                      <div className="cu-no-orders">No orders yet</div>
                    ) : (
                      <div className="cu-order-list">
                        {selectedCustomer.orderHistory.map(order => (
                          <button key={order.id} className="cu-order-card" onClick={() => setSelectedOrder(order)}>
                            <div className="cu-order-row">
                              <span className="cu-order-id">#{order.id}</span>
                              <OrderStatusBadge status={order.status} />
                            </div>
                            <div className="cu-order-row">
                              <span className="cu-order-date">{formatDate(order.date)}</span>
                              <span className="cu-order-total">${order.total.toFixed(2)}</span>
                            </div>
                            <div className="cu-order-items">{order.items.join(', ')}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Single order detail */}
                  <button className="cu-back-btn" onClick={() => setSelectedOrder(null)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                    Back to Customer
                  </button>
                  <div className="cu-section-title"><span className="cu-section-bar" />Order #{selectedOrder.id}</div>
                  <div className="cu-order-detail-card">
                    <div className="cu-detail-row"><span>Date</span><span>{formatDate(selectedOrder.date)}</span></div>
                    <div className="cu-detail-row"><span>Status</span><OrderStatusBadge status={selectedOrder.status} /></div>
                    <div className="cu-detail-row cu-detail-row--total"><span>Total</span><span>${selectedOrder.total.toFixed(2)}</span></div>
                    <div className="cu-detail-row cu-detail-row--items">
                      <span>Items</span>
                      <div className="cu-items-list">
                        {selectedOrder.items.map((item, i) => <span key={i} className="cu-item-chip">{item}</span>)}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {!selectedOrder && (
              <div className="cu-modal-footer">
                {editMode ? (
                  <>
                    <button className="cu-btn cu-btn--ghost" onClick={() => { setEditMode(false); setFormData(selectedCustomer) }}>Cancel</button>
                    <button className="cu-btn cu-btn--primary" onClick={handleSaveCustomer} disabled={saving}>
                      {saving ? <><span className="cu-spinner" />Saving…</> : 'Save Changes'}
                    </button>
                  </>
                ) : (
                  <>
                    <button className="cu-btn cu-btn--danger" onClick={() => handleDeleteCustomer(selectedCustomer.id)}>Delete</button>
                    <button
                      className="cu-btn cu-btn--secondary"
                      onClick={() => handleToggleStatus(selectedCustomer)}
                    >
                      {selectedCustomer.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="cu-btn cu-btn--primary" onClick={() => setEditMode(true)}>Edit Customer</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}