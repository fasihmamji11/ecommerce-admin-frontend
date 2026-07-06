// import React, { useState, useEffect } from "react";
// import "../styles/Products.css";

// type Product = {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
//   description: string;
//   images: string[];
// };

// export default function Products() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState<"add" | "edit" | "bulk">("add");
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [formData, setFormData] = useState<Partial<Product>>({});
//   const [images, setImages] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);


//   //const categories = ["Electronics", "Fashion", "Home & Kitchen", "Beauty"];

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/api/categories")
//     .then((res) => res.json())
//     .then((data) => {
//       const categoryNames = data.map((cat: any) => cat.name); 
//       setCategories(categoryNames);
//     });

//   }, []);

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/api/products")
//       .then((res) => res.json())
//       .then((data) => {
//         const formatted = data.map((p: any) => ({
//           id: Number(p.id), // ✅ cast to number
//           name: p.title,
//           category: p.category,
//           price: Number(p.price),
//           stock: p.stock,
//           description: p.description,
//           images: Array.isArray(p.images) ? p.images : [],
//         }));

//         setProducts(formatted); // only call once
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//       });
//   }, []);
//   function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
//     const files = Array.from(e.target.files || []);

//     setImageFiles((prev) => [...prev, ...files]);

//     const previews = files.map((file) => URL.createObjectURL(file));

//     setImages((prev) => [...prev, ...previews]);
//   }

//   function openAddModal() {
//     setModalType("add");
//     setFormData({ category: "Electronics" }); // 🔥 FIX HERE
//     setImages([]);
//     setSelectedProduct(null);
//     setShowModal(true);
//   }

//   function openEditModal(product: Product) {
//   setModalType("edit");

//   setFormData({
//     name: product.name || "",
//     category: product.category || "",
//     price: product.price || 0,
//     stock: product.stock || 0,
//     description: product.description || "",
//   });

//   setImages(Array.isArray(product.images) ? product.images : []);

//   setSelectedProduct(product);
//   setShowModal(true);
// }

//   function openBulkModal() {
//     setModalType("bulk");
//     setShowModal(true);
//   }

//   function handleInputChange(field: keyof Product, value: any) {
//     setFormData({ ...formData, [field]: value });
//   }

//   async function handleSaveProduct() {
//     const formDataToSend = new FormData();

//     formDataToSend.append("name", formData.name || "");
//     formDataToSend.append("category", formData.category || "");
//     formDataToSend.append("price", String(formData.price || 0));
//     formDataToSend.append("stock", String(formData.stock || 0));
//     formDataToSend.append("description", formData.description || "");

//     imageFiles.forEach((file) => {
//       formDataToSend.append("images", file);
//     });

//     let url = "http://localhost:5000/api/products";
//     let method = "POST";

//     // 🔥 EDIT MODE FIX
//     if (modalType === "edit" && selectedProduct) {
//       url = `http://localhost:5000/api/products/${selectedProduct.id}`;
//       method = "PUT"; // or PATCH (backend pe depend)

//       formDataToSend.append("id", String(selectedProduct.id));
//     }

//     const res = await fetch(url, {
//       method,
//       body: formDataToSend,
//     });

//     const data = await res.json();

//     if (modalType === "add") {
// setProducts((prev) => [
//   ...prev,
//   {
//     id: data.id,
//     name: formData.name || "",
//     category: formData.category || "Electronics",
//     price: Number(formData.price || 0),
//     stock: Number(formData.stock || 0),
//     description: formData.description || "",
//     images: data.images || images,
//   },
// ]);    } else {
//       // 🔥 update existing product
//       setProducts((prev) =>
//         prev.map((p) => (p.id === selectedProduct?.id ? data : p)),
//       );
//     }

//     setShowModal(false);
//     setImageFiles([]);
//     setImages([]);
//     setSelectedProduct(null);
//   }
//   async function handleDeleteProduct(id: number) {
//     if (!window.confirm("Are you sure you want to delete this product?"))
//       return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/products/${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error("Delete failed");

//       // Filter out deleted product from state
//       setProducts(products.filter((p) => p.id !== id));
//       alert("Product deleted successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   }

//   const filteredProducts = products.filter((p) => {
//     const name = (p.name ?? "").toString().toLowerCase();

//     const matchesSearch = name.includes((searchTerm ?? "").toLowerCase());

//     const matchesCategory =
//       filterCategory === "all" || p.category === filterCategory;

//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="products-page">
//       {/* PAGE HEADER */}
//       <div className="page-header">
//         <div>
//           <h2>Products</h2>
//           <p>Manage your store products, upload items and edit details</p>
//         </div>
//         <div className="header-actions">
//           <button className="action-btn primary" onClick={openAddModal}>
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <line x1="12" y1="5" x2="12" y2="19"></line>
//               <line x1="5" y1="12" x2="19" y2="12"></line>
//             </svg>
//             Add Product
//           </button>
//           <button className="action-btn secondary" onClick={openBulkModal}>
//             <svg
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//               <polyline points="17 8 12 3 7 8"></polyline>
//               <line x1="12" y1="3" x2="12" y2="15"></line>
//             </svg>
//             Bulk Upload
//           </button>
//         </div>
//       </div>

//       {/* FILTERS */}
//       <div className="filters">
//         <div className="search-box">
//           <svg
//             className="search-icon"
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <circle cx="11" cy="11" r="8"></circle>
//             <path d="m21 21-4.35-4.35"></path>
//           </svg>
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//         >
//           <option value="all">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* PRODUCTS TABLE */}
//       <div className="card products-table-card">
//         <table className="products-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Product Name</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((product) => (
//               <tr key={product.id}>
//                 <td>
//                   <div className="product-image">
//                     <img
//                       src={
//                         product.images[0] || "https://via.placeholder.com/50"
//                       }
//                       alt={product.name}
//                     />
//                   </div>
//                 </td>
//                 <td className="product-name">{product.name}</td>
//                 <td>
//                   <span className="category-badge">{product.category}</span>
//                 </td>
//                 <td className="product-price">
//                   ${Number(product.price || 0).toFixed(2)}
//                 </td>
//                 <td>
//                   <span
//                     className={`stock-badge ${product.stock < 50 ? "low" : ""}`}
//                   >
//                     {product.stock}
//                   </span>
//                 </td>
//                 <td className="actions">
//                   <button
//                     className="edit-btn"
//                     onClick={() => openEditModal(product)}
//                   >
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//                       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
//                     </svg>
//                     Edit
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => handleDeleteProduct(product.id)}
//                   >
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <polyline points="3 6 5 6 21 6"></polyline>
//                       <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//                     </svg>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="product-modal">
//           <div className="product-modal-content">
//             <div className="modal-header">
//               <h3>
//                 {modalType === "add" && "Add New Product"}
//                 {modalType === "edit" && "Edit Product"}
//                 {modalType === "bulk" && "Bulk Upload Products"}
//               </h3>
//               <button className="close-btn" onClick={() => setShowModal(false)}>
//                 ×
//               </button>
//             </div>

//             <div className="modal-body">
//               {modalType === "bulk" ? (
//                 <>
//                   <p className="info-text">
//                     Upload a CSV file with product details. Download the
//                     template below to see the required format.
//                   </p>
//                   <div className="bulk-upload-section">
//                     <label className="upload-btn">
//                       <svg
//                         width="20"
//                         height="20"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//                         <polyline points="17 8 12 3 7 8"></polyline>
//                         <line x1="12" y1="3" x2="12" y2="15"></line>
//                       </svg>
//                       Choose CSV File
//                       <input type="file" accept=".csv" />
//                     </label>
//                     <button className="download-template-btn">
//                       <svg
//                         width="18"
//                         height="18"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//                         <polyline points="7 10 12 15 17 10"></polyline>
//                         <line x1="12" y1="15" x2="12" y2="3"></line>
//                       </svg>
//                       Download Template
//                     </button>
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       className="save-btn"
//                       onClick={() => setShowModal(false)}
//                     >
//                       Upload Products
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <h4 className="section-title">Product Information</h4>
//                   <div className="form-grid">
//                     <div className="form-group">
//                       <label>Product Name</label>
//                       <input
//                         type="text"
//                         placeholder="Enter product name"
//                         value={formData.name || ""}
//                         onChange={(e) =>
//                           handleInputChange("name", e.target.value)
//                         }
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label>Category</label>
//                       <select
//                         value={formData.category?.trim() || ""}
//                         onChange={(e) =>
//                           handleInputChange("category", e.target.value)
//                         }
//                       >
//                         {categories.map((cat) => (
//                           <option key={cat} value={cat}>
//                             {cat}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="form-group">
//                       <label>Price ($)</label>
//                       <input
//                         type="number"
//                         placeholder="0.00"
//                         value={formData.price || ""}
//                         onChange={(e) =>
//                           handleInputChange("price", Number(e.target.value))
//                         }
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label>Stock Quantity</label>
//                       <input
//                         type="number"
//                         placeholder="0"
//                         value={formData.stock || ""}
//                         onChange={(e) =>
//                           handleInputChange("stock", Number(e.target.value))
//                         }
//                       />
//                     </div>
//                     <div className="form-group full-width">
//                       <label>Description</label>
//                       <textarea
//                         placeholder="Enter product description"
//                         value={formData.description || ""}
//                         onChange={(e) =>
//                           handleInputChange("description", e.target.value)
//                         }
//                       />
//                     </div>
//                   </div>

//                   <h4 className="section-title">Product Images</h4>
//                   <div className="image-upload-section">
//                     <label className="upload-btn">
//                       <svg
//                         width="20"
//                         height="20"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <rect
//                           x="3"
//                           y="3"
//                           width="18"
//                           height="18"
//                           rx="2"
//                           ry="2"
//                         ></rect>
//                         <circle cx="8.5" cy="8.5" r="1.5"></circle>
//                         <polyline points="21 15 16 10 5 21"></polyline>
//                       </svg>
//                       Upload Images
//                       <input
//                         type="file"
//                         multiple
//                         onChange={handleImageUpload}
//                       />
//                     </label>
//                     <div className="image-preview-grid">
//                       {images.map((src, i) => (
//                         <div className="img-preview" key={i}>
//                           <img src={src} alt="preview" />
//                           <button
//                             className="remove-img-btn"
//                             onClick={() =>
//                               setImages(images.filter((_, idx) => idx !== i))
//                             }
//                           >
//                             ×
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="modal-footer">
//                     <button className="save-btn" onClick={handleSaveProduct}>
//                       {modalType === "add" ? "Add Product" : "Save Changes"}
//                     </button>
//                     {modalType === "edit" && selectedProduct && (
//                       <button
//                         className="delete-btn"
//                         onClick={() => {
//                           handleDeleteProduct(Number(selectedProduct.id));
//                           setShowModal(false);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect, useCallback } from 'react'
import '../styles/Products.css'
import { productService } from '../services/product.service'
import { categoryService } from '../services/catergory.service'

/* ─────────────────────────────────────
   Types
───────────────────────────────────── */
type Product = {
  id: number
  title: string
  category: string
  price: number
  stock: number
  description: string
  images: string[]
}

/* ─────────────────────────────────────
   Helpers
───────────────────────────────────── */
function getFirstImage(images: string[]): string {
  return images?.[0] ?? ''
}

function stockLevel(stock: number): 'ok' | 'low' | 'out' {
  if (stock === 0) return 'out'
  if (stock < 50) return 'low'
  return 'ok'
}

/* ─────────────────────────────────────
   Sub-components
───────────────────────────────────── */
const StockBadge: React.FC<{ stock: number }> = ({ stock }) => {
  const level = stockLevel(stock)
  return (
    <span className={`pr-stock pr-stock--${level}`}>
      {stock}
      {level === 'out' && ' · Out'}
      {level === 'low' && ' · Low'}
    </span>
  )
}

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <tr>
    <td colSpan={6} className="pr-empty">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p>{message}</p>
    </td>
  </tr>
)

/* ─────────────────────────────────────
   Main component
───────────────────────────────────── */
export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'add' | 'edit' | 'bulk'>('add')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({})
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  /* ── Toast auto-dismiss ── */
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(t)
  }, [toast])

  /* ── Load data ── */
  const loadProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await productService.getProducts()
      const formatted: Product[] = data.map((p: any) => ({
        id: Number(p.id),
        title: p.title ?? p.title ?? '',
        category: p.category ?? '',
        price: Number(p.price ?? 0),
        stock: Number(p.stock ?? 0),
        description: p.description ?? '',
        images: Array.isArray(p.images) ? p.images : [],
      }))
      setProducts(formatted)
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to load products', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadProducts() }, [loadProducts])

  // useEffect(() => {
  //   categoryService.getCategories()
  //     .then((data: any[]) => setCategories(data.map(c => c.name)))
  //     .catch(console.error)
  // }, [])
  useEffect(() => {
    categoryService.getCategories()
      .then((data: any[]) =>
        setCategories(
          data
            .filter(c => Number(c.status) === 1)
            .map(c => c.name)
        )
      )
      .catch(console.error)
  }, [])

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

  /* ── Image upload ── */
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    imagePreviews.forEach(url => { if (url.startsWith('blob:')) URL.revokeObjectURL(url) })
    setImageFiles(files)
    setImagePreviews(files.map(f => URL.createObjectURL(f)))
  }

  function removeImage(idx: number) {
    const url = imagePreviews[idx]
    if (url?.startsWith('blob:')) URL.revokeObjectURL(url)
    setImagePreviews(p => p.filter((_, i) => i !== idx))
    setImageFiles(p => p.filter((_, i) => i !== idx))
  }

  /* ── Modal helpers ── */
  function resetForm() {
    imagePreviews.forEach(url => { if (url.startsWith('blob:')) URL.revokeObjectURL(url) })
    setFormData({ category: categories[0] ?? '' })
    setImagePreviews([])
    setImageFiles([])
    setSelectedProduct(null)
    setCsvFile(null)
  }

  function openAddModal() {
    resetForm()
    setModalType('add')
    setShowModal(true)
  }

  function openEditModal(product: Product) {
    resetForm()
    setModalType('edit')
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
    })
    setImagePreviews(product.images ?? [])
    setSelectedProduct(product)
    setShowModal(true)
  }

  function openBulkModal() {
    resetForm()
    setModalType('bulk')
    setShowModal(true)
  }

  function handleInput(field: keyof Product, value: unknown) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  /* ── Save ── */
  async function handleSave() {
    if (!formData.title?.trim()) { setToast({ msg: 'Product name is required', type: 'error' }); return }
    if (!formData.price || formData.price <= 0) { setToast({ msg: 'Enter a valid price', type: 'error' }); return }

    setSaving(true)
    try {
      const payload = new FormData()
      payload.append('title', formData.title ?? '')
      payload.append('category', formData.category ?? '')
      payload.append('price', String(formData.price ?? 0))
      payload.append('stock', String(formData.stock ?? 0))
      payload.append('description', formData.description ?? '')
      imageFiles.forEach(f => payload.append('images', f))


      console.log('Saving product with data:', payload);

      if (modalType === 'add') {
        const data = await productService.createProduct(payload)
        setProducts(prev => [...prev, {
          id: data.id,
          title: formData.title ?? '',
          category: formData.category ?? '',
          price: Number(formData.price ?? 0),
          stock: Number(formData.stock ?? 0),
          description: formData.description ?? '',
          images: data.images ?? imagePreviews,
        }])
        setToast({ msg: 'Product added successfully', type: 'success' })
      } else if (modalType === 'edit' && selectedProduct) {
        payload.append('id', String(selectedProduct.id))
        const data = await productService.updateProduct(selectedProduct.id, payload)
        setProducts(prev => prev.map(p => p.id === selectedProduct.id ? {
          ...p,
          title: formData.title ?? p.title,
          category: formData.category ?? p.category,
          price: Number(formData.price ?? p.price),
          stock: Number(formData.stock ?? p.stock),
          description: formData.description ?? p.description,
          images: data.images ?? p.images,
        } : p))
        setToast({ msg: 'Product updated', type: 'success' })
      }

      setShowModal(false)
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to save product', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  /* ── Delete ── */
  async function handleDelete(id: number) {
    if (!window.confirm('Delete this product? This cannot be undone.')) return
    try {
      await productService.deleteProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      setToast({ msg: 'Product deleted', type: 'success' })
      setShowModal(false)
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to delete product', type: 'error' })
    }
  }

  /* ── Filtered list ── */
  const filtered = products.filter(p => {
    const matchName = (p.title ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchCat = filterCategory === 'all' || p.category === filterCategory
    return matchName && matchCat
  })

  /* ── Stats ── */
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0)
  const lowStockCount = products.filter(p => stockLevel(p.stock) !== 'ok').length

  /* ─────────────────────────────────────
     Render
  ───────────────────────────────────── */
  return (
    <div className="pr-page">

      {/* ── Toast ── */}
      {toast && (
        <div className={`pr-toast pr-toast--${toast.type}`} role="alert">
          {toast.type === 'success'
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          }
          {toast.msg}
        </div>
      )}

      {/* ── Page header ── */}
      <div className="pr-header">
        <div className="pr-header-text">
          <h2>Products</h2>
          <p>Manage your store catalogue, pricing and inventory</p>
        </div>
        <div className="pr-header-actions">
          <button className="pr-btn pr-btn--primary" onClick={openAddModal}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add Product
          </button>
          <button className="pr-btn pr-btn--secondary" onClick={openBulkModal}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            Bulk Upload
          </button>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="pr-stats">
        <div className="pr-stat">
          <span className="pr-stat-val">{products.length}</span>
          <span className="pr-stat-lbl">Total Products</span>
        </div>
        <div className="pr-stat-divider" />
        <div className="pr-stat">
          <span className="pr-stat-val">${(totalValue / 1000).toFixed(1)}k</span>
          <span className="pr-stat-lbl">Inventory Value</span>
        </div>
        <div className="pr-stat-divider" />
        <div className="pr-stat">
          <span className="pr-stat-val">{categories.length}</span>
          <span className="pr-stat-lbl">Categories</span>
        </div>
        <div className="pr-stat-divider" />
        <div className="pr-stat">
          <span className="pr-stat-val pr-stat-val--warn">{lowStockCount}</span>
          <span className="pr-stat-lbl">Low / Out of Stock</span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="pr-filters">
        <div className="pr-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input
            type="search"
            placeholder="Search products…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search products"
          />
        </div>
        <select
          className="pr-select"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* ── Table card ── */}
      <div className="pr-card">
        <div className="pr-table-wrap">
          <table className="pr-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j}><div className="pr-shimmer" style={{ height: 16, borderRadius: 6 }} /></td>
                    ))}
                  </tr>
                ))
                : filtered.length === 0
                  ? <EmptyState message={searchTerm ? 'No products match your search' : 'No products yet. Click "Add Product" to get started.'} />
                  : filtered.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="pr-img-wrap">
                          {getFirstImage(product.images)
                            ? <img
                              src={getFirstImage(product.images)}
                              alt={product.title}
                              onError={e => {
                                (e.currentTarget as HTMLImageElement).src =
                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(product.title)}&background=00c9a7&color=0d1117&size=80`
                              }}
                            />
                            : <span className="pr-img-fallback">{product.title.charAt(0).toUpperCase()}</span>
                          }
                        </div>
                      </td>
                      <td className="pr-td-name">{product.title}</td>
                      <td><span className="pr-cat-badge">{product.category}</span></td>
                      <td className="pr-td-price">${Number(product.price ?? 0).toFixed(2)}</td>
                      <td><StockBadge stock={product.stock} /></td>
                      <td>
                        <div className="pr-actions">
                          <button className="pr-action-btn pr-action-btn--edit" onClick={() => openEditModal(product)} aria-label={`Edit ${product.title}`}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                            Edit
                          </button>
                          <button className="pr-action-btn pr-action-btn--delete" onClick={() => handleDelete(product.id)} aria-label={`Delete ${product.title}`}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                            Delete
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
        <div
          className="pr-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}
        >
          <div className="pr-modal">

            {/* Header */}
            <div className="pr-modal-header">
              <div className="pr-modal-title-wrap">
                <div className="pr-modal-icon">
                  {modalType === 'add' && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>}
                  {modalType === 'edit' && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>}
                  {modalType === 'bulk' && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>}
                </div>
                <h3>
                  {modalType === 'add' && 'Add New Product'}
                  {modalType === 'edit' && 'Edit Product'}
                  {modalType === 'bulk' && 'Bulk Upload'}
                </h3>
              </div>
              <button className="pr-close-btn" onClick={() => setShowModal(false)} aria-label="Close">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Body */}
            <div className="pr-modal-body">

              {/* Bulk */}
              {modalType === 'bulk' && (
                <div className="pr-bulk">
                  <p className="pr-info-text">Upload a CSV with columns: name, category, price, stock, description. One product per row.</p>
                  <div className="pr-bulk-actions">
                    <label className="pr-upload-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                      {csvFile ? csvFile.name : 'Choose CSV File'}
                      <input type="file" accept=".csv" onChange={e => setCsvFile(e.target.files?.[0] ?? null)} />
                    </label>
                    <button className="pr-btn pr-btn--secondary">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                      Download Template
                    </button>
                  </div>
                </div>
              )}

              {/* Add / Edit */}
              {(modalType === 'add' || modalType === 'edit') && (
                <>
                  {/* Section: Product info */}
                  <div className="pr-section">
                    <div className="pr-section-title">
                      <span className="pr-section-bar" />
                      Product Information
                    </div>
                    <div className="pr-form-grid">
                      <div className="pr-field">
                        <label htmlFor="pr-name">Name <span className="pr-required">*</span></label>
                        <input
                          id="pr-name"
                          type="text"
                          placeholder="e.g. Wireless Headphones"
                          value={formData.title ?? ''}
                          onChange={e => handleInput('title', e.target.value)}
                        />
                      </div>
                      <div className="pr-field">
                        <label htmlFor="pr-category">Category</label>
                        <select
                          id="pr-category"
                          className="pr-select"
                          value={formData.category ?? ''}
                          onChange={e => handleInput('category', e.target.value)}
                        >
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="pr-field">
                        <label htmlFor="pr-price">Price ($) <span className="pr-required">*</span></label>
                        <input
                          id="pr-price"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.price ?? ''}
                          onChange={e => handleInput('price', Number(e.target.value))}
                        />
                      </div>
                      <div className="pr-field">
                        <label htmlFor="pr-stock">Stock Quantity</label>
                        <input
                          id="pr-stock"
                          type="number"
                          min="0"
                          placeholder="0"
                          value={formData.stock ?? ''}
                          onChange={e => handleInput('stock', Number(e.target.value))}
                        />
                      </div>
                      <div className="pr-field pr-field--full">
                        <label htmlFor="pr-desc">Description</label>
                        <textarea
                          id="pr-desc"
                          placeholder="Describe this product…"
                          value={formData.description ?? ''}
                          onChange={e => handleInput('description', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section: Images */}
                  <div className="pr-section">
                    <div className="pr-section-title">
                      <span className="pr-section-bar" />
                      Product Images
                    </div>
                    <div className="pr-image-area">
                      {imagePreviews.length > 0 && (
                        <div className="pr-previews">
                          {imagePreviews.map((url, i) => (
                            <div key={i} className="pr-preview">
                              <img
                                src={url}
                                alt={`preview ${i + 1}`}
                                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                              />
                              <button className="pr-remove-img" onClick={() => removeImage(i)} aria-label="Remove image">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <label className="pr-upload-label">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                        {imagePreviews.length ? 'Change Images' : 'Upload Images'}
                        <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="pr-modal-footer">
              <button className="pr-btn pr-btn--ghost" onClick={() => setShowModal(false)}>Cancel</button>
              {modalType === 'bulk' && (
                <button className="pr-btn pr-btn--primary" disabled={!csvFile}>Upload CSV</button>
              )}
              {(modalType === 'add' || modalType === 'edit') && (
                <>
                  {modalType === 'edit' && selectedProduct && (
                    <button className="pr-btn pr-btn--danger" onClick={() => handleDelete(selectedProduct.id)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                      Delete
                    </button>
                  )}
                  <button className="pr-btn pr-btn--primary" onClick={handleSave} disabled={saving}>
                    {saving
                      ? <><span className="pr-spinner" />Saving…</>
                      : modalType === 'add' ? 'Add Product' : 'Save Changes'
                    }
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  )
}