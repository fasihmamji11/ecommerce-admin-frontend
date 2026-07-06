// import { useState } from "react";
// import "../styles/Discounts.css";

// type Discount = {
//     id: string;
//     name: string;
//     type: "percentage" | "fixed";
//     value: number;
//     target: "product" | "category" | "subcategory";
//     targetName: string;
//     usageLimit: number;
//     used: number;
//     startDate: string;
//     endDate: string;
// };

// const dummyDiscounts: Discount[] = [
//     {
//         id: "DISC001",
//         name: "Winter Sale",
//         type: "percentage",
//         value: 15,
//         target: "category",
//         targetName: "Electronics",
//         usageLimit: 100,
//         used: 45,
//         startDate: "2025-12-01",
//         endDate: "2025-12-31",
//     },
//     {
//         id: "DISC002",
//         name: "Phone Discount",
//         type: "fixed",
//         value: 50,
//         target: "product",
//         targetName: "iPhone 14",
//         usageLimit: 50,
//         used: 10,
//         startDate: "2025-12-05",
//         endDate: "2025-12-20",
//     },
// ];

// export default function Discounts() {
//     const [discounts, setDiscounts] = useState<Discount[]>(dummyDiscounts);
//     const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
//     const [showModal, setShowModal] = useState(false);
//     const [formData, setFormData] = useState<Partial<Discount>>({});
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterTarget, setFilterTarget] = useState<"all" | "product" | "category" | "subcategory">("all");
//     const [filterStatus, setFilterStatus] = useState<"all" | "active" | "expired">("all");

//     const openModal = (discount?: Discount) => {
//         if (discount) {
//             setFormData(discount);
//             setSelectedDiscount(discount);
//         } else {
//             setFormData({});
//             setSelectedDiscount(null);
//         }
//         setShowModal(true);
//     };

//     const handleInputChange = (field: keyof Discount, value: any) => {
//         setFormData({ ...formData, [field]: value });
//     };

//     const handleSave = () => {
//         if (selectedDiscount) {
//             setDiscounts((prev) =>
//                 prev.map((d) => (d.id === selectedDiscount.id ? { ...selectedDiscount, ...formData } as Discount : d))
//             );
//         } else {
//             const newDiscount: Discount = {
//                 id: `DISC${(discounts.length + 1).toString().padStart(3, "0")}`,
//                 name: formData.name || "",
//                 type: formData.type || "percentage",
//                 value: formData.value || 0,
//                 target: formData.target || "product",
//                 targetName: formData.targetName || "",
//                 usageLimit: formData.usageLimit || 0,
//                 used: 0,
//                 startDate: formData.startDate || "",
//                 endDate: formData.endDate || "",
//             };
//             setDiscounts((prev) => [newDiscount, ...prev]);
//         }
//         setShowModal(false);
//     };

//     const handleDelete = (id: string) => {
//         if (window.confirm("Are you sure you want to delete this discount?")) {
//             setDiscounts((prev) => prev.filter((d) => d.id !== id));
//             setSelectedDiscount(null);
//             setShowModal(false);
//         }
//     };

//     const filteredDiscounts = discounts.filter((d) => {
//         const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesTarget = filterTarget === "all" || d.target === filterTarget;
//         const today = new Date();
//         const endDate = new Date(d.endDate);
//         const status = endDate >= today ? "active" : "expired";
//         const matchesStatus = filterStatus === "all" || status === filterStatus;
//         return matchesSearch && matchesTarget && matchesStatus;
//     });

//     return (
//         <div className="discounts-page">
//             <div className="page-header">
//                 <h2>Discounts</h2>
//                 <p>Manage all discounts for products, categories, and subcategories.</p>
//                 <button className="create-btn" onClick={() => openModal()}>Create New Discount</button>
//             </div>

//             {/* Filters */}
//             <div className="filters">
//                 <input
//                     type="text"
//                     placeholder="Search discount..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <select value={filterTarget} onChange={(e) => setFilterTarget(e.target.value as any)}>
//                     <option value="all">All Targets</option>
//                     <option value="product">Product</option>
//                     <option value="category">Category</option>
//                     <option value="subcategory">Subcategory</option>
//                 </select>
//                 <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
//                     <option value="all">All Status</option>
//                     <option value="active">Active</option>
//                     <option value="expired">Expired</option>
//                 </select>
//             </div>

//             <div className="card discounts-card">
//                 <table className="discounts-table">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Type</th>
//                             <th>Value</th>
//                             <th>Target</th>
//                             <th>Usage</th>
//                             <th>Valid Dates</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredDiscounts.map((d) => (
//                             <tr key={d.id}>
//                                 <td>{d.name}</td>
//                                 <td>{d.type === "percentage" ? "%" : "$"}</td>
//                                 <td>{d.value}</td>
//                                 <td>{d.targetName} ({d.target})</td>
//                                 <td>{d.used} / {d.usageLimit}</td>
//                                 <td>{d.startDate} - {d.endDate}</td>
//                                 <td className="actions">
//                                     <button onClick={() => openModal(d)}>View/Edit</button>
//                                     <button className="delete-btn" onClick={() => handleDelete(d.id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Modal */}
//             {showModal && (
//                 <div className="discount-modal">
//                     <div className="discount-modal-content">
//                         <h3 className="modal-title">{selectedDiscount ? "Edit Discount" : "Create New Discount"}</h3>

//                         <div className="modal-section">
//                             <label>Discount Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter discount name"
//                                 value={formData.name || ""}
//                                 onChange={(e) => handleInputChange("name", e.target.value)}
//                             />
//                         </div>

//                         <div className="modal-section">
//                             <label>Discount Type</label>
//                             <select
//                                 value={formData.type || "percentage"}
//                                 onChange={(e) => handleInputChange("type", e.target.value)}
//                             >
//                                 <option value="percentage">Percentage (%)</option>
//                                 <option value="fixed">Fixed ($)</option>
//                             </select>
//                         </div>

//                         <div className="modal-section">
//                             <label>Discount Value</label>
//                             <input
//                                 type="number"
//                                 placeholder="Enter discount value"
//                                 value={formData.value || ""}
//                                 onChange={(e) => handleInputChange("value", Number(e.target.value))}
//                             />
//                         </div>

//                         <div className="modal-section">
//                             <label>Target Type</label>
//                             <select
//                                 value={formData.target || "product"}
//                                 onChange={(e) => handleInputChange("target", e.target.value)}
//                             >
//                                 <option value="product">Product</option>
//                                 <option value="category">Category</option>
//                                 <option value="subcategory">Subcategory</option>
//                             </select>
//                         </div>

//                         <div className="modal-section">
//                             <label>Target Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter target name"
//                                 value={formData.targetName || ""}
//                                 onChange={(e) => handleInputChange("targetName", e.target.value)}
//                             />
//                         </div>

//                         <div className="modal-section">
//                             <label>Usage Limit</label>
//                             <input
//                                 type="number"
//                                 placeholder="Enter usage limit"
//                                 value={formData.usageLimit || ""}
//                                 onChange={(e) => handleInputChange("usageLimit", Number(e.target.value))}
//                             />
//                         </div>

//                         <div className="modal-section date-inputs">
//                             <div>
//                                 <label>Start Date</label>
//                                 <input
//                                     type="date"
//                                     value={formData.startDate || ""}
//                                     onChange={(e) => handleInputChange("startDate", e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label>End Date</label>
//                                 <input
//                                     type="date"
//                                     value={formData.endDate || ""}
//                                     onChange={(e) => handleInputChange("endDate", e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         <div className="modal-buttons">
//                             <button className="save-btn" onClick={handleSave}>
//                                 {selectedDiscount ? "Update Discount" : "Create Discount"}
//                             </button>
//                             <button
//                                 className="discount-close-icon"
//                                 onClick={() => setShowModal(false)}
//                             >
//                                 ×
//                             </button>
//                             {selectedDiscount && (
//                                 <button className="delete-btn" onClick={() => handleDelete(selectedDiscount.id)}>Delete Discount</button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


import React, { useState, useEffect, useCallback, useMemo } from 'react'
import '../styles/Discounts.css'
import {
  discountService,
  type Discount,
  type DiscountType,
  type DiscountTarget,
} from '../services/discount.service'

/* ─────────────────────────────────────
   Helpers
───────────────────────────────────── */
function getStatus(d: Discount): 'active' | 'expired' | 'scheduled' | 'disabled' {
  if (!d.isActive) return 'disabled'
  const now   = new Date()
  const start = new Date(d.startDate)
  const end   = new Date(d.endDate)
  if (now < start) return 'scheduled'
  if (now > end)   return 'expired'
  return 'active'
}

function formatDate(iso: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}

function usagePct(d: Discount): number {
  if (!d.usageLimit) return 0
  return Math.min(100, Math.round((d.usedCount / d.usageLimit) * 100))
}

function randomCode(): string {
  return Math.random().toString(36).slice(2, 10).toUpperCase()
}

const EMPTY_FORM: Partial<Discount> = {
  code: '', name: '', type: 'percentage', value: 0,
  target: 'order', targetId: null, targetName: '',
  minOrderValue: 0, usageLimit: 0, startDate: '', endDate: '', isActive: true,
}

/* ─────────────────────────────────────
   Sub-components
───────────────────────────────────── */
const StatusBadge: React.FC<{ status: ReturnType<typeof getStatus> }> = ({ status }) => (
  <span className={`dc-badge dc-badge--${status}`}>
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
)

const UsageBar: React.FC<{ discount: Discount }> = ({ discount }) => {
  const pct = usagePct(discount)
  const unlimited = !discount.usageLimit
  return (
    <div className="dc-usage">
      <span className="dc-usage-text">
        {discount.usedCount}{unlimited ? '' : ` / ${discount.usageLimit}`}
        {unlimited && ' used'}
      </span>
      {!unlimited && (
        <div className="dc-usage-bar">
          <div
            className={`dc-usage-fill ${pct >= 90 ? 'dc-usage-fill--danger' : pct >= 60 ? 'dc-usage-fill--warn' : ''}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  )
}

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <tr>
    <td colSpan={7} className="dc-empty">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" />
      </svg>
      <p>{message}</p>
    </td>
  </tr>
)

/* ─────────────────────────────────────
   Main component
───────────────────────────────────── */
export default function Discounts() {
  const [discounts,       setDiscounts]      = useState<Discount[]>([])
  const [loading,         setLoading]        = useState(true)
  const [showModal,       setShowModal]      = useState(false)
  const [selectedDiscount,setSelectedDiscount] = useState<Discount | null>(null)
  const [formData,        setFormData]       = useState<Partial<Discount>>(EMPTY_FORM)
  const [saving,          setSaving]         = useState(false)
  const [searchTerm,      setSearchTerm]     = useState('')
  const [filterTarget,    setFilterTarget]   = useState<'all' | DiscountTarget>('all')
  const [filterStatus,    setFilterStatus]   = useState<'all' | 'active' | 'expired' | 'scheduled' | 'disabled'>('all')
  const [toast,           setToast]          = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [copied,          setCopied]         = useState<number | null>(null)

  /* ── Toast auto-dismiss ── */
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(t)
  }, [toast])

  /* ── Load ── */
  const loadDiscounts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await discountService.getDiscounts()
      setDiscounts(data)
    } catch {
      setToast({ msg: 'Failed to load discounts', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadDiscounts() }, [loadDiscounts])

  /* ── Keyboard / scroll lock ── */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowModal(false) }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  /* ── Modal helpers ── */
  function openCreate() {
    setSelectedDiscount(null)
    setFormData({ ...EMPTY_FORM, code: randomCode() })
    setShowModal(true)
  }

  function openEdit(d: Discount) {
    setSelectedDiscount(d)
    setFormData({ ...d })
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setSelectedDiscount(null)
  }

  function handleInput(field: keyof Discount, value: unknown) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  /* ── Validate form ── */
  function validate(): string | null {
    if (!formData.code?.trim())  return 'Coupon code is required'
    if (!formData.name?.trim())  return 'Discount name is required'
    if (!formData.value || formData.value <= 0) return 'Value must be greater than 0'
    if (formData.type === 'percentage' && formData.value > 100) return 'Percentage cannot exceed 100'
    if (!formData.startDate)     return 'Start date is required'
    if (!formData.endDate)       return 'End date is required'
    if (formData.startDate > formData.endDate) return 'End date must be after start date'
    return null
  }

  /* ── Save ── */
  async function handleSave() {
    const err = validate()
    if (err) { setToast({ msg: err, type: 'error' }); return }

    setSaving(true)
    try {
      const payload = {
        code:          (formData.code ?? '').toUpperCase().trim(),
        name:          formData.name ?? '',
        type:          (formData.type ?? 'percentage') as DiscountType,
        value:         Number(formData.value ?? 0),
        target:        (formData.target ?? 'order') as DiscountTarget,
        targetId:      formData.targetId ?? null,
        targetName:    formData.targetName ?? '',
        minOrderValue: Number(formData.minOrderValue ?? 0),
        usageLimit:    Number(formData.usageLimit ?? 0),
        startDate:     formData.startDate ?? '',
        endDate:       formData.endDate ?? '',
        isActive:      formData.isActive ?? true,
      }

      if (selectedDiscount) {
        const updated = await discountService.updateDiscount(selectedDiscount.id, payload)
        setDiscounts(prev => prev.map(d => d.id === selectedDiscount.id ? updated : d))
        setToast({ msg: 'Discount updated', type: 'success' })
      } else {
        const created = await discountService.createDiscount(payload)
        setDiscounts(prev => [created, ...prev])
        setToast({ msg: 'Discount created', type: 'success' })
      }
      closeModal()
    } catch (err: any) {
      const msg = err?.response?.status === 409
        ? 'That coupon code already exists — choose a different one'
        : 'Failed to save discount'
      setToast({ msg, type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  /* ── Toggle active ── */
  async function handleToggle(d: Discount) {
    try {
      const updated = await discountService.toggleActive(d.id, !d.isActive)
      setDiscounts(prev => prev.map(x => x.id === d.id ? updated : x))
      setToast({ msg: updated.isActive ? 'Discount enabled' : 'Discount disabled', type: 'success' })
    } catch {
      setToast({ msg: 'Failed to update status', type: 'error' })
    }
  }

  /* ── Delete ── */
  async function handleDelete(id: number) {
    if (!window.confirm('Delete this discount permanently?')) return
    try {
      await discountService.deleteDiscount(id)
      setDiscounts(prev => prev.filter(d => d.id !== id))
      setToast({ msg: 'Discount deleted', type: 'success' })
      closeModal()
    } catch {
      setToast({ msg: 'Failed to delete discount', type: 'error' })
    }
  }

  /* ── Copy code ── */
  async function copyCode(d: Discount) {
    await navigator.clipboard.writeText(d.code)
    setCopied(d.id)
    setTimeout(() => setCopied(null), 1800)
  }

  /* ── Filter + sort ── */
  const filtered = useMemo(() => discounts.filter(d => {
    const term = searchTerm.toLowerCase()
    const matchSearch = d.name.toLowerCase().includes(term) || d.code.toLowerCase().includes(term)
    const matchTarget = filterTarget === 'all' || d.target === filterTarget
    const matchStatus = filterStatus === 'all' || getStatus(d) === filterStatus
    return matchSearch && matchTarget && matchStatus
  }), [discounts, searchTerm, filterTarget, filterStatus])

  /* ── Stats ── */
  const activeCount    = discounts.filter(d => getStatus(d) === 'active').length
  const totalSavings   = discounts.reduce((s, d) => s + d.usedCount, 0)
  const expiredCount   = discounts.filter(d => getStatus(d) === 'expired').length

  /* ─────────────────────────────────────
     Render
  ───────────────────────────────────── */
  return (
    <div className="dc-page">

      {/* ── Toast ── */}
      {toast && (
        <div className={`dc-toast dc-toast--${toast.type}`} role="alert">
          {toast.type === 'success'
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          }
          {toast.msg}
        </div>
      )}

      {/* ── Header ── */}
      <div className="dc-header">
        <div className="dc-header-text">
          <h2>Discounts</h2>
          <p>Create and manage coupon codes for your storefront checkout</p>
        </div>
        <button className="dc-btn dc-btn--primary" onClick={openCreate}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Discount
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="dc-stats">
        <div className="dc-stat">
          <span className="dc-stat-val">{loading ? '—' : discounts.length}</span>
          <span className="dc-stat-lbl">Total</span>
        </div>
        <div className="dc-stat-divider" />
        <div className="dc-stat">
          <span className="dc-stat-val dc-stat-val--teal">{loading ? '—' : activeCount}</span>
          <span className="dc-stat-lbl">Active</span>
        </div>
        <div className="dc-stat-divider" />
        <div className="dc-stat">
          <span className="dc-stat-val dc-stat-val--red">{loading ? '—' : expiredCount}</span>
          <span className="dc-stat-lbl">Expired</span>
        </div>
        <div className="dc-stat-divider" />
        <div className="dc-stat">
          <span className="dc-stat-val dc-stat-val--amber">{loading ? '—' : totalSavings}</span>
          <span className="dc-stat-lbl">Total Redemptions</span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="dc-filters">
        <div className="dc-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Search by name or code…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search discounts"
          />
        </div>
        <select className="dc-select" value={filterTarget} onChange={e => setFilterTarget(e.target.value as typeof filterTarget)}>
          <option value="all">All Targets</option>
          <option value="order">Whole Order</option>
          <option value="product">Product</option>
          <option value="category">Category</option>
          <option value="subcategory">Subcategory</option>
        </select>
        <select className="dc-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="scheduled">Scheduled</option>
          <option value="expired">Expired</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      {/* ── Table card ── */}
      <div className="dc-card">
        <div className="dc-table-wrap">
          <table className="dc-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Name</th>
                <th>Discount</th>
                <th>Target</th>
                <th>Usage</th>
                <th>Valid Period</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j}><div className="dc-shimmer" style={{ height: 16, borderRadius: 6 }} /></td>
                      ))}
                    </tr>
                  ))
                : filtered.length === 0
                  ? <EmptyState message={searchTerm || filterTarget !== 'all' || filterStatus !== 'all' ? 'No discounts match your filters' : 'No discounts yet. Create your first coupon code.'} />
                  : filtered.map(d => (
                      <tr key={d.id}>
                        <td>
                          <div className="dc-code-cell">
                            <span className="dc-code">{d.code}</span>
                            <button
                              className="dc-copy-btn"
                              onClick={() => copyCode(d)}
                              title="Copy code"
                              aria-label={`Copy code ${d.code}`}
                            >
                              {copied === d.id
                                ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                              }
                            </button>
                          </div>
                        </td>
                        <td className="dc-name">{d.name}</td>
                        <td>
                          <span className="dc-value">
                            {d.type === 'percentage' ? `${d.value}%` : `$${d.value}`}
                          </span>
                        </td>
                        <td>
                          <span className="dc-target-badge">
                            {d.target === 'order' ? 'Whole Order' : d.targetName || d.target}
                          </span>
                        </td>
                        <td><UsageBar discount={d} /></td>
                        <td className="dc-dates">
                          <span>{formatDate(d.startDate)}</span>
                          <span className="dc-date-sep">→</span>
                          <span>{formatDate(d.endDate)}</span>
                        </td>
                        <td><StatusBadge status={getStatus(d)} /></td>
                        <td>
                          <div className="dc-actions">
                            <button className="dc-action-btn dc-action-btn--edit" onClick={() => openEdit(d)}>Edit</button>
                            <button
                              className={`dc-action-btn ${d.isActive ? 'dc-action-btn--disable' : 'dc-action-btn--enable'}`}
                              onClick={() => handleToggle(d)}
                            >
                              {d.isActive ? 'Disable' : 'Enable'}
                            </button>
                            <button className="dc-action-btn dc-action-btn--delete" onClick={() => handleDelete(d.id)} aria-label="Delete discount">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
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
      {showModal && (
        <div className="dc-modal-overlay" role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="dc-modal">

            {/* Header */}
            <div className="dc-modal-header">
              <div className="dc-modal-title-wrap">
                <div className="dc-modal-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" />
                  </svg>
                </div>
                <h3>{selectedDiscount ? 'Edit Discount' : 'New Discount'}</h3>
              </div>
              <button className="dc-close-btn" onClick={closeModal} aria-label="Close">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="dc-modal-body">

              {/* Coupon code */}
              <div className="dc-section">
                <div className="dc-section-title"><span className="dc-section-bar" />Coupon Code</div>
                <div className="dc-code-input-wrap">
                  <div className="dc-field dc-field--grow">
                    <label>Code <span className="dc-required">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. WINTER25"
                      value={(formData.code ?? '').toUpperCase()}
                      onChange={e => handleInput('code', e.target.value.toUpperCase().replace(/\s/g, ''))}
                    />
                    <span className="dc-hint">Customers enter this at checkout</span>
                  </div>
                  <button className="dc-btn dc-btn--ghost dc-regen-btn" onClick={() => handleInput('code', randomCode())} title="Generate random code">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 4v6h-6" /><path d="M1 20v-6h6" />
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                    </svg>
                    Regenerate
                  </button>
                </div>
              </div>

              {/* Discount details */}
              <div className="dc-section">
                <div className="dc-section-title"><span className="dc-section-bar" />Discount Details</div>
                <div className="dc-form-grid">
                  <div className="dc-field dc-field--full">
                    <label>Internal Name <span className="dc-required">*</span></label>
                    <input
                      type="text"
                      placeholder="e.g. Winter Sale 25%"
                      value={formData.name ?? ''}
                      onChange={e => handleInput('name', e.target.value)}
                    />
                  </div>
                  <div className="dc-field">
                    <label>Discount Type</label>
                    <select className="dc-select" value={formData.type ?? 'percentage'} onChange={e => handleInput('type', e.target.value)}>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount ($)</option>
                    </select>
                  </div>
                  <div className="dc-field">
                    <label>Value <span className="dc-required">*</span></label>
                    <div className="dc-value-wrap">
                      <span className="dc-value-prefix">{formData.type === 'percentage' ? '%' : '$'}</span>
                      <input
                        type="number"
                        min="0"
                        max={formData.type === 'percentage' ? 100 : undefined}
                        step={formData.type === 'percentage' ? 1 : 0.01}
                        placeholder={formData.type === 'percentage' ? '25' : '10.00'}
                        value={formData.value || ''}
                        onChange={e => handleInput('value', Number(e.target.value))}
                        className="dc-value-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Target */}
              <div className="dc-section">
                <div className="dc-section-title"><span className="dc-section-bar" />Applies To</div>
                <div className="dc-form-grid">
                  <div className="dc-field">
                    <label>Target</label>
                    <select className="dc-select" value={formData.target ?? 'order'} onChange={e => handleInput('target', e.target.value)}>
                      <option value="order">Whole Order</option>
                      <option value="category">Category</option>
                      <option value="subcategory">Subcategory</option>
                      <option value="product">Specific Product</option>
                    </select>
                  </div>
                  {formData.target !== 'order' && (
                    <div className="dc-field">
                      <label>Target Name</label>
                      <input
                        type="text"
                        placeholder={`Enter ${formData.target} name`}
                        value={formData.targetName ?? ''}
                        onChange={e => handleInput('targetName', e.target.value)}
                      />
                    </div>
                  )}
                  <div className="dc-field">
                    <label>Minimum Order Value ($)</label>
                    <input
                      type="number" min="0" step="0.01" placeholder="0 = no minimum"
                      value={formData.minOrderValue || ''}
                      onChange={e => handleInput('minOrderValue', Number(e.target.value))}
                    />
                  </div>
                  <div className="dc-field">
                    <label>Usage Limit</label>
                    <input
                      type="number" min="0" placeholder="0 = unlimited"
                      value={formData.usageLimit || ''}
                      onChange={e => handleInput('usageLimit', Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* Validity */}
              <div className="dc-section">
                <div className="dc-section-title"><span className="dc-section-bar" />Validity Period</div>
                <div className="dc-form-grid">
                  <div className="dc-field">
                    <label>Start Date <span className="dc-required">*</span></label>
                    <input type="date" value={formData.startDate ?? ''} onChange={e => handleInput('startDate', e.target.value)} />
                  </div>
                  <div className="dc-field">
                    <label>End Date <span className="dc-required">*</span></label>
                    <input type="date" value={formData.endDate ?? ''} onChange={e => handleInput('endDate', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Enable toggle */}
              <div className="dc-toggle-row">
                <span className="dc-toggle-label">Discount is {formData.isActive ? 'enabled' : 'disabled'}</span>
                <button
                  type="button"
                  className={`dc-toggle ${formData.isActive ? 'dc-toggle--on' : ''}`}
                  onClick={() => handleInput('isActive', !formData.isActive)}
                  role="switch"
                  aria-checked={formData.isActive}
                >
                  <span className="dc-toggle-thumb" />
                </button>
              </div>

            </div>

            {/* Footer */}
            <div className="dc-modal-footer">
              {selectedDiscount && (
                <button className="dc-btn dc-btn--danger" onClick={() => handleDelete(selectedDiscount.id)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Delete
                </button>
              )}
              <button className="dc-btn dc-btn--ghost" onClick={closeModal}>Cancel</button>
              <button className="dc-btn dc-btn--primary" onClick={handleSave} disabled={saving}>
                {saving ? <><span className="dc-spinner" />Saving…</> : selectedDiscount ? 'Save Changes' : 'Create Discount'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}