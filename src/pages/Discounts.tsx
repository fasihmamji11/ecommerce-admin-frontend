import { useState } from "react";
import "../styles/Discounts.css";

type Discount = {
    id: string;
    name: string;
    type: "percentage" | "fixed";
    value: number;
    target: "product" | "category" | "subcategory";
    targetName: string;
    usageLimit: number;
    used: number;
    startDate: string;
    endDate: string;
};

const dummyDiscounts: Discount[] = [
    {
        id: "DISC001",
        name: "Winter Sale",
        type: "percentage",
        value: 15,
        target: "category",
        targetName: "Electronics",
        usageLimit: 100,
        used: 45,
        startDate: "2025-12-01",
        endDate: "2025-12-31",
    },
    {
        id: "DISC002",
        name: "Phone Discount",
        type: "fixed",
        value: 50,
        target: "product",
        targetName: "iPhone 14",
        usageLimit: 50,
        used: 10,
        startDate: "2025-12-05",
        endDate: "2025-12-20",
    },
];

export default function Discounts() {
    const [discounts, setDiscounts] = useState<Discount[]>(dummyDiscounts);
    const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<Partial<Discount>>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTarget, setFilterTarget] = useState<"all" | "product" | "category" | "subcategory">("all");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "expired">("all");

    const openModal = (discount?: Discount) => {
        if (discount) {
            setFormData(discount);
            setSelectedDiscount(discount);
        } else {
            setFormData({});
            setSelectedDiscount(null);
        }
        setShowModal(true);
    };

    const handleInputChange = (field: keyof Discount, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSave = () => {
        if (selectedDiscount) {
            setDiscounts((prev) =>
                prev.map((d) => (d.id === selectedDiscount.id ? { ...selectedDiscount, ...formData } as Discount : d))
            );
        } else {
            const newDiscount: Discount = {
                id: `DISC${(discounts.length + 1).toString().padStart(3, "0")}`,
                name: formData.name || "",
                type: formData.type || "percentage",
                value: formData.value || 0,
                target: formData.target || "product",
                targetName: formData.targetName || "",
                usageLimit: formData.usageLimit || 0,
                used: 0,
                startDate: formData.startDate || "",
                endDate: formData.endDate || "",
            };
            setDiscounts((prev) => [newDiscount, ...prev]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this discount?")) {
            setDiscounts((prev) => prev.filter((d) => d.id !== id));
            setSelectedDiscount(null);
            setShowModal(false);
        }
    };

    const filteredDiscounts = discounts.filter((d) => {
        const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTarget = filterTarget === "all" || d.target === filterTarget;
        const today = new Date();
        const endDate = new Date(d.endDate);
        const status = endDate >= today ? "active" : "expired";
        const matchesStatus = filterStatus === "all" || status === filterStatus;
        return matchesSearch && matchesTarget && matchesStatus;
    });

    return (
        <div className="discounts-page">
            <div className="page-header">
                <h2>Discounts</h2>
                <p>Manage all discounts for products, categories, and subcategories.</p>
                <button className="create-btn" onClick={() => openModal()}>Create New Discount</button>
            </div>

            {/* Filters */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search discount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={filterTarget} onChange={(e) => setFilterTarget(e.target.value as any)}>
                    <option value="all">All Targets</option>
                    <option value="product">Product</option>
                    <option value="category">Category</option>
                    <option value="subcategory">Subcategory</option>
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                </select>
            </div>

            <div className="card discounts-card">
                <table className="discounts-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Target</th>
                            <th>Usage</th>
                            <th>Valid Dates</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDiscounts.map((d) => (
                            <tr key={d.id}>
                                <td>{d.name}</td>
                                <td>{d.type === "percentage" ? "%" : "$"}</td>
                                <td>{d.value}</td>
                                <td>{d.targetName} ({d.target})</td>
                                <td>{d.used} / {d.usageLimit}</td>
                                <td>{d.startDate} - {d.endDate}</td>
                                <td className="actions">
                                    <button onClick={() => openModal(d)}>View/Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(d.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="discount-modal">
                    <div className="discount-modal-content">
                        <h3 className="modal-title">{selectedDiscount ? "Edit Discount" : "Create New Discount"}</h3>

                        <div className="modal-section">
                            <label>Discount Name</label>
                            <input
                                type="text"
                                placeholder="Enter discount name"
                                value={formData.name || ""}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                        </div>

                        <div className="modal-section">
                            <label>Discount Type</label>
                            <select
                                value={formData.type || "percentage"}
                                onChange={(e) => handleInputChange("type", e.target.value)}
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed ($)</option>
                            </select>
                        </div>

                        <div className="modal-section">
                            <label>Discount Value</label>
                            <input
                                type="number"
                                placeholder="Enter discount value"
                                value={formData.value || ""}
                                onChange={(e) => handleInputChange("value", Number(e.target.value))}
                            />
                        </div>

                        <div className="modal-section">
                            <label>Target Type</label>
                            <select
                                value={formData.target || "product"}
                                onChange={(e) => handleInputChange("target", e.target.value)}
                            >
                                <option value="product">Product</option>
                                <option value="category">Category</option>
                                <option value="subcategory">Subcategory</option>
                            </select>
                        </div>

                        <div className="modal-section">
                            <label>Target Name</label>
                            <input
                                type="text"
                                placeholder="Enter target name"
                                value={formData.targetName || ""}
                                onChange={(e) => handleInputChange("targetName", e.target.value)}
                            />
                        </div>

                        <div className="modal-section">
                            <label>Usage Limit</label>
                            <input
                                type="number"
                                placeholder="Enter usage limit"
                                value={formData.usageLimit || ""}
                                onChange={(e) => handleInputChange("usageLimit", Number(e.target.value))}
                            />
                        </div>

                        <div className="modal-section date-inputs">
                            <div>
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    value={formData.startDate || ""}
                                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                                />
                            </div>
                            <div>
                                <label>End Date</label>
                                <input
                                    type="date"
                                    value={formData.endDate || ""}
                                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="modal-buttons">
                            <button className="save-btn" onClick={handleSave}>
                                {selectedDiscount ? "Update Discount" : "Create Discount"}
                            </button>
                            <button
                                className="discount-close-icon"
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>
                            {selectedDiscount && (
                                <button className="delete-btn" onClick={() => handleDelete(selectedDiscount.id)}>Delete Discount</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
