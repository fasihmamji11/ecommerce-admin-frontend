import React, { useState } from "react";
import "../styles/Categories.css";

type SubCategory = {
    id: string;
    name: string;
    slug: string;
};

type Category = {
    id: string;
    name: string;
    slug: string;
    description: string;
    status: "active" | "inactive";
    image: string;
    subcategories: SubCategory[];
};

const dummyCategories: Category[] = [
    {
        id: "C001",
        name: "Electronics",
        slug: "electronics",
        description: "Electronic devices and gadgets",
        status: "active",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
        subcategories: [
            { id: "SC001", name: "Smartphones", slug: "smartphones" },
            { id: "SC002", name: "Laptops", slug: "laptops" },
        ],
    },
    {
        id: "C002",
        name: "Fashion",
        slug: "fashion",
        description: "Clothing, shoes, and accessories",
        status: "active",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop",
        subcategories: [
            { id: "SC003", name: "Men's Clothing", slug: "mens-clothing" },
            { id: "SC004", name: "Women's Clothing", slug: "womens-clothing" },
        ],
    },
    {
        id: "C003",
        name: "Home & Kitchen",
        slug: "home-kitchen",
        description: "Home decor and kitchen essentials",
        status: "inactive",
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
        subcategories: [],
    },
];

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>(dummyCategories);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"add" | "edit" | "bulk">("add");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState<Partial<Category>>({});
    const [image, setImage] = useState<string>("");
    const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
    const [newSubcategoryName, setNewSubcategoryName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

    function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) setImage(URL.createObjectURL(file));
    }

    function openAddModal() {
        setModalType("add");
        setFormData({ status: "active" });
        setImage("");
        setSubcategories([]);
        setSelectedCategory(null);
        setShowModal(true);
    }

    function openEditModal(category: Category) {
        setModalType("edit");
        setFormData(category);
        setImage(category.image);
        setSubcategories(category.subcategories);
        setSelectedCategory(category);
        setShowModal(true);
    }

    function openBulkModal() {
        setModalType("bulk");
        setShowModal(true);
    }

    function handleInputChange(field: keyof Category, value: any) {
        setFormData({ ...formData, [field]: value });
    }

    function handleAddSubcategory() {
        if (newSubcategoryName.trim()) {
            const newSubcat: SubCategory = {
                id: `SC${Date.now()}`,
                name: newSubcategoryName,
                slug: newSubcategoryName.toLowerCase().replace(/\s+/g, "-"),
            };
            setSubcategories([...subcategories, newSubcat]);
            setNewSubcategoryName("");
        }
    }

    function handleRemoveSubcategory(id: string) {
        setSubcategories(subcategories.filter((sc) => sc.id !== id));
    }

    function handleSaveCategory() {
        if (modalType === "add") {
            const newCategory: Category = {
                id: `C${(categories.length + 1).toString().padStart(3, "0")}`,
                name: formData.name || "",
                slug: formData.slug || "",
                description: formData.description || "",
                status: (formData.status as "active" | "inactive") || "active",
                image: image,
                subcategories: subcategories,
            };
            setCategories([...categories, newCategory]);
        } else if (modalType === "edit" && selectedCategory) {
            setCategories(
                categories.map((c) =>
                    c.id === selectedCategory.id
                        ? { ...selectedCategory, ...formData, image, subcategories }
                        : c
                )
            );
        }
        setShowModal(false);
    }

    function handleDeleteCategory(id: string) {
        if (window.confirm("Are you sure you want to delete this category?")) {
            setCategories(categories.filter((c) => c.id !== id));
            setShowModal(false);
        }
    }

    const filteredCategories = categories.filter((c) => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || c.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="categories-page">
            {/* PAGE HEADER */}
            <div className="page-header">
                <div>
                    <h2>Categories</h2>
                    <p>Manage your store categories, subcategories and organize products</p>
                </div>
                <div className="header-actions">
                    <button className="action-btn primary" onClick={openAddModal}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Category
                    </button>
                    <button className="action-btn secondary" onClick={openBulkModal}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        Bulk Upload
                    </button>
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
                        placeholder="Search categories..."
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

            {/* CATEGORIES TABLE */}
            <div className="card categories-table-card">
                <table className="categories-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Category Name</th>
                            <th>Slug</th>
                            <th>Subcategories</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category) => (
                            <tr key={category.id}>
                                <td>
                                    <div className="category-image">
                                        <img src={category.image || "https://via.placeholder.com/50"} alt={category.name} />
                                    </div>
                                </td>
                                <td className="category-name">{category.name}</td>
                                <td className="category-slug">{category.slug}</td>
                                <td>
                                    <span className="subcategory-count">
                                        {category.subcategories.length} subcategories
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${category.status}`}>
                                        {category.status}
                                    </span>
                                </td>
                                <td className="actions">
                                    <button className="edit-btn" onClick={() => openEditModal(category)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                        Edit
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDeleteCategory(category.id)}>
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

            {/* MODAL */}
            {showModal && (
                <div className="category-modal">
                    <div className="category-modal-content">
                        <div className="modal-header">
                            <h3>
                                {modalType === "add" && "Add New Category"}
                                {modalType === "edit" && "Edit Category"}
                                {modalType === "bulk" && "Bulk Upload Categories"}
                            </h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                        </div>

                        <div className="modal-body">
                            {modalType === "bulk" ? (
                                <>
                                    <p className="info-text">
                                        Upload a CSV file with category details. Download the template below to see the required format.
                                    </p>
                                    <div className="bulk-upload-section">
                                        <label className="upload-btn">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="17 8 12 3 7 8"></polyline>
                                                <line x1="12" y1="3" x2="12" y2="15"></line>
                                            </svg>
                                            Choose CSV File
                                            <input type="file" accept=".csv" />
                                        </label>
                                        <button className="download-template-btn">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                            </svg>
                                            Download Template
                                        </button>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="save-btn" onClick={() => setShowModal(false)}>Upload Categories</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h4 className="section-title">Category Information</h4>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Category Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter category name"
                                                value={formData.name || ""}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Slug</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. electronics"
                                                value={formData.slug || ""}
                                                onChange={(e) => handleInputChange("slug", e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select
                                                value={formData.status || "active"}
                                                onChange={(e) => handleInputChange("status", e.target.value)}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Description</label>
                                            <textarea
                                                placeholder="Enter category description"
                                                value={formData.description || ""}
                                                onChange={(e) => handleInputChange("description", e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <h4 className="section-title">Category Image</h4>
                                    <div className="image-upload-section">
                                        <label className="upload-btn">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                                <polyline points="21 15 16 10 5 21"></polyline>
                                            </svg>
                                            Upload Image
                                            <input type="file" accept="image/*" onChange={handleImageUpload} />
                                        </label>
                                        {image && (
                                            <div className="image-preview">
                                                <img src={image} alt="preview" />
                                                <button className="remove-img-btn" onClick={() => setImage("")}>×</button>
                                            </div>
                                        )}
                                    </div>

                                    <h4 className="section-title">Subcategories</h4>
                                    <div className="subcategory-section">
                                        <div className="subcategory-input">
                                            <input
                                                type="text"
                                                placeholder="Enter subcategory name"
                                                value={newSubcategoryName}
                                                onChange={(e) => setNewSubcategoryName(e.target.value)}
                                            />
                                            <button className="add-subcategory-btn" onClick={handleAddSubcategory}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                </svg>
                                                Add
                                            </button>
                                        </div>
                                        <div className="subcategory-list">
                                            {subcategories.map((sc) => (
                                                <div key={sc.id} className="subcategory-item">
                                                    <span>{sc.name}</span>
                                                    <button onClick={() => handleRemoveSubcategory(sc.id)}>×</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button className="save-btn" onClick={handleSaveCategory}>
                                            {modalType === "add" ? "Add Category" : "Save Changes"}
                                        </button>
                                        {modalType === "edit" && (
                                            <button className="delete-btn" onClick={() => handleDeleteCategory(selectedCategory!.id)}>
                                                Delete Category
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}