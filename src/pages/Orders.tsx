// import { useState, useEffect } from "react";
// import "../styles/Orders.css";

// type ProductItem = {
//     name: string;
//     price: number;
//     quantity: number;
// };

// type Order = {
//     id: string;
//     customer: {
//         name: string;
//         email: string;
//         phone: string;
//         address: string;
//     };
//     products: ProductItem[];
//     discount: number;
//     delivery: "Standard" | "Express" | "Pickup";
//     total: number;
//     status: "pending" | "shipped" | "delivered" | "cancelled";
//     date: string;
//     viewed: boolean;
// };

// export default function Orders() {

//     const [orders, setOrders] = useState<Order[]>([]);
//     const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//     const [currentPage, setCurrentPage] = useState(1);

//     const ordersPerPage = 5;

//     const totalPages = Math.ceil(orders.length / ordersPerPage);
//     const indexOfLast = currentPage * ordersPerPage;
//     const indexOfFirst = indexOfLast - ordersPerPage;
//     const currentOrders = orders.slice(indexOfFirst, indexOfLast);

//     // =========================
//     // FETCH ORDERS
//     // =========================
//     useEffect(() => {
//         fetch("http://localhost:5000/api/orders")
//             .then(res => res.json())
//             .then(data => {
//                 const formatted: Order[] = data.map((o: any) => ({
//                     id: o.id?.toString() || "",
//                     customer: {
//                         name: o.name || "",
//                         email: "",
//                         phone: o.phone || "",
//                         address: `${o.address || ""}, ${o.city || ""}`
//                     },
//                     products: Array.isArray(o.products) ? o.products : [],
//                     discount: 0,
//                     delivery: "Standard",
//                     total: Number(o.total || 0),
//                     status: (o.status?.toLowerCase() || "pending"),
//                     date: o.created_at || "",
//                     viewed: false
//                 }));

//                 setOrders(formatted);
//             })
//             .catch(err => console.log(err));
//     }, []);

//     // =========================
//     // VIEW ORDER (FIXED)
//     // =========================
//     const handleViewOrder = (order: Order) => {
//         fetch("http://localhost:5000/api/orders")
//             .then(res => res.json())
//             .then(data => {
//                 const found = data.find((o: any) => o.id == order.id);

//                 if (found) {
//                     const formatted: Order = {
//                         id: found.id?.toString() || "",
//                         customer: {
//                             name: found.name || "",
//                             email: "",
//                             phone: found.phone || "",
//                             address: `${found.address || ""}, ${found.city || ""}`
//                         },
//                         products: Array.isArray(found.products) ? found.products : [],
//                         discount: 0,
//                         delivery: "Standard",
//                         total: Number(found.total || 0),
//                         status: (found.status?.toLowerCase() || "pending"),
//                         date: found.created_at || "",
//                         viewed: true
//                     };

//                     setSelectedOrder(formatted);
//                 }
//             });

//         setOrders(prev =>
//             prev.map(o =>
//                 o.id === order.id ? { ...o, viewed: true } : o
//             )
//         );
//     };

//     const handleOrderChange = (field: string, value: any) => {
//         if (!selectedOrder) return;
//         setSelectedOrder({ ...selectedOrder, [field]: value });
//     };

//     const handleCustomerChange = (field: string, value: string) => {
//         if (!selectedOrder) return;
//         setSelectedOrder({
//             ...selectedOrder,
//             customer: { ...selectedOrder.customer, [field]: value }
//         });
//     };

//     const handleProductChange = (
//         index: number,
//         field: keyof ProductItem,
//         value: number | string
//     ) => {
//         if (!selectedOrder) return;

//         const updatedProducts = [...selectedOrder.products];
//         updatedProducts[index] = {
//             ...updatedProducts[index],
//             [field]: value
//         };

//         setSelectedOrder({
//             ...selectedOrder,
//             products: updatedProducts
//         });

//         updateTotal(updatedProducts, selectedOrder.discount);
//     };

//     const updateTotal = (products: ProductItem[], discount: number) => {
//         const total =
//             products.reduce((sum, p) => sum + p.price * p.quantity, 0) - discount;

//         if (selectedOrder) {
//             setSelectedOrder({ ...selectedOrder, total });
//         }
//     };

//     const handleDiscountChange = (value: number) => {
//         if (!selectedOrder) return;

//         setSelectedOrder({ ...selectedOrder, discount: value });
//         updateTotal(selectedOrder.products, value);
//     };

//     const handleSaveOrder = () => {
//         if (!selectedOrder) return;

//         setOrders(prev =>
//             prev.map(o => (o.id === selectedOrder.id ? selectedOrder : o))
//         );

//         setSelectedOrder(null);
//     };

//     const handleDeleteOrder = (orderId: string) => {
//         if (window.confirm("Are you sure you want to delete this order?")) {
//             setOrders(prev => prev.filter(o => o.id !== orderId));
//             setSelectedOrder(null);
//         }
//     };

//     return (
//         <div className="orders-page">

//             <div className="page-header">
//                 <h2>Orders</h2>
//                 <p>Manage your orders, update status, and view detailed information.</p>
//             </div>

//             <div className="card orders-card">
//                 <table className="orders-table">
//                     <thead>
//                         <tr>
//                             <th>Order ID</th>
//                             <th>Customer</th>
//                             <th>Products</th>
//                             <th>Total ($)</th>
//                             <th>Status</th>
//                             <th>Date</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {currentOrders.map(o => (
//                             <tr key={o.id} className={!o.viewed ? "new-order" : ""}>
//                                 <td>{o.id}</td>
//                                 <td>{o.customer.name}</td>
//                                 <td>{o.products?.map(p => p.name).join(", ") || "No Products"}</td>
//                                 <td>{Number(o.total || 0).toFixed(2)}</td>
//                                 <td>
//                                     <span className={`status ${o.status}`}>
//                                         {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
//                                     </span>
//                                 </td>
//                                 <td>{o.date}</td>
//                                 <td className="actions">
//                                     <button onClick={() => handleViewOrder(o)}>View</button>
//                                     <button onClick={() => handleDeleteOrder(o.id)} className="delete-btn">
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 <div className="pagination">
//                     <button
//                         disabled={currentPage === 1}
//                         onClick={() => setCurrentPage(currentPage - 1)}
//                     >
//                         Prev
//                     </button>

//                     <span>{currentPage} / {totalPages}</span>

//                     <button
//                         disabled={currentPage === totalPages}
//                         onClick={() => setCurrentPage(currentPage + 1)}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>

//             {/* MODAL */}
//             {selectedOrder && (
//                 <div className="order-modal">
//                     <div className="order-modal-content">

//                         <div className="modal-header">
//                             <h3>Order {selectedOrder.id}</h3>
//                             <button onClick={() => setSelectedOrder(null)}>×</button>
//                         </div>

//                         <div className="modal-body">

//                             <h4>Customer Info</h4>

//                             <input
//                                 value={selectedOrder.customer.name}
//                                 onChange={(e) =>
//                                     handleCustomerChange("name", e.target.value)
//                                 }
//                             />

//                             <input
//                                 value={selectedOrder.customer.email}
//                                 onChange={(e) =>
//                                     handleCustomerChange("email", e.target.value)
//                                 }
//                             />

//                             <input
//                                 value={selectedOrder.customer.phone}
//                                 onChange={(e) =>
//                                     handleCustomerChange("phone", e.target.value)
//                                 }
//                             />

//                             <textarea
//                                 value={selectedOrder.customer.address}
//                                 onChange={(e) =>
//                                     handleCustomerChange("address", e.target.value)
//                                 }
//                             />

//                             <h4>Products</h4>

//                             <table>
//                                 <tbody>
//                                     {selectedOrder.products.map((p, idx) => (
//                                         <tr key={idx}>
//                                             <td>{p.name}</td>
//                                             <td>
//                                                 <input
//                                                     type="number"
//                                                     value={p.price}
//                                                     onChange={(e) =>
//                                                         handleProductChange(idx, "price", Number(e.target.value))
//                                                     }
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="number"
//                                                     value={p.quantity}
//                                                     onChange={(e) =>
//                                                         handleProductChange(idx, "quantity", Number(e.target.value))
//                                                     }
//                                                 />
//                                             </td>
//                                             <td>{(p.price * p.quantity).toFixed(2)}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>

//                             <h4>Discount</h4>
//                             <input
//                                 type="number"
//                                 value={selectedOrder.discount}
//                                 onChange={(e) =>
//                                     handleDiscountChange(Number(e.target.value))
//                                 }
//                             />

//                             <h4>Total: {Number(selectedOrder.total || 0).toFixed(2)}</h4>

//                         </div>

//                         <div className="modal-footer">
//                             <button onClick={handleSaveOrder}>Save</button>
//                         </div>

//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// import React, { useState, useEffect, useCallback, useMemo } from 'react'
// import '../styles/Orders.css'
// import { orderService, type OrderStatus } from '../services/order.service';

// /* ─────────────────────────────────────
//    Types
// ───────────────────────────────────── */
// type ProductItem = {product_id:number; name: string; price: number; quantity: number }

// type Customer = { name: string; email: string; phone: string; address: string; city: string }

// type Order = {
//   id: string
//   customer: Customer
//   products: ProductItem[]
//   discount: number
//   delivery: 'Standard' | 'Express' | 'Pickup'
//   total: number
//   status: OrderStatus
//   date: string
//   viewed: boolean
// }

// /* ─────────────────────────────────────
//    Helpers
// ───────────────────────────────────── */
// function formatOrder(raw: any): Order {
//   return {
//     id: raw.id?.toString() ?? '',
//     customer: {
//       name:    raw.name ?? raw.customer?.name ?? '',
//       email:   raw.email ?? raw.customer?.email ?? '',
//       phone:   raw.phone ?? raw.customer?.phone ?? '',
//       address: raw.customer?.address ?? `${raw.address ?? ''}${raw.city ? ', ' + raw.city : ''}`,
//       city:    raw.customer?.city ?? raw.city ?? '',
//     },
//     products: Array.isArray(raw.products) ? raw.products : [],
//     discount: Number(raw.discount ?? 0),
//     delivery: raw.delivery ?? 'Standard',
//     total: Number(raw.total ?? 0),
//     status: (raw.status?.toLowerCase() as OrderStatus) ?? 'pending',
//     date: raw.created_at ?? raw.date ?? '',
//     viewed: Boolean(raw.viewed),
//   }
// }

// function calcLineTotal(products: ProductItem[]): number {
//   return products.reduce((sum, p) => sum + p.price * p.quantity, 0)
// }

// function formatDate(iso: string): string {
//   if (!iso) return '—'
//   const d = new Date(iso)
//   if (isNaN(d.getTime())) return iso
//   return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
// }

// const STATUS_FLOW: Record<OrderStatus, OrderStatus | null> = {
//   pending: 'confirmed',
//   confirmed: null,
//   cancelled: null,
// }

// /* ─────────────────────────────────────
//    Sub-components
// ───────────────────────────────────── */
// const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => (
//   <span className={`ord-badge ord-badge--${status}`}>
//     {status.charAt(0).toUpperCase() + status.slice(1)}
//   </span>
// )

// const EmptyState: React.FC<{ message: string }> = ({ message }) => (
//   <tr>
//     <td colSpan={7} className="ord-empty">
//       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//         <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
//       </svg>
//       <p>{message}</p>
//     </td>
//   </tr>
// )

// /* ─────────────────────────────────────
//    Main component
// ───────────────────────────────────── */
// export default function Orders() {
//   const [orders,         setOrders]        = useState<Order[]>([])
//   const [loading,        setLoading]       = useState(true)
//   const [selectedOrder,  setSelectedOrder] = useState<Order | null>(null)
//   const [editedOrder,    setEditedOrder]   = useState<Order | null>(null)
//   const [searchTerm,     setSearchTerm]    = useState('')
//   const [filterStatus,   setFilterStatus]  = useState<'all' | OrderStatus>('all')
//   const [currentPage,    setCurrentPage]   = useState(1)
//   const [saving,         setSaving]        = useState(false)
//   const [actionLoading,  setActionLoading] = useState<string | null>(null) // order id mid-action
//   const [toast,          setToast]         = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

//   const ordersPerPage = 8

//   /* ── Toast auto-dismiss ── */
//   useEffect(() => {
//     if (!toast) return
//     const t = setTimeout(() => setToast(null), 3500)
//     return () => clearTimeout(t)
//   }, [toast])

//   /* ── Load orders ── */
//   const loadOrders = useCallback(async () => {
//     setLoading(true)
//     try {
//       const data = await orderService.getOrders()
//       setOrders(data.map(formatOrder))
//     } catch (err) {
//       console.error(err)
//       setToast({ msg: 'Failed to load orders', type: 'error' })
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   useEffect(() => { loadOrders() }, [loadOrders])

//   /* ── Keyboard / scroll lock ── */
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedOrder(null) }
//     document.addEventListener('keydown', handler)
//     return () => document.removeEventListener('keydown', handler)
//   }, [])

//   useEffect(() => {
//     document.body.style.overflow = selectedOrder ? 'hidden' : ''
//     return () => { document.body.style.overflow = '' }
//   }, [selectedOrder])

//   /* ── Filtering + pagination ── */
//   const filtered = useMemo(() => orders.filter(o => {
//     const term = searchTerm.toLowerCase()
//     const matchSearch =
//       o.id.toLowerCase().includes(term) ||
//       o.customer.name.toLowerCase().includes(term) ||
//       o.customer.email.toLowerCase().includes(term)
//     const matchStatus = filterStatus === 'all' || o.status === filterStatus
//     return matchSearch && matchStatus
//   }), [orders, searchTerm, filterStatus])

//   const totalPages = Math.max(1, Math.ceil(filtered.length / ordersPerPage))
//   const pageOrders = filtered.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)

//   useEffect(() => { setCurrentPage(1) }, [searchTerm, filterStatus])

//   /* ── Stats ── */
//   const stats = useMemo(() => {
//     const pending   = orders.filter(o => o.status === 'pending').length
//     const confirmed = orders.filter(o => o.status === 'confirmed').length
//     const cancelled = orders.filter(o => o.status === 'cancelled').length
//     const revenue   = orders.filter(o => o.status === 'confirmed').reduce((s, o) => s + o.total, 0)
//     return { total: orders.length, pending, confirmed, cancelled, revenue }
//   }, [orders])

//   /* ── View order ── */
//   async function handleViewOrder(order: Order) {
//     setOrders(prev => prev.map(o => o.id === order.id ? { ...o, viewed: true } : o))
//     try {
//       const fresh = await orderService.getOrder(order.id)
//       const formatted = formatOrder(fresh)
//       setSelectedOrder(formatted)
//       setEditedOrder(formatted)
//     } catch (err) {
//       console.error(err)
//       // fall back to the row data we already have rather than blocking the admin
//       setSelectedOrder(order)
//       setEditedOrder(order)
//     }
//   }

//   function closeModal() {
//     setSelectedOrder(null)
//     setEditedOrder(null)
//   }

//   /* ── Edit handlers (local draft, saved explicitly) ── */
//   function handleCustomerChange(field: keyof Customer, value: string) {
//     if (!editedOrder) return
//     setEditedOrder({ ...editedOrder, customer: { ...editedOrder.customer, [field]: value } })
//   }

//   function handleProductChange(index: number, field: keyof ProductItem, value: number | string) {
//     if (!editedOrder) return
//     const products = [...editedOrder.products]
//     products[index] = { ...products[index], [field]: value }
//     const total = calcLineTotal(products) - editedOrder.discount
//     setEditedOrder({ ...editedOrder, products, total: Math.max(0, total) })
//   }

//   function handleDiscountChange(value: number) {
//     if (!editedOrder) return
//     const total = calcLineTotal(editedOrder.products) - value
//     setEditedOrder({ ...editedOrder, discount: value, total: Math.max(0, total) })
//   }

//   /* ── Save edits ── */
//   async function handleSaveOrder() {
//     if (!editedOrder) return
//     setSaving(true)
//     try {
//       await orderService.updateOrder(editedOrder.id, {
//         customer: editedOrder.customer,
//         products: editedOrder.products,
//         discount: editedOrder.discount,
//         delivery: editedOrder.delivery,
//       })
//       setOrders(prev => prev.map(o => o.id === editedOrder.id ? editedOrder : o))
//       setToast({ msg: 'Order updated', type: 'success' })
//       closeModal()
//     } catch (err) {
//       console.error(err)
//       setToast({ msg: 'Failed to save order', type: 'error' })
//     } finally {
//       setSaving(false)
//     }
//   }

//   /* ── Status transitions ──
//      Backend owns the stock side-effects:
//      - confirm  → deducts stock per line item (atomic; rejects w/ 409 if insufficient)
//      - cancel   → if was confirmed, restores stock that had been deducted */
//   async function handleConfirmOrder(order: Order) {
//     if (!window.confirm(`Confirm order ${order.id}? This will deduct stock for all items.`)) return
//     setActionLoading(order.id)
//     try {
//       await orderService.updateStatus(order.id, 'confirmed')
//       setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'confirmed' } : o))
//       setSelectedOrder(prev => prev && prev.id === order.id ? { ...prev, status: 'confirmed' } : prev)
//       setToast({ msg: `Order ${order.id} confirmed — stock updated`, type: 'success' })
//     } catch (err: any) {
//       console.error(err)
//       const msg = err?.response?.status === 409
//         ? (err?.response?.data?.message ?? 'Insufficient stock for one or more items')
//         : 'Failed to confirm order'
//       setToast({ msg, type: 'error' })
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   async function handleCancelOrder(order: Order) {
//     const wasConfirmed = order.status === 'confirmed'
//     const warning = wasConfirmed
//       ? `Cancel order ${order.id}? Stock that was deducted will be restored.`
//       : `Cancel order ${order.id}?`
//     if (!window.confirm(warning)) return
//     setActionLoading(order.id)
//     try {
//       await orderService.updateStatus(order.id, 'cancelled')
//       setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'cancelled' } : o))
//       setSelectedOrder(prev => prev && prev.id === order.id ? { ...prev, status: 'cancelled' } : prev)
//       setToast({ msg: wasConfirmed ? `Order cancelled — stock restored` : 'Order cancelled', type: 'success' })
//     } catch (err) {
//       console.error(err)
//       setToast({ msg: 'Failed to cancel order', type: 'error' })
//     } finally {
//       setActionLoading(null)
//     }
//   }

//   async function handleDeleteOrder(id: string) {
//     if (!window.confirm('Delete this order permanently? This cannot be undone.')) return
//     try {
//       await orderService.deleteOrder(id)
//       setOrders(prev => prev.filter(o => o.id !== id))
//       setToast({ msg: 'Order deleted', type: 'success' })
//       if (selectedOrder?.id === id) closeModal()
//     } catch (err) {
//       console.error(err)
//       setToast({ msg: 'Failed to delete order', type: 'error' })
//     }
//   }

//   /* ─────────────────────────────────────
//      Render
//   ───────────────────────────────────── */
//   return (
//     <div className="ord-page">

//       {/* ── Toast ── */}
//       {toast && (
//         <div className={`ord-toast ord-toast--${toast.type}`} role="alert">
//           {toast.type === 'success'
//             ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
//             : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
//           }
//           {toast.msg}
//         </div>
//       )}

//       {/* ── Header ── */}
//       <div className="ord-header">
//         <div className="ord-header-text">
//           <h2>Orders</h2>
//           <p>Review incoming orders, confirm to deduct stock, and track fulfilment</p>
//         </div>
//       </div>

//       {/* ── Stats ── */}
//       <div className="ord-stats">
//         <div className="ord-stat">
//           <span className="ord-stat-val">{loading ? '—' : stats.total}</span>
//           <span className="ord-stat-lbl">Total Orders</span>
//         </div>
//         <div className="ord-stat-divider" />
//         <div className="ord-stat">
//           <span className="ord-stat-val ord-stat-val--amber">{loading ? '—' : stats.pending}</span>
//           <span className="ord-stat-lbl">Awaiting Review</span>
//         </div>
//         <div className="ord-stat-divider" />
//         <div className="ord-stat">
//           <span className="ord-stat-val ord-stat-val--teal">{loading ? '—' : stats.confirmed}</span>
//           <span className="ord-stat-lbl">Confirmed</span>
//         </div>
//         <div className="ord-stat-divider" />
//         <div className="ord-stat">
//           <span className="ord-stat-val ord-stat-val--red">{loading ? '—' : stats.cancelled}</span>
//           <span className="ord-stat-lbl">Cancelled</span>
//         </div>
//         <div className="ord-stat-divider" />
//         <div className="ord-stat">
//           <span className="ord-stat-val ord-stat-val--teal">{loading ? '—' : `$${stats.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}</span>
//           <span className="ord-stat-lbl">Confirmed Revenue</span>
//         </div>
//       </div>

//       {/* ── Filters ── */}
//       <div className="ord-filters">
//         <div className="ord-search">
//           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
//           <input
//             type="search"
//             placeholder="Search by order ID, customer name, or email…"
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             aria-label="Search orders"
//           />
//         </div>
//         <select className="ord-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value as typeof filterStatus)} aria-label="Filter by status">
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//       {/* ── Table card ── */}
//       <div className="ord-card">
//         <div className="ord-table-wrap">
//           <table className="ord-table">
//             <thead>
//               <tr>
//                 <th>Order</th>
//                 <th>Customer</th>
//                 <th>Items</th>
//                 <th>Total</th>
//                 <th>Status</th>
//                 <th>Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading
//                 ? Array.from({ length: 6 }).map((_, i) => (
//                     <tr key={i}>
//                       {Array.from({ length: 7 }).map((_, j) => (
//                         <td key={j}><div className="ord-shimmer" style={{ height: 16, borderRadius: 6 }} /></td>
//                       ))}
//                     </tr>
//                   ))
//                 : pageOrders.length === 0
//                   ? <EmptyState message={searchTerm || filterStatus !== 'all' ? 'No orders match your filters' : 'No orders yet — new orders from your store will appear here'} />
//                   : pageOrders.map(o => (
//                       <tr key={o.id} className={!o.viewed ? 'ord-row--new' : ''}>
//                         <td>
//                           <span className="ord-id">#{o.id}</span>
//                           {!o.viewed && <span className="ord-new-dot" title="New order" />}
//                         </td>
//                         <td>
//                           <div className="ord-customer">
//                             <span className="ord-customer-name">{o.customer.name || 'Unknown'}</span>
//                             {o.customer.email && <span className="ord-customer-email">{o.customer.email}</span>}
//                           </div>
//                         </td>
//                         <td>
//                           <span className="ord-items" title={o.products.map(p => p.name).join(', ')}>
//                             {o.products.length === 0
//                               ? 'No products'
//                               : o.products.length === 1
//                                 ? o.products[0].name
//                                 : `${o.products[0].name} +${o.products.length - 1} more`
//                             }
//                           </span>
//                         </td>
//                         <td><span className="ord-total">${o.total.toFixed(2)}</span></td>
//                         <td><StatusBadge status={o.status} /></td>
//                         <td><span className="ord-date">{formatDate(o.date)}</span></td>
//                         <td>
//                           <div className="ord-actions">
//                             <button className="ord-action-btn ord-action-btn--view" onClick={() => handleViewOrder(o)}>
//                               View
//                             </button>
//                             {o.status === 'pending' && (
//                               <button
//                                 className="ord-action-btn ord-action-btn--confirm"
//                                 onClick={() => handleConfirmOrder(o)}
//                                 disabled={actionLoading === o.id}
//                               >
//                                 {actionLoading === o.id ? <span className="ord-spinner" /> : 'Confirm'}
//                               </button>
//                             )}
//                             {o.status !== 'cancelled' && (
//                               <button
//                                 className="ord-action-btn ord-action-btn--cancel"
//                                 onClick={() => handleCancelOrder(o)}
//                                 disabled={actionLoading === o.id}
//                               >
//                                 Cancel
//                               </button>
//                             )}
//                             <button className="ord-action-btn ord-action-btn--delete" onClick={() => handleDeleteOrder(o.id)} aria-label="Delete order">
//                               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//               }
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {!loading && filtered.length > 0 && (
//           <div className="ord-pagination">
//             <span className="ord-page-info">
//               Showing {(currentPage - 1) * ordersPerPage + 1}–{Math.min(currentPage * ordersPerPage, filtered.length)} of {filtered.length}
//             </span>
//             <div className="ord-page-controls">
//               <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
//               <span className="ord-page-num">{currentPage} / {totalPages}</span>
//               <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ──────────── MODAL ──────────── */}
//       {selectedOrder && editedOrder && (
//         <div className="ord-modal-overlay" role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
//           <div className="ord-modal">

//             {/* Header */}
//             <div className="ord-modal-header">
//               <div className="ord-modal-title-wrap">
//                 <h3>Order #{selectedOrder.id}</h3>
//                 <StatusBadge status={editedOrder.status} />
//               </div>
//               <button className="ord-close-btn" onClick={closeModal} aria-label="Close">
//                 <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
//               </button>
//             </div>

//             {/* Status action bar */}
//             <div className="ord-status-bar">
//               <span className="ord-status-bar-label">Order status:</span>
//               <div className="ord-status-bar-actions">
//                 {editedOrder.status === 'pending' && (
//                   <button
//                     className="ord-btn ord-btn--primary"
//                     onClick={() => handleConfirmOrder(editedOrder)}
//                     disabled={actionLoading === editedOrder.id}
//                   >
//                     {actionLoading === editedOrder.id ? <><span className="ord-spinner" />Confirming…</> : 'Confirm Order'}
//                   </button>
//                 )}
//                 {editedOrder.status !== 'cancelled' && (
//                   <button
//                     className="ord-btn ord-btn--danger"
//                     onClick={() => handleCancelOrder(editedOrder)}
//                     disabled={actionLoading === editedOrder.id}
//                   >
//                     Cancel Order
//                   </button>
//                 )}
//                 {editedOrder.status === 'cancelled' && (
//                   <span className="ord-status-note">This order has been cancelled</span>
//                 )}
//               </div>
//             </div>

//             {/* Body */}
//             <div className="ord-modal-body">

//               {/* Customer info */}
//               <div className="ord-section">
//                 <div className="ord-section-title"><span className="ord-section-bar" />Customer Information</div>
//                 <div className="ord-form-grid">
//                   <div className="ord-field">
//                     <label>Full Name</label>
//                     <input value={editedOrder.customer.name} onChange={e => handleCustomerChange('name', e.target.value)} />
//                   </div>
//                   <div className="ord-field">
//                     <label>Email</label>
//                     <input type="email" value={editedOrder.customer.email} onChange={e => handleCustomerChange('email', e.target.value)} />
//                   </div>
//                   <div className="ord-field">
//                     <label>Phone</label>
//                     <input value={editedOrder.customer.phone} onChange={e => handleCustomerChange('phone', e.target.value)} />
//                   </div>
//                   <div className="ord-field">
//                     <label>Delivery Method</label>
//                     <select className="ord-select" value={editedOrder.delivery} onChange={e => setEditedOrder({ ...editedOrder, delivery: e.target.value as Order['delivery'] })}>
//                       <option value="Standard">Standard</option>
//                       <option value="Express">Express</option>
//                       <option value="Pickup">Pickup</option>
//                     </select>
//                   </div>
//                   <div className="ord-field ord-field--full">
//                     <label>Shipping Address</label>
//                     <textarea rows={2} value={editedOrder.customer.address} onChange={e => handleCustomerChange('address', e.target.value)} />
//                   </div>
//                 </div>
//               </div>

//               {/* Products */}
//               <div className="ord-section">
//                 <div className="ord-section-title"><span className="ord-section-bar" />Order Items</div>
//                 <div className="ord-items-wrap">
//                   <table className="ord-items-table">
//                     <thead>
//                       <tr>
//                         <th>Product</th>
//                         <th>Price</th>
//                         <th>Qty</th>
//                         <th>Subtotal</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {editedOrder.products.length === 0
//                         ? <tr><td colSpan={4} className="ord-no-items">No products on this order</td></tr>
//                         : editedOrder.products.map((p, idx) => (
//                             <tr key={idx}>
//                               <td className="ord-item-name">{p.name}</td>
//                               <td>
//                                 <input
//                                   type="number" min="0" step="0.01" className="ord-mini-input"
//                                   value={p.price}
//                                   onChange={e => handleProductChange(idx, 'price', Number(e.target.value))}
//                                 />
//                               </td>
//                               <td>
//                                 <input
//                                   type="number" min="1" className="ord-mini-input ord-mini-input--qty"
//                                   value={p.quantity}
//                                   onChange={e => handleProductChange(idx, 'quantity', Number(e.target.value))}
//                                 />
//                               </td>
//                               <td className="ord-item-sub">${(p.price * p.quantity).toFixed(2)}</td>
//                             </tr>
//                           ))
//                       }
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Totals */}
//               <div className="ord-totals">
//                 <div className="ord-totals-row">
//                   <span>Subtotal</span>
//                   <span>${calcLineTotal(editedOrder.products).toFixed(2)}</span>
//                 </div>
//                 <div className="ord-totals-row">
//                   <span>Discount</span>
//                   <input
//                     type="number" min="0" step="0.01" className="ord-mini-input"
//                     value={editedOrder.discount}
//                     onChange={e => handleDiscountChange(Number(e.target.value))}
//                   />
//                 </div>
//                 <div className="ord-totals-row ord-totals-row--final">
//                   <span>Total</span>
//                   <span>${editedOrder.total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="ord-modal-footer">
//               <button className="ord-btn ord-btn--ghost" onClick={closeModal}>Close</button>
//               <button className="ord-btn ord-btn--primary" onClick={handleSaveOrder} disabled={saving}>
//                 {saving ? <><span className="ord-spinner" />Saving…</> : 'Save Changes'}
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import '../styles/Orders.css'
import { orderService, type OrderStatus } from '../services/order.service';

/* ─────────────────────────────────────
   Types
───────────────────────────────────── */
type ProductItem = {product_id:number; name: string; price: number; quantity: number }

type Customer = { name: string; email: string; phone: string; address: string; city: string }

type Order = {
  id: string
  customer: Customer
  products: ProductItem[]
  discount: number
  delivery: 'Standard' | 'Express' | 'Pickup'
  total: number
  status: OrderStatus
  date: string
  viewed: boolean
}

/* ─────────────────────────────────────
   Helpers
───────────────────────────────────── */
function formatOrder(raw: any): Order {
  return {
    id: raw.id?.toString() ?? '',
    customer: {
      name:    raw.name ?? raw.customer?.name ?? '',
      email:   raw.email ?? raw.customer?.email ?? '',
      phone:   raw.phone ?? raw.customer?.phone ?? '',
      address: raw.customer?.address ?? `${raw.address ?? ''}${raw.city ? ', ' + raw.city : ''}`,
      city:    raw.customer?.city ?? raw.city ?? '',
    },
    products: Array.isArray(raw.products) ? raw.products : [],
    discount: Number(raw.discount ?? 0),
    delivery: raw.delivery ?? 'Standard',
    total: Number(raw.total ?? 0),
    status: (raw.status?.toLowerCase() as OrderStatus) ?? 'pending',
    date: raw.created_at ?? raw.date ?? '',
    viewed: Boolean(raw.viewed),
  }
}

function calcLineTotal(products: ProductItem[]): number {
  return products.reduce((sum, p) => sum + p.price * p.quantity, 0)
}

function formatDate(iso: string): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}

const STATUS_FLOW: Record<OrderStatus, OrderStatus | null> = {
  pending: 'confirmed',
  confirmed: null,
  cancelled: null,
}

/* ─────────────────────────────────────
   Sub-components
───────────────────────────────────── */
const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => (
  <span className={`ord-badge ord-badge--${status}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
)

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <tr>
    <td colSpan={7} className="ord-empty">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <p>{message}</p>
    </td>
  </tr>
)

/* ─────────────────────────────────────
   Main component
───────────────────────────────────── */
export default function Orders() {
  const [orders,         setOrders]        = useState<Order[]>([])
  const [loading,        setLoading]       = useState(true)
  const [selectedOrder,  setSelectedOrder] = useState<Order | null>(null)
  const [editedOrder,    setEditedOrder]   = useState<Order | null>(null)
  const [searchTerm,     setSearchTerm]    = useState('')
  const [filterStatus,   setFilterStatus]  = useState<'all' | OrderStatus>('all')
  const [currentPage,    setCurrentPage]   = useState(1)
  const [saving,         setSaving]        = useState(false)
  const [actionLoading,  setActionLoading] = useState<string | null>(null) // order id mid-action
  const [toast,          setToast]         = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const ordersPerPage = 8

  /* ── Toast auto-dismiss ── */
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(t)
  }, [toast])

  /* ── Load orders ── */
  const loadOrders = useCallback(async () => {
    setLoading(true)
    try {
      const data = await orderService.getOrders()
      setOrders(data.map(formatOrder))
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to load orders', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadOrders() }, [loadOrders])

  /* ── Keyboard / scroll lock ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedOrder(null) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedOrder ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedOrder])

  /* ── Filtering + pagination ── */
  const filtered = useMemo(() => orders.filter(o => {
    const term = searchTerm.toLowerCase()
    const matchSearch =
      o.id.toLowerCase().includes(term) ||
      o.customer.name.toLowerCase().includes(term) ||
      o.customer.email.toLowerCase().includes(term)
    const matchStatus = filterStatus === 'all' || o.status === filterStatus
    return matchSearch && matchStatus
  }), [orders, searchTerm, filterStatus])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ordersPerPage))
  const pageOrders = filtered.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)

  useEffect(() => { setCurrentPage(1) }, [searchTerm, filterStatus])

  /* ── Stats ── */
  const stats = useMemo(() => {
    const pending   = orders.filter(o => o.status === 'pending').length
    const confirmed = orders.filter(o => o.status === 'confirmed').length
    const cancelled = orders.filter(o => o.status === 'cancelled').length
    const revenue   = orders.filter(o => o.status === 'confirmed').reduce((s, o) => s + o.total, 0)
    return { total: orders.length, pending, confirmed, cancelled, revenue }
  }, [orders])

  /* ── View order ── */
  async function handleViewOrder(order: Order) {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, viewed: true } : o))
    try {
      const fresh = await orderService.getOrder(order.id)
      const formatted = formatOrder(fresh)
      setSelectedOrder(formatted)
      setEditedOrder(formatted)
    } catch (err) {
      console.error(err)
      // fall back to the row data we already have rather than blocking the admin
      setSelectedOrder(order)
      setEditedOrder(order)
    }
  }

  function closeModal() {
    setSelectedOrder(null)
    setEditedOrder(null)
  }

  /* ── Edit handlers (local draft, saved explicitly) ── */
  function handleCustomerChange(field: keyof Customer, value: string) {
    if (!editedOrder) return
    setEditedOrder({ ...editedOrder, customer: { ...editedOrder.customer, [field]: value } })
  }

  function handleProductChange(index: number, field: keyof ProductItem, value: number | string) {
    if (!editedOrder) return
    const products = [...editedOrder.products]
    products[index] = { ...products[index], [field]: value }
    const total = calcLineTotal(products) - editedOrder.discount
    setEditedOrder({ ...editedOrder, products, total: Math.max(0, total) })
  }

  function handleDiscountChange(value: number) {
    if (!editedOrder) return
    const total = calcLineTotal(editedOrder.products) - value
    setEditedOrder({ ...editedOrder, discount: value, total: Math.max(0, total) })
  }

  /* ── Save edits ── */
  async function handleSaveOrder() {
    if (!editedOrder) return
    setSaving(true)
    try {
      await orderService.updateOrder(editedOrder.id, {
        customer: editedOrder.customer,
        products: editedOrder.products,
        discount: editedOrder.discount,
        delivery: editedOrder.delivery,
      })
      setOrders(prev => prev.map(o => o.id === editedOrder.id ? editedOrder : o))
      setToast({ msg: 'Order updated', type: 'success' })
      closeModal()
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to save order', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  /* ── Status transitions ──
     Backend owns the stock side-effects:
     - confirm  → deducts stock per line item (atomic; rejects w/ 409 if insufficient)
     - cancel   → if was confirmed, restores stock that had been deducted */
  async function handleConfirmOrder(order: Order) {
    if (!window.confirm(`Confirm order ${order.id}? This will deduct stock for all items.`)) return
    setActionLoading(order.id)
    try {
      await orderService.updateStatus(order.id, 'confirmed')
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'confirmed' } : o))
      setSelectedOrder(prev => prev && prev.id === order.id ? { ...prev, status: 'confirmed' } : prev)
      setToast({ msg: `Order ${order.id} confirmed — stock updated`, type: 'success' })
    } catch (err: any) {
      console.error(err)
      const msg = err?.response?.status === 409
        ? (err?.response?.data?.message ?? 'Insufficient stock for one or more items')
        : 'Failed to confirm order'
      setToast({ msg, type: 'error' })
    } finally {
      setActionLoading(null)
    }
  }

  async function handleCancelOrder(order: Order) {
    const wasConfirmed = order.status === 'confirmed'
    const warning = wasConfirmed
      ? `Cancel order ${order.id}? Stock that was deducted will be restored.`
      : `Cancel order ${order.id}?`
    if (!window.confirm(warning)) return
    setActionLoading(order.id)
    try {
      await orderService.updateStatus(order.id, 'cancelled')
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'cancelled' } : o))
      setSelectedOrder(prev => prev && prev.id === order.id ? { ...prev, status: 'cancelled' } : prev)
      setToast({ msg: wasConfirmed ? `Order cancelled — stock restored` : 'Order cancelled', type: 'success' })
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to cancel order', type: 'error' })
    } finally {
      setActionLoading(null)
    }
  }

  async function handleDeleteOrder(id: string) {
    if (!window.confirm('Delete this order permanently? This cannot be undone.')) return
    try {
      await orderService.deleteOrder(id)
      setOrders(prev => prev.filter(o => o.id !== id))
      setToast({ msg: 'Order deleted', type: 'success' })
      if (selectedOrder?.id === id) closeModal()
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to delete order', type: 'error' })
    }
  }

  /* ─────────────────────────────────────
     Render
  ───────────────────────────────────── */
  return (
    <div className="ord-page">

      {/* ── Toast ── */}
      {toast && (
        <div className={`ord-toast ord-toast--${toast.type}`} role="alert">
          {toast.type === 'success'
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          }
          {toast.msg}
        </div>
      )}

      {/* ── Header ── */}
      <div className="ord-header">
        <div className="ord-header-text">
          <h2>Orders</h2>
          <p>Review incoming orders, confirm to deduct stock, and track fulfilment</p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="ord-stats">
        <div className="ord-stat">
          <span className="ord-stat-val">{loading ? '—' : stats.total}</span>
          <span className="ord-stat-lbl">Total Orders</span>
        </div>
        <div className="ord-stat-divider" />
        <div className="ord-stat">
          <span className="ord-stat-val ord-stat-val--amber">{loading ? '—' : stats.pending}</span>
          <span className="ord-stat-lbl">Awaiting Review</span>
        </div>
        <div className="ord-stat-divider" />
        <div className="ord-stat">
          <span className="ord-stat-val ord-stat-val--teal">{loading ? '—' : stats.confirmed}</span>
          <span className="ord-stat-lbl">Confirmed</span>
        </div>
        <div className="ord-stat-divider" />
        <div className="ord-stat">
          <span className="ord-stat-val ord-stat-val--red">{loading ? '—' : stats.cancelled}</span>
          <span className="ord-stat-lbl">Cancelled</span>
        </div>
        <div className="ord-stat-divider" />
        <div className="ord-stat">
          <span className="ord-stat-val ord-stat-val--teal">{loading ? '—' : `$${stats.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}</span>
          <span className="ord-stat-lbl">Confirmed Revenue</span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="ord-filters">
        <div className="ord-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input
            type="search"
            placeholder="Search by order ID, customer name, or email…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search orders"
          />
        </div>
        <select className="ord-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value as typeof filterStatus)} aria-label="Filter by status">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* ── Table card ── */}
      <div className="ord-card">
        <div className="ord-table-wrap">
          <table className="ord-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j}><div className="ord-shimmer" style={{ height: 16, borderRadius: 6 }} /></td>
                      ))}
                    </tr>
                  ))
                : pageOrders.length === 0
                  ? <EmptyState message={searchTerm || filterStatus !== 'all' ? 'No orders match your filters' : 'No orders yet — new orders from your store will appear here'} />
                  : pageOrders.map(o => (
                      <tr key={o.id} className={!o.viewed ? 'ord-row--new' : ''}>
                        <td>
                          <span className="ord-id">#{o.id}</span>
                          {!o.viewed && <span className="ord-new-dot" title="New order" />}
                        </td>
                        <td>
                          <div className="ord-customer">
                            <span className="ord-customer-name">{o.customer.name || 'Unknown'}</span>
                            {o.customer.email && <span className="ord-customer-email">{o.customer.email}</span>}
                          </div>
                        </td>
                        <td>
                          <span className="ord-items" title={o.products.map(p => p.name).join(', ')}>
                            {o.products.length === 0
                              ? 'No products'
                              : o.products.length === 1
                                ? o.products[0].name
                                : `${o.products[0].name} +${o.products.length - 1} more`
                            }
                          </span>
                        </td>
                        <td><span className="ord-total">${o.total.toFixed(2)}</span></td>
                        <td><StatusBadge status={o.status} /></td>
                        <td><span className="ord-date">{formatDate(o.date)}</span></td>
                        <td>
                          <div className="ord-actions">
                            <button className="ord-action-btn ord-action-btn--view" onClick={() => handleViewOrder(o)}>
                              View
                            </button>
                            {o.status === 'pending' && (
                              <button
                                className="ord-action-btn ord-action-btn--confirm"
                                onClick={() => handleConfirmOrder(o)}
                                disabled={actionLoading === o.id}
                              >
                                {actionLoading === o.id ? <span className="ord-spinner" /> : 'Confirm'}
                              </button>
                            )}
                            {o.status !== 'cancelled' && (
                              <button
                                className="ord-action-btn ord-action-btn--cancel"
                                onClick={() => handleCancelOrder(o)}
                                disabled={actionLoading === o.id}
                              >
                                Cancel
                              </button>
                            )}
                            <button className="ord-action-btn ord-action-btn--delete" onClick={() => handleDeleteOrder(o.id)} aria-label="Delete order">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
              }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && filtered.length > 0 && (
          <div className="ord-pagination">
            <span className="ord-page-info">
              Showing {(currentPage - 1) * ordersPerPage + 1}–{Math.min(currentPage * ordersPerPage, filtered.length)} of {filtered.length}
            </span>
            <div className="ord-page-controls">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
              <span className="ord-page-num">{currentPage} / {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
            </div>
          </div>
        )}
      </div>

      {/* ──────────── MODAL ──────────── */}
      {selectedOrder && editedOrder && (
        <div className="ord-modal-overlay" role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="ord-modal">

            {/* Header */}
            <div className="ord-modal-header">
              <div className="ord-modal-title-wrap">
                <h3>Order #{selectedOrder.id}</h3>
                <StatusBadge status={editedOrder.status} />
              </div>
              <button className="ord-close-btn" onClick={closeModal} aria-label="Close">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Status action bar */}
            <div className="ord-status-bar">
              <span className="ord-status-bar-label">Order status:</span>
              <div className="ord-status-bar-actions">
                {editedOrder.status === 'pending' && (
                  <button
                    className="ord-btn ord-btn--primary"
                    onClick={() => handleConfirmOrder(editedOrder)}
                    disabled={actionLoading === editedOrder.id}
                  >
                    {actionLoading === editedOrder.id ? <><span className="ord-spinner" />Confirming…</> : 'Confirm Order'}
                  </button>
                )}
                {editedOrder.status !== 'cancelled' && (
                  <button
                    className="ord-btn ord-btn--danger"
                    onClick={() => handleCancelOrder(editedOrder)}
                    disabled={actionLoading === editedOrder.id}
                  >
                    Cancel Order
                  </button>
                )}
                {editedOrder.status === 'cancelled' && (
                  <span className="ord-status-note">This order has been cancelled</span>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="ord-modal-body">

              {/* Customer info */}
              <div className="ord-section">
                <div className="ord-section-title"><span className="ord-section-bar" />Customer Information</div>
                <div className="ord-form-grid">
                  <div className="ord-field">
                    <label>Full Name</label>
                    <input value={editedOrder.customer.name} onChange={e => handleCustomerChange('name', e.target.value)} />
                  </div>
                  <div className="ord-field">
                    <label>Email</label>
                    <input type="email" value={editedOrder.customer.email} onChange={e => handleCustomerChange('email', e.target.value)} />
                  </div>
                  <div className="ord-field">
                    <label>Phone</label>
                    <input value={editedOrder.customer.phone} onChange={e => handleCustomerChange('phone', e.target.value)} />
                  </div>
                  <div className="ord-field">
                    <label>Delivery Method</label>
                    <select className="ord-select" value={editedOrder.delivery} onChange={e => setEditedOrder({ ...editedOrder, delivery: e.target.value as Order['delivery'] })}>
                      <option value="Standard">Standard</option>
                      <option value="Express">Express</option>
                      <option value="Pickup">Pickup</option>
                    </select>
                  </div>
                  <div className="ord-field ord-field--full">
                    <label>Shipping Address</label>
                    <textarea rows={2} value={editedOrder.customer.address} onChange={e => handleCustomerChange('address', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Products */}
              <div className="ord-section">
                <div className="ord-section-title"><span className="ord-section-bar" />Order Items</div>
                <div className="ord-items-wrap">
                  <table className="ord-items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editedOrder.products.length === 0
                        ? <tr><td colSpan={4} className="ord-no-items">No products on this order</td></tr>
                        : editedOrder.products.map((p, idx) => (
                            <tr key={idx}>
                              <td className="ord-item-name">{p.name}</td>
                              <td>
                                <input
                                  type="number" min="0" step="0.01" className="ord-mini-input"
                                  value={p.price}
                                  onChange={e => handleProductChange(idx, 'price', Number(e.target.value))}
                                />
                              </td>
                              <td>
                                <input
                                  type="number" min="1" className="ord-mini-input ord-mini-input--qty"
                                  value={p.quantity}
                                  onChange={e => handleProductChange(idx, 'quantity', Number(e.target.value))}
                                />
                              </td>
                              <td className="ord-item-sub">${(p.price * p.quantity).toFixed(2)}</td>
                            </tr>
                          ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="ord-totals">
                <div className="ord-totals-row">
                  <span>Subtotal</span>
                  <span>${calcLineTotal(editedOrder.products).toFixed(2)}</span>
                </div>
                <div className="ord-totals-row">
                  <span>Discount</span>
                  <input
                    type="number" min="0" step="0.01" className="ord-mini-input"
                    value={editedOrder.discount}
                    onChange={e => handleDiscountChange(Number(e.target.value))}
                  />
                </div>
                <div className="ord-totals-row ord-totals-row--final">
                  <span>Total</span>
                  <span>${editedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="ord-modal-footer">
              <button className="ord-btn ord-btn--ghost" onClick={closeModal}>Close</button>
              <button className="ord-btn ord-btn--primary" onClick={handleSaveOrder} disabled={saving}>
                {saving ? <><span className="ord-spinner" />Saving…</> : 'Save Changes'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}