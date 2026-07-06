// import { useState } from "react";
// import "../styles/Inventory.css";

// type Variant = {
//     id: string;
//     name: string;
//     sku: string;
//     size?: string;
//     color?: string;
//     stock: number;
//     reorderPoint: number;
//     price: number;
//     cost: number;
// };

// type InventoryProduct = {
//     id: string;
//     name: string;
//     category: string;
//     totalStock: number;
//     reorderLevel: number;
//     variants: Variant[];
//     lastRestocked: string;
//     status: "in-stock" | "low-stock" | "out-of-stock";
//     image: string;
// };

// const dummyInventory: InventoryProduct[] = [
//     {
//         id: "INV001",
//         name: "Wireless Headphones",
//         category: "Electronics",
//         totalStock: 145,
//         reorderLevel: 50,
//         lastRestocked: "2025-11-20",
//         status: "in-stock",
//         image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
//         variants: [
//             { id: "V001", name: "Black - Small", sku: "WH-BLK-S", color: "Black", size: "Small", stock: 45, reorderPoint: 15, price: 99.99, cost: 60.00 },
//             { id: "V002", name: "Black - Large", sku: "WH-BLK-L", color: "Black", size: "Large", stock: 60, reorderPoint: 20, price: 109.99, cost: 65.00 },
//             { id: "V003", name: "White - Small", sku: "WH-WHT-S", color: "White", size: "Small", stock: 40, reorderPoint: 15, price: 99.99, cost: 60.00 },
//         ],
//     },
//     {
//         id: "INV002",
//         name: "Smart Watch",
//         category: "Electronics",
//         totalStock: 28,
//         reorderLevel: 30,
//         lastRestocked: "2025-10-15",
//         status: "low-stock",
//         image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
//         variants: [
//             { id: "V004", name: "Silver - 42mm", sku: "SW-SLV-42", color: "Silver", size: "42mm", stock: 15, reorderPoint: 10, price: 249.99, cost: 150.00 },
//             { id: "V005", name: "Gold - 44mm", sku: "SW-GLD-44", color: "Gold", size: "44mm", stock: 13, reorderPoint: 10, price: 279.99, cost: 170.00 },
//         ],
//     },
//     {
//         id: "INV003",
//         name: "Running Shoes",
//         category: "Fashion",
//         totalStock: 0,
//         reorderLevel: 20,
//         lastRestocked: "2025-08-10",
//         status: "out-of-stock",
//         image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
//         variants: [
//             { id: "V006", name: "Red - Size 9", sku: "RS-RED-9", color: "Red", size: "9", stock: 0, reorderPoint: 5, price: 89.99, cost: 45.00 },
//         ],
//     },
// ];

// export default function Inventory() {
//     const [inventory, setInventory] = useState<InventoryProduct[]>(dummyInventory);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState<InventoryProduct | null>(null);
//     const [editMode, setEditMode] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterStatus, setFilterStatus] = useState<"all" | "in-stock" | "low-stock" | "out-of-stock">("all");
//     const [newVariant, setNewVariant] = useState<Partial<Variant>>({});
//     const [showAddVariant, setShowAddVariant] = useState(false);

//     function openProductModal(product: InventoryProduct) {
//         setSelectedProduct(product);
//         setEditMode(false);
//         setShowAddVariant(false);
//         setShowModal(true);
//     }

//     function handleUpdateVariant(variantId: string, field: keyof Variant, value: any) {
//         if (!selectedProduct) return;
//         const updatedVariants = selectedProduct.variants.map((v) =>
//             v.id === variantId ? { ...v, [field]: value } : v
//         );
//         const updatedProduct = { ...selectedProduct, variants: updatedVariants };
//         updateProductStock(updatedProduct);
//         setSelectedProduct(updatedProduct);
//     }

//     function updateProductStock(product: InventoryProduct) {
//         const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
//         const status: "in-stock" | "low-stock" | "out-of-stock" =
//             totalStock === 0 ? "out-of-stock" : totalStock <= product.reorderLevel ? "low-stock" : "in-stock";
//         const updated = { ...product, totalStock, status };
//         setInventory(inventory.map((p) => (p.id === product.id ? updated : p)));
//         setSelectedProduct(updated);
//     }

//     function handleAddVariant() {
//         if (!selectedProduct || !newVariant.name || !newVariant.sku) return;
//         const variant: Variant = {
//             id: `V${Date.now()}`,
//             name: newVariant.name,
//             sku: newVariant.sku,
//             size: newVariant.size || "",
//             color: newVariant.color || "",
//             stock: newVariant.stock || 0,
//             reorderPoint: newVariant.reorderPoint || 10,
//             price: newVariant.price || 0,
//             cost: newVariant.cost || 0,
//         };
//         const updatedProduct = { ...selectedProduct, variants: [...selectedProduct.variants, variant] };
//         updateProductStock(updatedProduct);
//         setNewVariant({});
//         setShowAddVariant(false);
//     }

//     function handleDeleteVariant(variantId: string) {
//         if (!selectedProduct) return;
//         if (window.confirm("Are you sure you want to delete this variant?")) {
//             const updatedProduct = {
//                 ...selectedProduct,
//                 variants: selectedProduct.variants.filter((v) => v.id !== variantId),
//             };
//             updateProductStock(updatedProduct);
//         }
//     }

//     function handleBulkStockUpdate(adjustment: number) {
//         if (!selectedProduct) return;
//         const updatedVariants = selectedProduct.variants.map((v) => ({
//             ...v,
//             stock: Math.max(0, v.stock + adjustment),
//         }));
//         const updatedProduct = { ...selectedProduct, variants: updatedVariants };
//         updateProductStock(updatedProduct);
//     }

//     function handleDeleteProduct(id: string) {
//         if (window.confirm("Are you sure you want to delete this product from inventory?")) {
//             setInventory(inventory.filter((p) => p.id !== id));
//             setShowModal(false);
//         }
//     }

//     const filteredInventory = inventory.filter((p) => {
//         const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesStatus = filterStatus === "all" || p.status === filterStatus;
//         return matchesSearch && matchesStatus;
//     });

//     const totalValue = inventory.reduce(
//         (sum, p) => sum + p.variants.reduce((vSum, v) => vSum + v.stock * v.cost, 0),
//         0
//     );

//     const lowStockCount = inventory.filter((p) => p.status === "low-stock").length;
//     const outOfStockCount = inventory.filter((p) => p.status === "out-of-stock").length;

//     return (
//         <div className="inventory-page">
//             {/* PAGE HEADER */}
//             <div className="page-header">
//                 <div>
//                     <h2>Inventory Management</h2>
//                     <p>Track stock levels, manage variants and monitor product availability</p>
//                 </div>
//             </div>

//             {/* STATS CARDS */}
//             <div className="stats-grid">
//                 <div className="stat-card">
//                     <div className="stat-icon total-icon">
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
//                         </svg>
//                     </div>
//                     <div className="stat-content">
//                         <div className="stat-label">Total Products</div>
//                         <div className="stat-value">{inventory.length}</div>
//                     </div>
//                 </div>
//                 <div className="stat-card">
//                     <div className="stat-icon value-icon">
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <line x1="12" y1="1" x2="12" y2="23"></line>
//                             <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//                         </svg>
//                     </div>
//                     <div className="stat-content">
//                         <div className="stat-label">Inventory Value</div>
//                         <div className="stat-value">${totalValue.toFixed(2)}</div>
//                     </div>
//                 </div>
//                 <div className="stat-card warning">
//                     <div className="stat-icon warning-icon">
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
//                             <line x1="12" y1="9" x2="12" y2="13"></line>
//                             <line x1="12" y1="17" x2="12.01" y2="17"></line>
//                         </svg>
//                     </div>
//                     <div className="stat-content">
//                         <div className="stat-label">Low Stock Items</div>
//                         <div className="stat-value">{lowStockCount}</div>
//                     </div>
//                 </div>
//                 <div className="stat-card danger">
//                     <div className="stat-icon danger-icon">
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <circle cx="12" cy="12" r="10"></circle>
//                             <line x1="15" y1="9" x2="9" y2="15"></line>
//                             <line x1="9" y1="9" x2="15" y2="15"></line>
//                         </svg>
//                     </div>
//                     <div className="stat-content">
//                         <div className="stat-label">Out of Stock</div>
//                         <div className="stat-value">{outOfStockCount}</div>
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
//                         placeholder="Search products..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//                 <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
//                     <option value="all">All Status</option>
//                     <option value="in-stock">In Stock</option>
//                     <option value="low-stock">Low Stock</option>
//                     <option value="out-of-stock">Out of Stock</option>
//                 </select>
//             </div>

//             {/* INVENTORY TABLE */}
//             <div className="card inventory-table-card">
//                 <table className="inventory-table">
//                     <thead>
//                         <tr>
//                             <th>Product</th>
//                             <th>Category</th>
//                             <th>Total Stock</th>
//                             <th>Variants</th>
//                             <th>Reorder Level</th>
//                             <th>Last Restocked</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredInventory.map((product) => (
//                             <tr key={product.id} onClick={() => openProductModal(product)} style={{ cursor: "pointer" }}>
//                                 <td>
//                                     <div className="product-cell">
//                                         <img src={product.image} alt={product.name} className="product-img" />
//                                         <span className="product-name">{product.name}</span>
//                                     </div>
//                                 </td>
//                                 <td>{product.category}</td>
//                                 <td className="stock-cell">{product.totalStock}</td>
//                                 <td className="text-center">{product.variants.length}</td>
//                                 <td>{product.reorderLevel}</td>
//                                 <td>{new Date(product.lastRestocked).toLocaleDateString()}</td>
//                                 <td>
//                                     <span className={`status-badge ${product.status}`}>
//                                         {product.status.replace("-", " ")}
//                                     </span>
//                                 </td>
//                                 <td className="actions" onClick={(e) => e.stopPropagation()}>
//                                     <button className="manage-btn" onClick={() => openProductModal(product)}>
//                                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                             <circle cx="12" cy="12" r="3"></circle>
//                                             <path d="M12 1v6m0 6v6"></path>
//                                         </svg>
//                                         Manage
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* INVENTORY MODAL */}
//             {showModal && selectedProduct && (
//                 <div className="inventory-modal">
//                     <div className="inventory-modal-content">
//                         <div className="modal-header">
//                             <div className="header-left">
//                                 <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-product-img" />
//                                 <div>
//                                     <h3>{selectedProduct.name}</h3>
//                                     <span className="modal-category">{selectedProduct.category}</span>
//                                 </div>
//                             </div>
//                             <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
//                         </div>

//                         <div className="modal-body">
//                             {/* Inventory Overview */}
//                             <div className="inventory-overview">
//                                 <div className="overview-item">
//                                     <div className="overview-label">Total Stock</div>
//                                     <div className="overview-value">{selectedProduct.totalStock}</div>
//                                 </div>
//                                 <div className="overview-item">
//                                     <div className="overview-label">Variants</div>
//                                     <div className="overview-value">{selectedProduct.variants.length}</div>
//                                 </div>
//                                 <div className="overview-item">
//                                     <div className="overview-label">Reorder Level</div>
//                                     <div className="overview-value">{selectedProduct.reorderLevel}</div>
//                                 </div>
//                                 <div className="overview-item">
//                                     <div className="overview-label">Status</div>
//                                     <span className={`status-badge ${selectedProduct.status}`}>
//                                         {selectedProduct.status.replace("-", " ")}
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* Quick Actions */}
//                             <div className="quick-actions">
//                                 <button className="quick-action-btn" onClick={() => handleBulkStockUpdate(10)}>
//                                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                         <line x1="12" y1="5" x2="12" y2="19"></line>
//                                         <line x1="5" y1="12" x2="19" y2="12"></line>
//                                     </svg>
//                                     Add 10 to All
//                                 </button>
//                                 <button className="quick-action-btn" onClick={() => handleBulkStockUpdate(-10)}>
//                                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                         <line x1="5" y1="12" x2="19" y2="12"></line>
//                                     </svg>
//                                     Remove 10 from All
//                                 </button>
//                                 <button className="quick-action-btn primary" onClick={() => setShowAddVariant(!showAddVariant)}>
//                                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                         <line x1="12" y1="5" x2="12" y2="19"></line>
//                                         <line x1="5" y1="12" x2="19" y2="12"></line>
//                                     </svg>
//                                     Add Variant
//                                 </button>
//                             </div>

//                             {/* Add Variant Form */}
//                             {showAddVariant && (
//                                 <div className="add-variant-form">
//                                     <h4 className="section-title">Add New Variant</h4>
//                                     <div className="form-grid">
//                                         <div className="form-group">
//                                             <label>Variant Name</label>
//                                             <input type="text" placeholder="e.g. Black - Large" value={newVariant.name || ""} onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>SKU</label>
//                                             <input type="text" placeholder="e.g. PRD-BLK-L" value={newVariant.sku || ""} onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Color</label>
//                                             <input type="text" placeholder="e.g. Black" value={newVariant.color || ""} onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Size</label>
//                                             <input type="text" placeholder="e.g. Large" value={newVariant.size || ""} onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Initial Stock</label>
//                                             <input type="number" placeholder="0" value={newVariant.stock || ""} onChange={(e) => setNewVariant({ ...newVariant, stock: Number(e.target.value) })} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Reorder Point</label>
//                                             <input type="number" placeholder="10" value={newVariant.reorderPoint || ""} onChange={(e) => setNewVariant({ ...newVariant, reorderPoint: Number(e.target.value) })} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Price ($)</label>
//                                             <input type="number" placeholder="0.00" value={newVariant.price || ""} onChange={(e) => setNewVariant({ ...newVariant, price: Number(e.target.value) })} />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Cost ($)</label>
//                                             <input type="number" placeholder="0.00" value={newVariant.cost || ""} onChange={(e) => setNewVariant({ ...newVariant, cost: Number(e.target.value) })} />
//                                         </div>
//                                     </div>
//                                     <div className="form-actions">
//                                         <button className="save-btn" onClick={handleAddVariant}>Add Variant</button>
//                                         <button className="cancel-btn" onClick={() => { setShowAddVariant(false); setNewVariant({}); }}>Cancel</button>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Variants Table */}
//                             <h4 className="section-title">Product Variants</h4>
//                             <div className="variants-table-wrapper">
//                                 <table className="variants-table">
//                                     <thead>
//                                         <tr>
//                                             <th>Variant</th>
//                                             <th>SKU</th>
//                                             <th>Stock</th>
//                                             <th>Reorder</th>
//                                             <th>Price</th>
//                                             <th>Cost</th>
//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {selectedProduct.variants.map((variant) => (
//                                             <tr key={variant.id}>
//                                                 <td>
//                                                     <div className="variant-name">
//                                                         {variant.name}
//                                                         {variant.color && <span className="variant-tag">{variant.color}</span>}
//                                                         {variant.size && <span className="variant-tag">{variant.size}</span>}
//                                                     </div>
//                                                 </td>
//                                                 <td className="sku-cell">{variant.sku}</td>
//                                                 <td>
//                                                     <input
//                                                         type="number"
//                                                         className="stock-input"
//                                                         value={variant.stock}
//                                                         onChange={(e) => handleUpdateVariant(variant.id, "stock", Number(e.target.value))}
//                                                     />
//                                                 </td>
//                                                 <td>
//                                                     <input
//                                                         type="number"
//                                                         className="stock-input"
//                                                         value={variant.reorderPoint}
//                                                         onChange={(e) => handleUpdateVariant(variant.id, "reorderPoint", Number(e.target.value))}
//                                                     />
//                                                 </td>
//                                                 <td className="price-cell">${variant.price}</td>
//                                                 <td className="cost-cell">${variant.cost}</td>
//                                                 <td>
//                                                     <button className="delete-variant-btn" onClick={() => handleDeleteVariant(variant.id)}>
//                                                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                                             <polyline points="3 6 5 6 21 6"></polyline>
//                                                             <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//                                                         </svg>
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>

//                         <div className="modal-footer">
//                             <button className="delete-btn" onClick={() => handleDeleteProduct(selectedProduct.id)}>
//                                 Delete Product
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import '../styles/Inventory.css'
import { productService } from '../services/product.service'
import { categoryService } from '../services/catergory.service'

/* ─────────────────────────────────────
   Types
───────────────────────────────────── */
type Variant = {
  id: string
  name: string
  sku: string
  size?: string
  color?: string
  stock: number
  reorderPoint: number
  price: number
  cost: number
}

type InvStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

type InventoryProduct = {
  id: number
  name: string
  category: string
  totalStock: number
  reorderLevel: number
  variants: Variant[]
  lastRestocked: string
  status: InvStatus
  image: string
  basePrice: number
}

/* ─────────────────────────────────────
   Helpers
───────────────────────────────────── */
const REORDER_DEFAULT = 30

function computeStatus(totalStock: number, reorderLevel: number): InvStatus {
  if (totalStock === 0) return 'out-of-stock'
  if (totalStock <= reorderLevel) return 'low-stock'
  return 'in-stock'
}

/** A product with no explicit variants gets one synthetic "Default" variant
 *  that mirrors its top-level stock/price — this keeps the variant table
 *  and bulk-stock logic working uniformly for every product. */
function makeDefaultVariant(p: { id: number; name: string; price: number; stock: number }): Variant {
  return {
    id: `default-${p.id}`,
    name: 'Default',
    sku: `SKU-${p.id}`,
    stock: p.stock,
    reorderPoint: REORDER_DEFAULT,
    price: p.price,
    cost: Math.round(p.price * 0.6 * 100) / 100, // estimated cost, editable
  }
}

function getFirstImage(images: string[]): string {
  return images?.[0] ?? ''
}

/* ─────────────────────────────────────
   Sub-components
───────────────────────────────────── */
const StatusBadge: React.FC<{ status: InvStatus }> = ({ status }) => (
  <span className={`iv-badge iv-badge--${status}`}>
    {status === 'in-stock' ? 'In Stock' : status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
  </span>
)

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <tr>
    <td colSpan={8} className="iv-empty">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="13" rx="2" /><line x1="3" y1="9" x2="21" y2="9" />
      </svg>
      <p>{message}</p>
    </td>
  </tr>
)

/* ─────────────────────────────────────
   Main component
───────────────────────────────────── */
export default function Inventory() {
  const [inventory,        setInventory]        = useState<InventoryProduct[]>([])
  const [categories,       setCategories]       = useState<string[]>([])
  const [loading,          setLoading]          = useState(true)
  const [showModal,        setShowModal]        = useState(false)
  const [selectedProduct,  setSelectedProduct]  = useState<InventoryProduct | null>(null)
  const [searchTerm,       setSearchTerm]       = useState('')
  const [filterStatus,     setFilterStatus]     = useState<'all' | InvStatus>('all')
  const [filterCategory,   setFilterCategory]   = useState('all')
  const [newVariant,       setNewVariant]       = useState<Partial<Variant>>({})
  const [showAddVariant,   setShowAddVariant]   = useState(false)
  const [syncing,          setSyncing]          = useState(false)
  const [toast,            setToast]            = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  /* ── Toast auto-dismiss ── */
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  /* ── Load products + categories, build inventory view ── */
  const loadInventory = useCallback(async () => {
    setLoading(true)
    try {
      const [rawProducts, rawCategories] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories(),
      ])

      setCategories(rawCategories.map((c: any) => c.name))

      const built: InventoryProduct[] = rawProducts.map((p: any) => {
        const id       = Number(p.id)
        const name     = p.title ?? p.name ?? ''
        const price    = Number(p.price ?? 0)
        const stock    = Number(p.stock ?? 0)
        const category = p.category ?? ''
        const images   = Array.isArray(p.images) ? p.images : []

        // If backend ever sends variants, use them; otherwise synthesize one
        const variants: Variant[] = Array.isArray(p.variants) && p.variants.length
          ? p.variants
          : [makeDefaultVariant({ id, name, price, stock })]

        const totalStock   = variants.reduce((s, v) => s + v.stock, 0)
        const reorderLevel = p.reorderLevel ?? REORDER_DEFAULT

        return {
          id, name, category, variants, totalStock, reorderLevel,
          basePrice: price,
          lastRestocked: p.updatedAt ?? p.lastRestocked ?? new Date().toISOString(),
          status: computeStatus(totalStock, reorderLevel),
          image: getFirstImage(images),
        }
      })

      setInventory(built)
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to load inventory', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadInventory() }, [loadInventory])

  /* ── Modal keyboard / scroll lock ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowModal(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  /* ── Sync a product's aggregate stock back to the real backend ──
     This is what keeps Products page in sync with Inventory edits. */
  const syncStockToBackend = useCallback(async (product: InventoryProduct) => {
    setSyncing(true)
    try {
      const payload = new FormData()
      payload.append('name', product.name)
      payload.append('category', product.category)
      payload.append('price', String(product.basePrice))
      payload.append('stock', String(product.totalStock))
      payload.append('description', '') // preserved server-side if backend merges fields
      await productService.updateProduct(product.id, payload)
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Stock change saved locally but failed to sync', type: 'error' })
    } finally {
      setSyncing(false)
    }
  }, [])

  function openProductModal(product: InventoryProduct) {
    setSelectedProduct(product)
    setShowAddVariant(false)
    setNewVariant({})
    setShowModal(true)
  }

  /* ── Recompute totals + push to state + sync ── */
  function applyProductUpdate(updated: InventoryProduct) {
    const totalStock = updated.variants.reduce((s, v) => s + v.stock, 0)
    const status = computeStatus(totalStock, updated.reorderLevel)
    const final = { ...updated, totalStock, status }

    setInventory(prev => prev.map(p => p.id === final.id ? final : p))
    setSelectedProduct(final)
    syncStockToBackend(final)
  }

  function handleUpdateVariant(variantId: string, field: keyof Variant, value: unknown) {
    if (!selectedProduct) return
    const variants = selectedProduct.variants.map(v => v.id === variantId ? { ...v, [field]: value } : v)
    applyProductUpdate({ ...selectedProduct, variants })
  }

  function handleAddVariant() {
    if (!selectedProduct || !newVariant.name?.trim() || !newVariant.sku?.trim()) {
      setToast({ msg: 'Variant name and SKU are required', type: 'error' })
      return
    }
    const variant: Variant = {
      id: `V${Date.now()}`,
      name: newVariant.name,
      sku: newVariant.sku,
      size: newVariant.size || undefined,
      color: newVariant.color || undefined,
      stock: newVariant.stock ?? 0,
      reorderPoint: newVariant.reorderPoint ?? 10,
      price: newVariant.price ?? selectedProduct.basePrice,
      cost: newVariant.cost ?? 0,
    }
    applyProductUpdate({ ...selectedProduct, variants: [...selectedProduct.variants, variant] })
    setNewVariant({})
    setShowAddVariant(false)
    setToast({ msg: 'Variant added', type: 'success' })
  }

  function handleDeleteVariant(variantId: string) {
    if (!selectedProduct) return
    if (selectedProduct.variants.length === 1) {
      setToast({ msg: 'A product must keep at least one variant', type: 'error' })
      return
    }
    if (!window.confirm('Delete this variant?')) return
    applyProductUpdate({ ...selectedProduct, variants: selectedProduct.variants.filter(v => v.id !== variantId) })
  }

  function handleBulkStockUpdate(adjustment: number) {
    if (!selectedProduct) return
    const variants = selectedProduct.variants.map(v => ({ ...v, stock: Math.max(0, v.stock + adjustment) }))
    applyProductUpdate({ ...selectedProduct, variants })
  }

  async function handleDeleteProduct(id: number) {
    if (!window.confirm('Delete this product entirely? This removes it from Products too.')) return
    try {
      await productService.deleteProduct(id)
      setInventory(prev => prev.filter(p => p.id !== id))
      setToast({ msg: 'Product deleted', type: 'success' })
      setShowModal(false)
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to delete product', type: 'error' })
    }
  }

  /* ── Filtered list ── */
  const filtered = inventory.filter(p => {
    const matchName = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === 'all' || p.status === filterStatus
    const matchCat = filterCategory === 'all' || p.category === filterCategory
    return matchName && matchStatus && matchCat
  })

  /* ── Aggregate stats ── */
  const totalValue = useMemo(
    () => inventory.reduce((sum, p) => sum + p.variants.reduce((vs, v) => vs + v.stock * v.cost, 0), 0),
    [inventory]
  )
  const lowStockCount   = inventory.filter(p => p.status === 'low-stock').length
  const outOfStockCount = inventory.filter(p => p.status === 'out-of-stock').length
  const healthyPct = inventory.length
    ? Math.round(((inventory.length - lowStockCount - outOfStockCount) / inventory.length) * 100)
    : 0

  /* ─────────────────────────────────────
     Render
  ───────────────────────────────────── */
  return (
    <div className="iv-page">

      {/* ── Toast ── */}
      {toast && (
        <div className={`iv-toast iv-toast--${toast.type}`} role="alert">
          {toast.type === 'success'
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          }
          {toast.msg}
        </div>
      )}

      {/* ── Sync indicator ── */}
      {syncing && (
        <div className="iv-syncing">
          <span className="iv-sync-dot" /> Syncing with Products…
        </div>
      )}

      {/* ── Page header ── */}
      <div className="iv-header">
        <div className="iv-header-text">
          <h2>Inventory Management</h2>
          <p>Live stock levels pulled from Products — every edit here updates the catalogue too</p>
        </div>
      </div>

      {/* ── Stats cards ── */}
      <div className="iv-stats-grid">
        <div className="iv-stat-card">
          <div className="iv-stat-icon iv-stat-icon--teal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
          </div>
          <div className="iv-stat-content">
            <div className="iv-stat-label">Total Products</div>
            <div className="iv-stat-value">{loading ? '—' : inventory.length}</div>
          </div>
        </div>

        <div className="iv-stat-card">
          <div className="iv-stat-icon iv-stat-icon--blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
          </div>
          <div className="iv-stat-content">
            <div className="iv-stat-label">Inventory Value</div>
            <div className="iv-stat-value">{loading ? '—' : `$${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}</div>
          </div>
        </div>

        <div className="iv-stat-card iv-stat-card--warn">
          <div className="iv-stat-icon iv-stat-icon--amber">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          </div>
          <div className="iv-stat-content">
            <div className="iv-stat-label">Low Stock</div>
            <div className="iv-stat-value">{loading ? '—' : lowStockCount}</div>
          </div>
        </div>

        <div className="iv-stat-card iv-stat-card--danger">
          <div className="iv-stat-icon iv-stat-icon--red">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
          </div>
          <div className="iv-stat-content">
            <div className="iv-stat-label">Out of Stock</div>
            <div className="iv-stat-value">{loading ? '—' : outOfStockCount}</div>
          </div>
        </div>

        <div className="iv-stat-card iv-stat-card--health">
          <div className="iv-health-ring" style={{ '--pct': healthyPct } as React.CSSProperties}>
            <span>{loading ? '—' : `${healthyPct}%`}</span>
          </div>
          <div className="iv-stat-content">
            <div className="iv-stat-label">Stock Health</div>
            <div className="iv-stat-sub">Products above reorder level</div>
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="iv-filters">
        <div className="iv-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input
            type="search"
            placeholder="Search products…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search inventory"
          />
        </div>
        <select className="iv-select" value={filterCategory} onChange={e => setFilterCategory(e.target.value)} aria-label="Filter by category">
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="iv-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value as typeof filterStatus)} aria-label="Filter by status">
          <option value="all">All Status</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      {/* ── Table card ── */}
      <div className="iv-card">
        <div className="iv-table-wrap">
          <table className="iv-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Total Stock</th>
                <th>Variants</th>
                {/* <th>Reorder Level</th>
                <th>Last Restocked</th> */}
                <th>Invested Value</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j}><div className="iv-shimmer" style={{ height: 16, borderRadius: 6 }} /></td>
                      ))}
                    </tr>
                  ))
                : filtered.length === 0
                  ? <EmptyState message={searchTerm || filterStatus !== 'all' || filterCategory !== 'all' ? 'No products match your filters' : 'No products in inventory yet'} />
                  : filtered.map(product => (
                      <tr key={product.id} className="iv-row" onClick={() => openProductModal(product)}>
                        <td>
                          <div className="iv-product-cell">
                            <div className="iv-img-wrap">
                              {product.image
                                ? <img src={product.image} alt={product.name} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                                : <span className="iv-img-fallback">{product.name.charAt(0).toUpperCase()}</span>
                              }
                            </div>
                            <span className="iv-product-name">{product.name}</span>
                          </div>
                        </td>
                        <td><span className="iv-cat-badge">{product.category}</span></td>
                        <td><span className="iv-stock-cell">{product.totalStock}</span></td>
                        <td className="iv-text-center">{product.variants.length}</td>
                        <td className="iv-muted">{Number(product.totalStock) * Number(product.basePrice)}</td>
                        {/* <td className="iv-muted">{product.reorderLevel}</td>
                        <td className="iv-muted">{new Date(product.lastRestocked).toLocaleDateString()}</td> */}
                        <td><StatusBadge status={product.status} /></td>
                        <td onClick={e => e.stopPropagation()}>
                          <button className="iv-manage-btn" onClick={() => openProductModal(product)}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6" /></svg>
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* ──────────── MODAL ──────────── */}
      {showModal && selectedProduct && (
        <div
          className="iv-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}
        >
          <div className="iv-modal">

            {/* Header */}
            <div className="iv-modal-header">
              <div className="iv-modal-header-left">
                <div className="iv-modal-img">
                  {selectedProduct.image
                    ? <img src={selectedProduct.image} alt={selectedProduct.name} />
                    : <span className="iv-img-fallback">{selectedProduct.name.charAt(0).toUpperCase()}</span>
                  }
                </div>
                <div>
                  <h3>{selectedProduct.name}</h3>
                  <span className="iv-modal-cat">{selectedProduct.category}</span>
                </div>
              </div>
              <button className="iv-close-btn" onClick={() => setShowModal(false)} aria-label="Close">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Body */}
            <div className="iv-modal-body">

              {/* Overview */}
              <div className="iv-overview">
                <div className="iv-overview-item">
                  <div className="iv-overview-label">Total Stock</div>
                  <div className="iv-overview-value">{selectedProduct.totalStock}</div>
                </div>
                <div className="iv-overview-item">
                  <div className="iv-overview-label">Variants</div>
                  <div className="iv-overview-value">{selectedProduct.variants.length}</div>
                </div>
                {/* <div className="iv-overview-item">
                  <div className="iv-overview-label">Reorder Level</div>
                  <div className="iv-overview-value">{selectedProduct.reorderLevel}</div>
                </div> */}
                <div className="iv-overview-item">
                  <div className="iv-overview-label">Status</div>
                  <StatusBadge status={selectedProduct.status} />
                </div>
              </div>

              {/* Quick actions */}
              {/* <div className="iv-quick-actions">
                <button className="iv-qa-btn" onClick={() => handleBulkStockUpdate(10)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  Add 10 to All
                </button>
                <button className="iv-qa-btn" onClick={() => handleBulkStockUpdate(-10)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  Remove 10 from All
                </button>
                <button className="iv-qa-btn iv-qa-btn--primary" onClick={() => setShowAddVariant(v => !v)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  Add Variant
                </button>
              </div> */}

              {/* Add variant form */}
              {showAddVariant && (
                <div className="iv-add-variant">
                  <div className="iv-section-title">
                    <span className="iv-section-bar" />
                    New Variant
                  </div>
                  <div className="iv-form-grid">
                    <div className="iv-field">
                      <label>Variant Name <span className="iv-required">*</span></label>
                      <input type="text" placeholder="e.g. Black - Large" value={newVariant.name ?? ''} onChange={e => setNewVariant(v => ({ ...v, name: e.target.value }))} />
                    </div>
                    <div className="iv-field">
                      <label>SKU <span className="iv-required">*</span></label>
                      <input type="text" placeholder="e.g. PRD-BLK-L" value={newVariant.sku ?? ''} onChange={e => setNewVariant(v => ({ ...v, sku: e.target.value }))} />
                    </div>
                    <div className="iv-field">
                      <label>Color</label>
                      <input type="text" placeholder="e.g. Black" value={newVariant.color ?? ''} onChange={e => setNewVariant(v => ({ ...v, color: e.target.value }))} />
                    </div>
                    <div className="iv-field">
                      <label>Size</label>
                      <input type="text" placeholder="e.g. Large" value={newVariant.size ?? ''} onChange={e => setNewVariant(v => ({ ...v, size: e.target.value }))} />
                    </div>
                    <div className="iv-field">
                      <label>Initial Stock</label>
                      <input type="number" min="0" placeholder="0" value={newVariant.stock ?? ''} onChange={e => setNewVariant(v => ({ ...v, stock: Number(e.target.value) }))} />
                    </div>
                    <div className="iv-field">
                      <label>Reorder Point</label>
                      <input type="number" min="0" placeholder="10" value={newVariant.reorderPoint ?? ''} onChange={e => setNewVariant(v => ({ ...v, reorderPoint: Number(e.target.value) }))} />
                    </div>
                    <div className="iv-field">
                      <label>Price ($)</label>
                      <input type="number" min="0" step="0.01" placeholder="0.00" value={newVariant.price ?? ''} onChange={e => setNewVariant(v => ({ ...v, price: Number(e.target.value) }))} />
                    </div>
                    <div className="iv-field">
                      <label>Cost ($)</label>
                      <input type="number" min="0" step="0.01" placeholder="0.00" value={newVariant.cost ?? ''} onChange={e => setNewVariant(v => ({ ...v, cost: Number(e.target.value) }))} />
                    </div>
                  </div>
                  <div className="iv-form-actions">
                    <button className="iv-btn iv-btn--primary" onClick={handleAddVariant}>Add Variant</button>
                    <button className="iv-btn iv-btn--ghost" onClick={() => { setShowAddVariant(false); setNewVariant({}) }}>Cancel</button>
                  </div>
                </div>
              )}

              {/* Variants table */}
              <div className="iv-section-title">
                <span className="iv-section-bar" />
                Product Variants
              </div>
              <div className="iv-variants-wrap">
                <table className="iv-variants-table">
                  <thead>
                    <tr>
                      <th>Variant</th>
                      <th>SKU</th>
                      <th>Stock</th>
                      {/* <th>Reorder</th> */}
                      <th>Price</th>
                      {/* <th>Cost</th> */}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProduct.variants.map(variant => (
                      <tr key={variant.id}>
                        <td>
                          <div className="iv-variant-name">
                            {variant.name}
                            {variant.color && <span className="iv-variant-tag">{variant.color}</span>}
                            {variant.size && <span className="iv-variant-tag">{variant.size}</span>}
                          </div>
                        </td>
                        <td><span className="iv-sku">{variant.sku}</span></td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            className={`iv-stock-input ${variant.stock <= variant.reorderPoint ? 'iv-stock-input--low' : ''}`}
                            value={variant.stock}
                            onChange={e => handleUpdateVariant(variant.id, 'stock', Math.max(0, Number(e.target.value)))}
                          />
                        </td>
                        {/* <td>
                          <input
                            type="number"
                            min="0"
                            className="iv-stock-input"
                            value={variant.reorderPoint}
                            onChange={e => handleUpdateVariant(variant.id, 'reorderPoint', Math.max(0, Number(e.target.value)))}
                          />
                        </td> */}
                        <td className="iv-price">${variant.price.toFixed(2)}</td>
                        {/* <td className="iv-cost">${variant.cost.toFixed(2)}</td> */}
                        <td>
                          <button className="iv-delete-variant" onClick={() => handleDeleteVariant(variant.id)} aria-label="Delete variant">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="iv-modal-footer">
              <span className="iv-footer-hint">Changes sync automatically to Products</span>
              <button className="iv-btn iv-btn--danger" onClick={() => handleDeleteProduct(selectedProduct.id)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                Delete Product
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}