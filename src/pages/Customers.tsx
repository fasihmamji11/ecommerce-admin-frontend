import { useState } from "react";
import "../styles/Customers.css";

type OrderHistory = {
    id: string;
    date: string;
    total: number;
    status: "completed" | "pending" | "cancelled";
    items: string[];
};

type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    joinDate: string;
    status: "active" | "inactive";
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    lastOrderDate: string;
    orderHistory: OrderHistory[];
};

const dummyCustomers: Customer[] = [
    {
        id: "CU001",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 8900",
        address: "123 Main Street",
        city: "New York",
        country: "USA",
        joinDate: "2024-01-15",
        status: "active",
        totalOrders: 15,
        totalSpent: 4250.50,
        averageOrderValue: 283.37,
        lastOrderDate: "2025-11-28",
        orderHistory: [
            { id: "ORD101", date: "2025-11-28", total: 299.99, status: "completed", items: ["Wireless Headphones", "USB Cable"] },
            { id: "ORD092", date: "2025-10-15", total: 149.99, status: "completed", items: ["Phone Case"] },
            { id: "ORD083", date: "2025-09-20", total: 89.99, status: "completed", items: ["Screen Protector"] },
        ],
    },
    {
        id: "CU002",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 234 567 8901",
        address: "456 Oak Avenue",
        city: "Los Angeles",
        country: "USA",
        joinDate: "2024-03-20",
        status: "active",
        totalOrders: 8,
        totalSpent: 1890.00,
        averageOrderValue: 236.25,
        lastOrderDate: "2025-11-25",
        orderHistory: [
            { id: "ORD098", date: "2025-11-25", total: 450.00, status: "completed", items: ["Smart Watch", "Fitness Band"] },
            { id: "ORD075", date: "2025-09-10", total: 320.00, status: "completed", items: ["Laptop Stand"] },
        ],
    },
    {
        id: "CU003",
        name: "Robert Johnson",
        email: "robert.j@example.com",
        phone: "+1 234 567 8902",
        address: "789 Pine Street",
        city: "Chicago",
        country: "USA",
        joinDate: "2023-11-10",
        status: "inactive",
        totalOrders: 3,
        totalSpent: 450.00,
        averageOrderValue: 150.00,
        lastOrderDate: "2024-08-12",
        orderHistory: [
            { id: "ORD045", date: "2024-08-12", total: 150.00, status: "completed", items: ["T-Shirt"] },
        ],
    },
];

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>(dummyCustomers);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"view" | "add">("view");
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<Partial<Customer>>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
    const [selectedOrder, setSelectedOrder] = useState<OrderHistory | null>(null);

    function openViewModal(customer: Customer) {
        setModalType("view");
        setSelectedCustomer(customer);
        setFormData(customer);
        setEditMode(false);
        setSelectedOrder(null);
        setShowModal(true);
    }

    function openAddModal() {
        setModalType("add");
        setFormData({ status: "active", totalOrders: 0, totalSpent: 0, averageOrderValue: 0, orderHistory: [] });
        setSelectedCustomer(null);
        setEditMode(true);
        setShowModal(true);
    }

    function handleInputChange(field: keyof Customer, value: any) {
        setFormData({ ...formData, [field]: value });
    }

    function handleSaveCustomer() {
        if (modalType === "add") {
            const newCustomer: Customer = {
                id: `CU${(customers.length + 1).toString().padStart(3, "0")}`,
                name: formData.name || "",
                email: formData.email || "",
                phone: formData.phone || "",
                address: formData.address || "",
                city: formData.city || "",
                country: formData.country || "",
                joinDate: new Date().toISOString().split("T")[0],
                status: (formData.status as "active" | "inactive") || "active",
                totalOrders: 0,
                totalSpent: 0,
                averageOrderValue: 0,
                lastOrderDate: "",
                orderHistory: [],
            };
            setCustomers([...customers, newCustomer]);
            setShowModal(false);
        } else if (editMode && selectedCustomer) {
            setCustomers(
                customers.map((c) =>
                    c.id === selectedCustomer.id ? { ...selectedCustomer, ...formData } : c
                )
            );
            setSelectedCustomer({ ...selectedCustomer, ...formData } as Customer);
            setEditMode(false);
        }
    }

    function handleDeleteCustomer(id: string) {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            setCustomers(customers.filter((c) => c.id !== id));
            setShowModal(false);
        }
    }

    const filteredCustomers = customers.filter((c) => {
        const matchesSearch =
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || c.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="customers-page">
            {/* PAGE HEADER */}
            <div className="page-header">
                <div>
                    <h2>Customers</h2>
                    <p>Manage customer information, view order history and track customer value</p>
                </div>
                <button className="action-btn primary" onClick={openAddModal}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Customer
                </button>
            </div>

            {/* STATS CARDS */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon customers-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Total Customers</div>
                        <div className="stat-value">{customers.length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon active-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Active Customers</div>
                        <div className="stat-value">{customers.filter(c => c.status === "active").length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon revenue-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Total Revenue</div>
                        <div className="stat-value">${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon orders-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Total Orders</div>
                        <div className="stat-value">{customers.reduce((sum, c) => sum + c.totalOrders, 0)}</div>
                    </div>
                </div>
            </div>

            {/* FILTERS */}
            <div className="filters">
                <div className="search-box">
                    <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* CUSTOMERS TABLE */}
            <div className="card customers-table-card">
                <table className="customers-table">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Total Orders</th>
                            <th>Total Spent</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id} onClick={() => openViewModal(customer)} style={{ cursor: "pointer" }}>
                                <td className="customer-id">{customer.id}</td>
                                <td className="customer-name">{customer.name}</td>
                                <td className="customer-email">{customer.email}</td>
                                <td>{customer.city}, {customer.country}</td>
                                <td className="text-center">{customer.totalOrders}</td>
                                <td className="customer-spent">${customer.totalSpent.toFixed(2)}</td>
                                <td>
                                    <span className={`status-badge ${customer.status}`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td className="actions" onClick={(e) => e.stopPropagation()}>
                                    <button className="view-btn" onClick={() => openViewModal(customer)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                        View
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDeleteCustomer(customer.id)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CUSTOMER MODAL */}
            {showModal && (
                <div className="customer-modal">
                    <div className="customer-modal-content">
                        <div className="modal-header">
                            <h3>
                                {modalType === "add" ? "Add New Customer" : selectedCustomer?.name}
                            </h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                        </div>

                        <div className="modal-body">
                            {modalType === "view" && selectedCustomer && !selectedOrder ? (
                                <>
                                    {/* Customer Overview */}
                                    <div className="customer-overview">
                                        <div className="customer-avatar">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </div>
                                        <div className="customer-summary">
                                            <div className="summary-item">
                                                <span className="summary-label">Customer Since</span>
                                                <span className="summary-value">{new Date(selectedCustomer.joinDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="summary-item">
                                                <span className="summary-label">Last Order</span>
                                                <span className="summary-value">{selectedCustomer.lastOrderDate ? new Date(selectedCustomer.lastOrderDate).toLocaleDateString() : "No orders"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Customer Stats */}
                                    <div className="customer-stats">
                                        <div className="stat-item">
                                            <div className="stat-number">{selectedCustomer.totalOrders}</div>
                                            <div className="stat-text">Total Orders</div>
                                        </div>
                                        <div className="stat-item">
                                            <div className="stat-number">${selectedCustomer.totalSpent.toFixed(2)}</div>
                                            <div className="stat-text">Total Spent</div>
                                        </div>
                                        <div className="stat-item">
                                            <div className="stat-number">${selectedCustomer.averageOrderValue.toFixed(2)}</div>
                                            <div className="stat-text">Avg Order Value</div>
                                        </div>
                                    </div>

                                    <h4 className="section-title">Customer Information</h4>
                                    {editMode ? (
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" value={formData.name || ""} onChange={(e) => handleInputChange("name", e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" value={formData.email || ""} onChange={(e) => handleInputChange("email", e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input type="text" value={formData.phone || ""} onChange={(e) => handleInputChange("phone", e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Status</label>
                                                <select value={formData.status || "active"} onChange={(e) => handleInputChange("status", e.target.value)}>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>
                                            <div className="form-group full-width">
                                                <label>Address</label>
                                                <input type="text" value={formData.address || ""} onChange={(e) => handleInputChange("address", e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>City</label>
                                                <input type="text" value={formData.city || ""} onChange={(e) => handleInputChange("city", e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Country</label>
                                                <input type="text" value={formData.country || ""} onChange={(e) => handleInputChange("country", e.target.value)} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="info-grid">
                                            <div className="info-item">
                                                <span className="info-label">Email</span>
                                                <span className="info-value">{selectedCustomer.email}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Phone</span>
                                                <span className="info-value">{selectedCustomer.phone}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Address</span>
                                                <span className="info-value">{selectedCustomer.address}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">City</span>
                                                <span className="info-value">{selectedCustomer.city}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Country</span>
                                                <span className="info-value">{selectedCustomer.country}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Status</span>
                                                <span className={`status-badge ${selectedCustomer.status}`}>{selectedCustomer.status}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Order History */}
                                    <h4 className="section-title">Order History</h4>
                                    <div className="order-history">
                                        {selectedCustomer.orderHistory.length > 0 ? (
                                            selectedCustomer.orderHistory.map((order) => (
                                                <div key={order.id} className="order-card" onClick={() => setSelectedOrder(order)}>
                                                    <div className="order-header-row">
                                                        <span className="order-id">#{order.id}</span>
                                                        <span className={`order-status ${order.status}`}>{order.status}</span>
                                                    </div>
                                                    <div className="order-details-row">
                                                        <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                                                        <span className="order-total">${order.total.toFixed(2)}</span>
                                                    </div>
                                                    <div className="order-items">{order.items.join(", ")}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="empty-state">No orders yet</div>
                                        )}
                                    </div>
                                </>
                            ) : modalType === "view" && selectedOrder ? (
                                <>
                                    {/* Order Detail View */}
                                    <button className="back-btn" onClick={() => setSelectedOrder(null)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="19" y1="12" x2="5" y2="12"></line>
                                            <polyline points="12 19 5 12 12 5"></polyline>
                                        </svg>
                                        Back to Customer
                                    </button>
                                    <h4 className="section-title">Order Details - #{selectedOrder.id}</h4>
                                    <div className="order-detail-card">
                                        <div className="detail-row">
                                            <span className="detail-label">Order Date</span>
                                            <span className="detail-value">{new Date(selectedOrder.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Status</span>
                                            <span className={`status-badge ${selectedOrder.status}`}>{selectedOrder.status}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Total Amount</span>
                                            <span className="detail-value total">${selectedOrder.total.toFixed(2)}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Items Ordered</span>
                                            <div className="items-list">
                                                {selectedOrder.items.map((item, idx) => (
                                                    <span key={idx} className="item-badge">{item}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Add Customer Form */}
                                    <h4 className="section-title">Customer Information</h4>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" placeholder="Enter name" value={formData.name || ""} onChange={(e) => handleInputChange("name", e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" placeholder="Enter email" value={formData.email || ""} onChange={(e) => handleInputChange("email", e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" placeholder="Enter phone" value={formData.phone || ""} onChange={(e) => handleInputChange("phone", e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select value={formData.status || "active"} onChange={(e) => handleInputChange("status", e.target.value)}>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Address</label>
                                            <input type="text" placeholder="Enter address" value={formData.address || ""} onChange={(e) => handleInputChange("address", e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>City</label>
                                            <input type="text" placeholder="Enter city" value={formData.city || ""} onChange={(e) => handleInputChange("city", e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Country</label>
                                            <input type="text" placeholder="Enter country" value={formData.country || ""} onChange={(e) => handleInputChange("country", e.target.value)} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="modal-footer">
                            {modalType === "view" && !selectedOrder && (
                                <>
                                    {editMode ? (
                                        <>
                                            <button className="save-btn" onClick={handleSaveCustomer}>Save Changes</button>
                                            <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="edit-action-btn" onClick={() => setEditMode(true)}>Edit Customer</button>
                                            <button className="delete-btn" onClick={() => handleDeleteCustomer(selectedCustomer!.id)}>Delete Customer</button>
                                        </>
                                    )}
                                </>
                            )}
                            {modalType === "add" && (
                                <button className="save-btn" onClick={handleSaveCustomer}>Add Customer</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}