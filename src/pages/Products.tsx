import React, { useState, useEffect } from "react";
import "../styles/Products.css";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | "bulk">("add");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [images, setImages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const categories = ["Electronics", "Fashion", "Home & Kitchen", "Beauty"];

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p: any) => ({
          id: Number(p.id), // ✅ cast to number
          name: p.title,
          category: p.category,
          price: Number(p.price),
          stock: p.stock,
          description: p.description,
          images: Array.isArray(p.images) ? p.images : [],
        }));

        setProducts(formatted); // only call once
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);

    setImageFiles((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...previews]);
  }

  function openAddModal() {
    setModalType("add");
    setFormData({ category: "Electronics" }); // 🔥 FIX HERE
    setImages([]);
    setSelectedProduct(null);
    setShowModal(true);
  }

  function openEditModal(product: Product) {
  setModalType("edit");

  setFormData({
    name: product.name || "",
    category: product.category || "Electronics",
    price: product.price || 0,
    stock: product.stock || 0,
    description: product.description || "",
  });

  setImages(Array.isArray(product.images) ? product.images : []);

  setSelectedProduct(product);
  setShowModal(true);
}

  function openBulkModal() {
    setModalType("bulk");
    setShowModal(true);
  }

  function handleInputChange(field: keyof Product, value: any) {
    setFormData({ ...formData, [field]: value });
  }

  async function handleSaveProduct() {
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name || "");
    formDataToSend.append("category", formData.category || "");
    formDataToSend.append("price", String(formData.price || 0));
    formDataToSend.append("stock", String(formData.stock || 0));
    formDataToSend.append("description", formData.description || "");

    imageFiles.forEach((file) => {
      formDataToSend.append("images", file);
    });

    let url = "http://localhost:5000/api/products";
    let method = "POST";

    // 🔥 EDIT MODE FIX
    if (modalType === "edit" && selectedProduct) {
      url = `http://localhost:5000/api/products/${selectedProduct.id}`;
      method = "PUT"; // or PATCH (backend pe depend)

      formDataToSend.append("id", String(selectedProduct.id));
    }

    const res = await fetch(url, {
      method,
      body: formDataToSend,
    });

    const data = await res.json();

    if (modalType === "add") {
setProducts((prev) => [
  ...prev,
  {
    id: data.id,
    name: formData.name || "",
    category: formData.category || "Electronics",
    price: Number(formData.price || 0),
    stock: Number(formData.stock || 0),
    description: formData.description || "",
    images: data.images || images,
  },
]);    } else {
      // 🔥 update existing product
      setProducts((prev) =>
        prev.map((p) => (p.id === selectedProduct?.id ? data : p)),
      );
    }

    setShowModal(false);
    setImageFiles([]);
    setImages([]);
    setSelectedProduct(null);
  }
  async function handleDeleteProduct(id: number) {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      // Filter out deleted product from state
      setProducts(products.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  const filteredProducts = products.filter((p) => {
    const name = (p.name ?? "").toString().toLowerCase();

    const matchesSearch = name.includes((searchTerm ?? "").toLowerCase());

    const matchesCategory =
      filterCategory === "all" || p.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Products</h2>
          <p>Manage your store products, upload items and edit details</p>
        </div>
        <div className="header-actions">
          <button className="action-btn primary" onClick={openAddModal}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Product
          </button>
          <button className="action-btn secondary" onClick={openBulkModal}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
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
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="card products-table-card">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-image">
                    <img
                      src={
                        product.images[0] || "https://via.placeholder.com/50"
                      }
                      alt={product.name}
                    />
                  </div>
                </td>
                <td className="product-name">{product.name}</td>
                <td>
                  <span className="category-badge">{product.category}</span>
                </td>
                <td className="product-price">
                  ${Number(product.price || 0).toFixed(2)}
                </td>
                <td>
                  <span
                    className={`stock-badge ${product.stock < 50 ? "low" : ""}`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(product)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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
        <div className="product-modal">
          <div className="product-modal-content">
            <div className="modal-header">
              <h3>
                {modalType === "add" && "Add New Product"}
                {modalType === "edit" && "Edit Product"}
                {modalType === "bulk" && "Bulk Upload Products"}
              </h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              {modalType === "bulk" ? (
                <>
                  <p className="info-text">
                    Upload a CSV file with product details. Download the
                    template below to see the required format.
                  </p>
                  <div className="bulk-upload-section">
                    <label className="upload-btn">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      Choose CSV File
                      <input type="file" accept=".csv" />
                    </label>
                    <button className="download-template-btn">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Download Template
                    </button>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="save-btn"
                      onClick={() => setShowModal(false)}
                    >
                      Upload Products
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h4 className="section-title">Product Information</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        placeholder="Enter product name"
                        value={formData.name || ""}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={formData.category?.trim() || ""}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Price ($)</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={formData.price || ""}
                        onChange={(e) =>
                          handleInputChange("price", Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Stock Quantity</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={formData.stock || ""}
                        onChange={(e) =>
                          handleInputChange("stock", Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Description</label>
                      <textarea
                        placeholder="Enter product description"
                        value={formData.description || ""}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <h4 className="section-title">Product Images</h4>
                  <div className="image-upload-section">
                    <label className="upload-btn">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      Upload Images
                      <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                      />
                    </label>
                    <div className="image-preview-grid">
                      {images.map((src, i) => (
                        <div className="img-preview" key={i}>
                          <img src={src} alt="preview" />
                          <button
                            className="remove-img-btn"
                            onClick={() =>
                              setImages(images.filter((_, idx) => idx !== i))
                            }
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button className="save-btn" onClick={handleSaveProduct}>
                      {modalType === "add" ? "Add Product" : "Save Changes"}
                    </button>
                    {modalType === "edit" && selectedProduct && (
                      <button
                        className="delete-btn"
                        onClick={() => {
                          handleDeleteProduct(Number(selectedProduct.id));
                          setShowModal(false);
                        }}
                      >
                        Delete
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
