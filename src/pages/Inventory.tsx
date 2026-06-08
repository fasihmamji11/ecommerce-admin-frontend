import { useState } from "react";
import "../styles/Inventory.css";

type Variant = {
    id: string;
    name: string;
    sku: string;
    size?: string;
    color?: string;
    stock: number;
    reorderPoint: number;
    price: number;
    cost: number;
};

type InventoryProduct = {
    id: string;
    name: string;
    category: string;
    totalStock: number;
    reorderLevel: number;
    variants: Variant[];
    lastRestocked: string;
    status: "in-stock" | "low-stock" | "out-of-stock";
    image: string;
};

const dummyInventory: InventoryProduct[] = [
    {
        id: "INV001",
        name: "Wireless Headphones",
        category: "Electronics",
        totalStock: 145,
        reorderLevel: 50,
        lastRestocked: "2025-11-20",
        status: "in-stock",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
        variants: [
            { id: "V001", name: "Black - Small", sku: "WH-BLK-S", color: "Black", size: "Small", stock: 45, reorderPoint: 15, price: 99.99, cost: 60.00 },
            { id: "V002", name: "Black - Large", sku: "WH-BLK-L", color: "Black", size: "Large", stock: 60, reorderPoint: 20, price: 109.99, cost: 65.00 },
            { id: "V003", name: "White - Small", sku: "WH-WHT-S", color: "White", size: "Small", stock: 40, reorderPoint: 15, price: 99.99, cost: 60.00 },
        ],
    },
    {
        id: "INV002",
        name: "Smart Watch",
        category: "Electronics",
        totalStock: 28,
        reorderLevel: 30,
        lastRestocked: "2025-10-15",
        status: "low-stock",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
        variants: [
            { id: "V004", name: "Silver - 42mm", sku: "SW-SLV-42", color: "Silver", size: "42mm", stock: 15, reorderPoint: 10, price: 249.99, cost: 150.00 },
            { id: "V005", name: "Gold - 44mm", sku: "SW-GLD-44", color: "Gold", size: "44mm", stock: 13, reorderPoint: 10, price: 279.99, cost: 170.00 },
        ],
    },
    {
        id: "INV003",
        name: "Running Shoes",
        category: "Fashion",
        totalStock: 0,
        reorderLevel: 20,
        lastRestocked: "2025-08-10",
        status: "out-of-stock",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
        variants: [
            { id: "V006", name: "Red - Size 9", sku: "RS-RED-9", color: "Red", size: "9", stock: 0, reorderPoint: 5, price: 89.99, cost: 45.00 },
        ],
    },
];

export default function Inventory() {
    const [inventory, setInventory] = useState<InventoryProduct[]>(dummyInventory);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<InventoryProduct | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "in-stock" | "low-stock" | "out-of-stock">("all");
    const [newVariant, setNewVariant] = useState<Partial<Variant>>({});
    const [showAddVariant, setShowAddVariant] = useState(false);

    function openProductModal(product: InventoryProduct) {
        setSelectedProduct(product);
        setEditMode(false);
        setShowAddVariant(false);
        setShowModal(true);
    }

    function handleUpdateVariant(variantId: string, field: keyof Variant, value: any) {
        if (!selectedProduct) return;
        const updatedVariants = selectedProduct.variants.map((v) =>
            v.id === variantId ? { ...v, [field]: value } : v
        );
        const updatedProduct = { ...selectedProduct, variants: updatedVariants };
        updateProductStock(updatedProduct);
        setSelectedProduct(updatedProduct);
    }

    function updateProductStock(product: InventoryProduct) {
        const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
        const status: "in-stock" | "low-stock" | "out-of-stock" =
            totalStock === 0 ? "out-of-stock" : totalStock <= product.reorderLevel ? "low-stock" : "in-stock";
        const updated = { ...product, totalStock, status };
        setInventory(inventory.map((p) => (p.id === product.id ? updated : p)));
        setSelectedProduct(updated);
    }

    function handleAddVariant() {
        if (!selectedProduct || !newVariant.name || !newVariant.sku) return;
        const variant: Variant = {
            id: `V${Date.now()}`,
            name: newVariant.name,
            sku: newVariant.sku,
            size: newVariant.size || "",
            color: newVariant.color || "",
            stock: newVariant.stock || 0,
            reorderPoint: newVariant.reorderPoint || 10,
            price: newVariant.price || 0,
            cost: newVariant.cost || 0,
        };
        const updatedProduct = { ...selectedProduct, variants: [...selectedProduct.variants, variant] };
        updateProductStock(updatedProduct);
        setNewVariant({});
        setShowAddVariant(false);
    }

    function handleDeleteVariant(variantId: string) {
        if (!selectedProduct) return;
        if (window.confirm("Are you sure you want to delete this variant?")) {
            const updatedProduct = {
                ...selectedProduct,
                variants: selectedProduct.variants.filter((v) => v.id !== variantId),
            };
            updateProductStock(updatedProduct);
        }
    }

    function handleBulkStockUpdate(adjustment: number) {
        if (!selectedProduct) return;
        const updatedVariants = selectedProduct.variants.map((v) => ({
            ...v,
            stock: Math.max(0, v.stock + adjustment),
        }));
        const updatedProduct = { ...selectedProduct, variants: updatedVariants };
        updateProductStock(updatedProduct);
    }

    function handleDeleteProduct(id: string) {
        if (window.confirm("Are you sure you want to delete this product from inventory?")) {
            setInventory(inventory.filter((p) => p.id !== id));
            setShowModal(false);
        }
    }

    const filteredInventory = inventory.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || p.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const totalValue = inventory.reduce(
        (sum, p) => sum + p.variants.reduce((vSum, v) => vSum + v.stock * v.cost, 0),
        0
    );

    const lowStockCount = inventory.filter((p) => p.status === "low-stock").length;
    const outOfStockCount = inventory.filter((p) => p.status === "out-of-stock").length;

    return (
        <div className="inventory-page">
            {/* PAGE HEADER */}
            <div className="page-header">
                <div>
                    <h2>Inventory Management</h2>
                    <p>Track stock levels, manage variants and monitor product availability</p>
                </div>
            </div>

            {/* STATS CARDS */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon total-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Total Products</div>
                        <div className="stat-value">{inventory.length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon value-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Inventory Value</div>
                        <div className="stat-value">${totalValue.toFixed(2)}</div>
                    </div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon warning-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Low Stock Items</div>
                        <div className="stat-value">{lowStockCount}</div>
                    </div>
                </div>
                <div className="stat-card danger">
                    <div className="stat-icon danger-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Out of Stock</div>
                        <div className="stat-value">{outOfStockCount}</div>
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
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
                    <option value="all">All Status</option>
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>
            </div>

            {/* INVENTORY TABLE */}
            <div className="card inventory-table-card">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Total Stock</th>
                            <th>Variants</th>
                            <th>Reorder Level</th>
                            <th>Last Restocked</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventory.map((product) => (
                            <tr key={product.id} onClick={() => openProductModal(product)} style={{ cursor: "pointer" }}>
                                <td>
                                    <div className="product-cell">
                                        <img src={product.image} alt={product.name} className="product-img" />
                                        <span className="product-name">{product.name}</span>
                                    </div>
                                </td>
                                <td>{product.category}</td>
                                <td className="stock-cell">{product.totalStock}</td>
                                <td className="text-center">{product.variants.length}</td>
                                <td>{product.reorderLevel}</td>
                                <td>{new Date(product.lastRestocked).toLocaleDateString()}</td>
                                <td>
                                    <span className={`status-badge ${product.status}`}>
                                        {product.status.replace("-", " ")}
                                    </span>
                                </td>
                                <td className="actions" onClick={(e) => e.stopPropagation()}>
                                    <button className="manage-btn" onClick={() => openProductModal(product)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="3"></circle>
                                            <path d="M12 1v6m0 6v6"></path>
                                        </svg>
                                        Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* INVENTORY MODAL */}
            {showModal && selectedProduct && (
                <div className="inventory-modal">
                    <div className="inventory-modal-content">
                        <div className="modal-header">
                            <div className="header-left">
                                <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-product-img" />
                                <div>
                                    <h3>{selectedProduct.name}</h3>
                                    <span className="modal-category">{selectedProduct.category}</span>
                                </div>
                            </div>
                            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                        </div>

                        <div className="modal-body">
                            {/* Inventory Overview */}
                            <div className="inventory-overview">
                                <div className="overview-item">
                                    <div className="overview-label">Total Stock</div>
                                    <div className="overview-value">{selectedProduct.totalStock}</div>
                                </div>
                                <div className="overview-item">
                                    <div className="overview-label">Variants</div>
                                    <div className="overview-value">{selectedProduct.variants.length}</div>
                                </div>
                                <div className="overview-item">
                                    <div className="overview-label">Reorder Level</div>
                                    <div className="overview-value">{selectedProduct.reorderLevel}</div>
                                </div>
                                <div className="overview-item">
                                    <div className="overview-label">Status</div>
                                    <span className={`status-badge ${selectedProduct.status}`}>
                                        {selectedProduct.status.replace("-", " ")}
                                    </span>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="quick-actions">
                                <button className="quick-action-btn" onClick={() => handleBulkStockUpdate(10)}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add 10 to All
                                </button>
                                <button className="quick-action-btn" onClick={() => handleBulkStockUpdate(-10)}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Remove 10 from All
                                </button>
                                <button className="quick-action-btn primary" onClick={() => setShowAddVariant(!showAddVariant)}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add Variant
                                </button>
                            </div>

                            {/* Add Variant Form */}
                            {showAddVariant && (
                                <div className="add-variant-form">
                                    <h4 className="section-title">Add New Variant</h4>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Variant Name</label>
                                            <input type="text" placeholder="e.g. Black - Large" value={newVariant.name || ""} onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>SKU</label>
                                            <input type="text" placeholder="e.g. PRD-BLK-L" value={newVariant.sku || ""} onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Color</label>
                                            <input type="text" placeholder="e.g. Black" value={newVariant.color || ""} onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Size</label>
                                            <input type="text" placeholder="e.g. Large" value={newVariant.size || ""} onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Initial Stock</label>
                                            <input type="number" placeholder="0" value={newVariant.stock || ""} onChange={(e) => setNewVariant({ ...newVariant, stock: Number(e.target.value) })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Reorder Point</label>
                                            <input type="number" placeholder="10" value={newVariant.reorderPoint || ""} onChange={(e) => setNewVariant({ ...newVariant, reorderPoint: Number(e.target.value) })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Price ($)</label>
                                            <input type="number" placeholder="0.00" value={newVariant.price || ""} onChange={(e) => setNewVariant({ ...newVariant, price: Number(e.target.value) })} />
                                        </div>
                                        <div className="form-group">
                                            <label>Cost ($)</label>
                                            <input type="number" placeholder="0.00" value={newVariant.cost || ""} onChange={(e) => setNewVariant({ ...newVariant, cost: Number(e.target.value) })} />
                                        </div>
                                    </div>
                                    <div className="form-actions">
                                        <button className="save-btn" onClick={handleAddVariant}>Add Variant</button>
                                        <button className="cancel-btn" onClick={() => { setShowAddVariant(false); setNewVariant({}); }}>Cancel</button>
                                    </div>
                                </div>
                            )}

                            {/* Variants Table */}
                            <h4 className="section-title">Product Variants</h4>
                            <div className="variants-table-wrapper">
                                <table className="variants-table">
                                    <thead>
                                        <tr>
                                            <th>Variant</th>
                                            <th>SKU</th>
                                            <th>Stock</th>
                                            <th>Reorder</th>
                                            <th>Price</th>
                                            <th>Cost</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedProduct.variants.map((variant) => (
                                            <tr key={variant.id}>
                                                <td>
                                                    <div className="variant-name">
                                                        {variant.name}
                                                        {variant.color && <span className="variant-tag">{variant.color}</span>}
                                                        {variant.size && <span className="variant-tag">{variant.size}</span>}
                                                    </div>
                                                </td>
                                                <td className="sku-cell">{variant.sku}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="stock-input"
                                                        value={variant.stock}
                                                        onChange={(e) => handleUpdateVariant(variant.id, "stock", Number(e.target.value))}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="stock-input"
                                                        value={variant.reorderPoint}
                                                        onChange={(e) => handleUpdateVariant(variant.id, "reorderPoint", Number(e.target.value))}
                                                    />
                                                </td>
                                                <td className="price-cell">${variant.price}</td>
                                                <td className="cost-cell">${variant.cost}</td>
                                                <td>
                                                    <button className="delete-variant-btn" onClick={() => handleDeleteVariant(variant.id)}>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="delete-btn" onClick={() => handleDeleteProduct(selectedProduct.id)}>
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}