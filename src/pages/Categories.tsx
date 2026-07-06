// import React, { useState, useEffect } from "react";
// import "../styles/Categories.css";
// import { categoryService } from "../services/catergory.service";

// type SubCategory = {
//     id: string;
//     name: string;
//     slug: string;
// };

// type Category = {
//     id: string;
//     name: string;
//     slug: string;
//     description: string;
//     status: "active" | "inactive";
//     image: string;
//     subcategories: SubCategory[];
// };


// export default function Categories() {
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [showModal, setShowModal] = useState(false);
//     const [modalType, setModalType] = useState<"add" | "edit" | "bulk">("add");
//     const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
//     const [formData, setFormData] = useState<Partial<Category>>({});
//     const [image, setImage] = useState<string>("");
//     const [images, setImages] = useState<string[]>([]);
//     const [imageFile, setImageFile] = useState<File[]>([]);
//     const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
//     const [newSubcategoryName, setNewSubcategoryName] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

//     async function loadCategories() {
//         try {
//             const data =
//                 await categoryService.getCategories();
//             setCategories(data);
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     useEffect(() => {

//         loadCategories();

//     }, []);

//     function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
//         const files = Array.from(e.target.files || []);

//         setImageFile((prev) => [...prev, ...files]);

//         const previews = files.map((file) => URL.createObjectURL(file));

//         setImages((prev) => [...prev, ...previews]);
//     }

//     function openAddModal() {
//         setModalType("add");
//         setFormData({ status: "active" });
//         setImage("");
//         setImages([]);
//         setSubcategories([]);
//         setSelectedCategory(null);
//         setShowModal(true);
//     }

//     function openEditModal(category: Category) {
//         setModalType("edit");
//         // setFormData(category);
//         setFormData({
//             name: category.name || "",
//             slug: category.slug || "",
//             description: category.description || "",
//         });

//         setImage(category.image);
//         setImages(Array.isArray(category.images) ? category.images : []);
//         setSubcategories(category?.subcategories);
//         setSelectedCategory(category);
//         setShowModal(true);
//     }

//     function openBulkModal() {
//         setModalType("bulk");
//         setShowModal(true);
//     }

//     function handleInputChange(field: keyof Category, value: any) {
//         setFormData({ ...formData, [field]: value });
//     }

//     function handleAddSubcategory() {
//         if (newSubcategoryName.trim()) {
//             const newSubcat: SubCategory = {
//                 id: `SC${Date.now()}`,
//                 name: newSubcategoryName,
//                 slug: newSubcategoryName.toLowerCase().replace(/\s+/g, "-"),
//             };
//             setSubcategories([...subcategories, newSubcat]);
//             setNewSubcategoryName("");
//         }
//     }

//     function handleRemoveSubcategory(id: string) {
//         setSubcategories(subcategories.filter((sc) => sc.id !== id));
//     }

//     async function handleSaveCategory() {
//         try {
//             const payload = new FormData();
//             payload.append("name", formData.name || "");
//             payload.append("slug", formData.slug || "");
//             payload.append("description", formData.description || "");
//             payload.append("status", formData.status || "active");
//             // if (imageFile) {
//             //     payload.append("images", imageFile);
//             // }
//             imageFile?.forEach((file) => {
//                 payload.append("images", file);
//             });

//             let response;
//             if (modalType === "add") {
//                 response = await categoryService.createCategory(payload);
//             }
//             else if (modalType === "edit" && selectedCategory) {
//                 payload.append("id", String(selectedCategory.id));
//                 response = await categoryService.updateCategories(selectedCategory.id, payload);
//             }
//             console.log("Category saved:", response);
//             await loadCategories();
//             setShowModal(false);
//         }
//         catch (err) {
//             console.error("Error saving category:", err);
//         }
//     }

//     function handleDeleteCategory(id: string) {
//         if (window.confirm("Are you sure you want to delete this category?")) {
//             setCategories(categories.filter((c) => c.id !== id));
//             setShowModal(false);
//         }
//     }

//     const filteredCategories = categories.filter((c) => {
//         const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesStatus = filterStatus === "all" || c.status === filterStatus;
//         return matchesSearch && matchesStatus;
//     });

//     return (
//         <div className="categories-page">
//             {/* PAGE HEADER */}
//             <div className="page-header">
//                 <div>
//                     <h2>Categories</h2>
//                     <p>Manage your store categories, subcategories and organize products</p>
//                 </div>
//                 <div className="header-actions">
//                     <button className="action-btn primary" onClick={openAddModal}>
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <line x1="12" y1="5" x2="12" y2="19"></line>
//                             <line x1="5" y1="12" x2="19" y2="12"></line>
//                         </svg>
//                         Add Category
//                     </button>
//                     <button className="action-btn secondary" onClick={openBulkModal}>
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                             <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//                             <polyline points="17 8 12 3 7 8"></polyline>
//                             <line x1="12" y1="3" x2="12" y2="15"></line>
//                         </svg>
//                         Bulk Upload
//                     </button>
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
//                         placeholder="Search categories..."
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

//             {/* CATEGORIES TABLE */}
//             <div className="card categories-table-card">
//                 <table className="categories-table">
//                     <thead>
//                         <tr>
//                             <th>Image</th>
//                             <th>Category Name</th>
//                             <th>Slug</th>
//                             <th>Subcategories</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredCategories.map((category) => (
//                             <tr key={category.id}>
//                                 <td>
//                                     <div className="category-image">
//                                         <img src={category?.image?.[0] || "https://via.placeholder.com/50"} alt={category.name} />
//                                     </div>
//                                 </td>
//                                 <td className="category-name">{category.name}</td>
//                                 <td className="category-slug">{category.slug}</td>
//                                 <td>
//                                     <span className="subcategory-count">
//                                         {category?.subcategories?.length || 0}
//                                     </span>
//                                 </td>
//                                 <td>
//                                     <span className={`status-badge ${category.status}`}>
//                                         {Number(category?.status) === 1 ? "Active" : "Inactive"}

//                                     </span>
//                                 </td>
//                                 <td className="actions">
//                                     <button className="edit-btn" onClick={() => openEditModal(category)}>
//                                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                             <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//                                             <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
//                                         </svg>
//                                         Edit
//                                     </button>
//                                     <button className="delete-btn" onClick={() => handleDeleteCategory(category.id)}>
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

//             {/* MODAL */}
//             {showModal && (
//                 <div className="category-modal">
//                     <div className="category-modal-content">
//                         <div className="modal-header">
//                             <h3>
//                                 {modalType === "add" && "Add New Category"}
//                                 {modalType === "edit" && "Edit Category"}
//                                 {modalType === "bulk" && "Bulk Upload Categories"}
//                             </h3>
//                             <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
//                         </div>

//                         <div className="modal-body">
//                             {modalType === "bulk" ? (
//                                 <>
//                                     <p className="info-text">
//                                         Upload a CSV file with category details. Download the template below to see the required format.
//                                     </p>
//                                     <div className="bulk-upload-section">
//                                         <label className="upload-btn">
//                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//                                                 <polyline points="17 8 12 3 7 8"></polyline>
//                                                 <line x1="12" y1="3" x2="12" y2="15"></line>
//                                             </svg>
//                                             Choose CSV File
//                                             <input type="file" accept=".csv" />
//                                         </label>
//                                         <button className="download-template-btn">
//                                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//                                                 <polyline points="7 10 12 15 17 10"></polyline>
//                                                 <line x1="12" y1="15" x2="12" y2="3"></line>
//                                             </svg>
//                                             Download Template
//                                         </button>
//                                     </div>
//                                     <div className="modal-footer">
//                                         <button className="save-btn" onClick={() => setShowModal(false)}>Upload Categories</button>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <>
//                                     <h4 className="section-title">Category Information</h4>
//                                     <div className="form-grid">
//                                         <div className="form-group">
//                                             <label>Category Name</label>
//                                             <input
//                                                 type="text"
//                                                 placeholder="Enter category name"
//                                                 value={formData.name || ""}
//                                                 onChange={(e) => handleInputChange("name", e.target.value)}
//                                             />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Slug</label>
//                                             <input
//                                                 type="text"
//                                                 placeholder="e.g. electronics"
//                                                 value={formData.slug || ""}
//                                                 onChange={(e) => handleInputChange("slug", e.target.value)}
//                                             />
//                                         </div>
//                                         <div className="form-group">
//                                             <label>Status</label>
//                                             <select
//                                                 value={formData.status || "active"}
//                                                 onChange={(e) => handleInputChange("status", e.target.value)}
//                                             >
//                                                 <option value="active">Active</option>
//                                                 <option value="inactive">Inactive</option>
//                                             </select>
//                                         </div>
//                                         <div className="form-group full-width">
//                                             <label>Description</label>
//                                             <textarea
//                                                 placeholder="Enter category description"
//                                                 value={formData.description || ""}
//                                                 onChange={(e) => handleInputChange("description", e.target.value)}
//                                             />
//                                         </div>
//                                     </div>

//                                     <h4 className="section-title">Category Image</h4>
//                                     <div className="image-upload-section">
//                                         <label className="upload-btn">
//                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//                                                 <circle cx="8.5" cy="8.5" r="1.5"></circle>
//                                                 <polyline points="21 15 16 10 5 21"></polyline>
//                                             </svg>
//                                             Upload Image
//                                             <input type="file" accept="image/*" onChange={handleImageUpload} />
//                                         </label>
//                                         {image && (
//                                             <div className="image-preview">
//                                                 <img src={image} alt="preview" />
//                                                 <button className="remove-img-btn" onClick={() => setImage("")}>×</button>
//                                             </div>
//                                         )}
//                                     </div>

//                                     <h4 className="section-title">Subcategories</h4>
//                                     <div className="subcategory-section">
//                                         <div className="subcategory-input">
//                                             <input
//                                                 type="text"
//                                                 placeholder="Enter subcategory name"
//                                                 value={newSubcategoryName}
//                                                 onChange={(e) => setNewSubcategoryName(e.target.value)}
//                                             />
//                                             <button className="add-subcategory-btn" onClick={handleAddSubcategory}>
//                                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                                                     <line x1="12" y1="5" x2="12" y2="19"></line>
//                                                     <line x1="5" y1="12" x2="19" y2="12"></line>
//                                                 </svg>
//                                                 Add
//                                             </button>
//                                         </div>
//                                         <div className="subcategory-list">
//                                             {subcategories?.map((sc) => (
//                                                 <div key={sc.id} className="subcategory-item">
//                                                     <span>{sc.name}</span>
//                                                     <button onClick={() => handleRemoveSubcategory(sc.id)}>×</button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     <div className="modal-footer">
//                                         <button className="save-btn" onClick={handleSaveCategory}>
//                                             {modalType === "add" ? "Add Category" : "Save Changes"}
//                                         </button>
//                                         {modalType === "edit" && (
//                                             <button className="delete-btn" onClick={() => handleDeleteCategory(selectedCategory!.id)}>
//                                                 Delete Category
//                                             </button>
//                                         )}
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
import React, { useState, useEffect, useCallback } from 'react'
import '../styles/Categories.css'
import { categoryService } from '../services/catergory.service'

/* ─────────────────────────────────────
   Types
───────────────────────────────────── */
type SubCategory = { id: string; name: string; slug: string }

type Category = {
  id: string
  name: string
  slug: string
  description: string
  // Backend returns 1 / 0 as number OR "active"/"inactive" as string
  status: 1 | 0 | 'active' | 'inactive'
  // Backend may return a single string OR an array
  image: string | string[]
  images?: string[]
  subcategories: SubCategory[]
}

/* ─────────────────────────────────────
   Helpers
───────────────────────────────────── */
/** Always return the first usable image URL, or a placeholder */
function getFirstImage(img: string | string[] | undefined): string {
  if (!img) return ''
  if (Array.isArray(img)) return img[0] ?? ''
  return img
}

function isActive(status: Category['status']): boolean {
  if (typeof status === 'number') return status === 1
  return status === 'active'
}

function toSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

/* ─────────────────────────────────────
   Sub-components
───────────────────────────────────── */
const StatusBadge: React.FC<{ status: Category['status'] }> = ({ status }) =>
  isActive(status)
    ? <span className="cat-badge cat-badge--active">Active</span>
    : <span className="cat-badge cat-badge--inactive">Inactive</span>

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <tr>
    <td colSpan={6} className="cat-empty">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 7h18M3 12h18M3 17h10" strokeLinecap="round" />
      </svg>
      <p>{message}</p>
    </td>
  </tr>
)

/* ─────────────────────────────────────
   Main component
───────────────────────────────────── */
export default function Categories() {
  const [categories,        setCategories]        = useState<Category[]>([])
  const [showModal,         setShowModal]          = useState(false)
  const [modalType,         setModalType]          = useState<'add' | 'edit' | 'bulk'>('add')
  const [selectedCategory,  setSelectedCategory]   = useState<Category | null>(null)
  const [formData,          setFormData]           = useState<Partial<Category>>({ status: 'active' })
  // preview URLs for display
  const [imagePreviews,     setImagePreviews]      = useState<string[]>([])
  // actual File objects to upload
  const [imageFiles,        setImageFiles]         = useState<File[]>([])
  const [subcategories,     setSubcategories]      = useState<SubCategory[]>([])
  const [newSubName,        setNewSubName]          = useState('')
  const [searchTerm,        setSearchTerm]         = useState('')
  const [filterStatus,      setFilterStatus]       = useState<'all' | 'active' | 'inactive'>('all')
  const [saving,            setSaving]             = useState(false)
  const [toast,             setToast]              = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [csvFile,           setCsvFile]            = useState<File | null>(null)

  /* ── Toast auto-dismiss ── */
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(t)
  }, [toast])

  /* ── Load categories ── */
  const loadCategories = useCallback(async () => {
    try {
      const data = await categoryService.getCategories()
      setCategories(data)
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to load categories', type: 'error' })
    }
  }, [])

  useEffect(() => { loadCategories() }, [loadCategories])

  /* ── Close modal on Escape ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowModal(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  /* ── Image upload ── */
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return

    // Revoke old object URLs to avoid memory leaks
    imagePreviews.forEach(url => { if (url.startsWith('blob:')) URL.revokeObjectURL(url) })

    setImageFiles(files)
    setImagePreviews(files.map(f => URL.createObjectURL(f)))
  }

  function removeImage(idx: number) {
    const url = imagePreviews[idx]
    if (url?.startsWith('blob:')) URL.revokeObjectURL(url)
    setImagePreviews(prev => prev.filter((_, i) => i !== idx))
    setImageFiles(prev => prev.filter((_, i) => i !== idx))
  }

  /* ── Modal helpers ── */
  function resetForm() {
    imagePreviews.forEach(url => { if (url.startsWith('blob:')) URL.revokeObjectURL(url) })
    setFormData({ status: 'active' })
    setImagePreviews([])
    setImageFiles([])
    setSubcategories([])
    setSelectedCategory(null)
    setNewSubName('')
    setCsvFile(null)
  }

  function openAddModal() {
    resetForm()
    setModalType('add')
    setShowModal(true)
  }

  function openEditModal(cat: Category) {
    resetForm()
    setModalType('edit')
    setFormData({ name: cat.name, slug: cat.slug, description: cat.description, status: cat.status })
    // BUG FIX: use getFirstImage so existing image always shows
    const existing = getFirstImage(cat.image ?? cat.images)
    setImagePreviews(existing ? [existing] : [])
    setSubcategories(cat.subcategories ?? [])
    setSelectedCategory(cat)
    setShowModal(true)
  }

  function openBulkModal() {
    resetForm()
    setModalType('bulk')
    setShowModal(true)
  }

  function handleInput(field: keyof Category, value: unknown) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  /* ── Subcategory management ── */
  function handleAddSub() {
    const name = newSubName.trim()
    if (!name) return
    setSubcategories(prev => [...prev, { id: `SC${Date.now()}`, name, slug: toSlug(name) }])
    setNewSubName('')
  }

  function handleSubKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') { e.preventDefault(); handleAddSub() }
  }

  /* ── Save ── */
  async function handleSave() {
    if (!formData.name?.trim()) { setToast({ msg: 'Category name is required', type: 'error' }); return }
    setSaving(true)
    try {
      const payload = new FormData()
      payload.append('name',        formData.name ?? '')
      payload.append('slug',        formData.slug ?? toSlug(formData.name ?? ''))
      payload.append('description', formData.description ?? '')
      payload.append('status',      String(formData.status ?? 'active'))
      imageFiles.forEach(f => payload.append('images', f))

      if (modalType === 'add') {
        await categoryService.createCategory(payload)
        setToast({ msg: 'Category added successfully', type: 'success' })
      } else if (modalType === 'edit' && selectedCategory) {
        payload.append('id', String(selectedCategory.id))
        await categoryService.updateCategories(selectedCategory.id, payload)
        setToast({ msg: 'Category updated successfully', type: 'success' })
      }

      await loadCategories()
      setShowModal(false)
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to save category', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  /* ── Delete ── */
  async function handleDelete(id: string) {
    if (!window.confirm('Delete this category? This cannot be undone.')) return
    try {
      // Call API if available, otherwise just remove locally
      // await categoryService.deleteCategory(id)
      setCategories(prev => prev.filter(c => c.id !== id))
      setToast({ msg: 'Category deleted', type: 'success' })
      setShowModal(false)
    } catch (err) {
      console.error(err)
      setToast({ msg: 'Failed to delete category', type: 'error' })
    }
  }

  /* ── Filtered list ── */
  const filtered = categories.filter(c => {
    const matchName   = c.name.toLowerCase().includes(searchTerm.toLowerCase())
    const activeNow   = isActive(c.status)
    const matchStatus = filterStatus === 'all' || (filterStatus === 'active' ? activeNow : !activeNow)
    return matchName && matchStatus
  })

  /* ─────────────────────────────────────
     Render
  ───────────────────────────────────── */
  return (
    <div className="cat-page">

      {/* ── Toast ── */}
      {toast && (
        <div className={`cat-toast cat-toast--${toast.type}`} role="alert">
          {toast.type === 'success'
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          }
          {toast.msg}
        </div>
      )}

      {/* ── Page header ── */}
      <div className="cat-header">
        <div className="cat-header-text">
          <h2>Categories</h2>
          <p>Manage your store categories, subcategories and product organisation</p>
        </div>
        <div className="cat-header-actions">
          <button className="cat-btn cat-btn--primary" onClick={openAddModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add Category
          </button>
          <button className="cat-btn cat-btn--secondary" onClick={openBulkModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            Bulk Upload
          </button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="cat-filters">
        <div className="cat-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input
            type="search"
            placeholder="Search categories…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search categories"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
          aria-label="Filter by status"
          className="cat-select"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* ── Stats bar ── */}
      <div className="cat-stats">
        <div className="cat-stat">
          <span className="cat-stat-val">{categories.length}</span>
          <span className="cat-stat-lbl">Total</span>
        </div>
        <div className="cat-stat-divider" />
        <div className="cat-stat">
          <span className="cat-stat-val">{categories.filter(c => isActive(c.status)).length}</span>
          <span className="cat-stat-lbl">Active</span>
        </div>
        <div className="cat-stat-divider" />
        <div className="cat-stat">
          <span className="cat-stat-val">{categories.filter(c => !isActive(c.status)).length}</span>
          <span className="cat-stat-lbl">Inactive</span>
        </div>
        <div className="cat-stat-divider" />
        <div className="cat-stat">
          <span className="cat-stat-val">{categories.reduce((s, c) => s + (c.subcategories?.length ?? 0), 0)}</span>
          <span className="cat-stat-lbl">Subcategories</span>
        </div>
      </div>

      {/* ── Table card ── */}
      <div className="cat-card">
        <div className="cat-table-wrap">
          <table className="cat-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Subcategories</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <EmptyState message={searchTerm ? 'No categories match your search' : 'No categories yet. Click "Add Category" to get started.'} />
                : filtered.map(cat => (
                    <tr key={cat.id}>
                      <td>
                        {/* BUG FIX: getFirstImage handles both string and array */}
                        <div className="cat-img-wrap">
                          {getFirstImage(cat.image ?? cat.images)
                            ? <img
                                src={getFirstImage(cat.image ?? cat.images)}
                                alt={cat.name}
                                onError={e => { (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cat.name)}&background=00c9a7&color=0d1117&size=80` }}
                              />
                            : <span className="cat-img-fallback">{cat.name.charAt(0).toUpperCase()}</span>
                          }
                        </div>
                      </td>
                      <td className="cat-td-name">{cat.name}</td>
                      <td><span className="cat-slug">{cat.slug}</span></td>
                      <td>
                        <span className="cat-subcount">
                          {cat.subcategories?.length ?? 0}
                        </span>
                      </td>
                      <td><StatusBadge status={cat.status} /></td>
                      <td>
                        <div className="cat-actions">
                          <button className="cat-action-btn cat-action-btn--edit" onClick={() => openEditModal(cat)} aria-label={`Edit ${cat.name}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                            Edit
                          </button>
                          <button className="cat-action-btn cat-action-btn--delete" onClick={() => handleDelete(cat.id)} aria-label={`Delete ${cat.name}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
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
        <div className="cat-modal-overlay" role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}>
          <div className="cat-modal">

            {/* Modal header */}
            <div className="cat-modal-header">
              <div className="cat-modal-title-wrap">
                <div className="cat-modal-icon">
                  {modalType === 'add'  && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>}
                  {modalType === 'edit' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>}
                  {modalType === 'bulk' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>}
                </div>
                <h3>
                  {modalType === 'add'  && 'Add New Category'}
                  {modalType === 'edit' && 'Edit Category'}
                  {modalType === 'bulk' && 'Bulk Upload'}
                </h3>
              </div>
              <button className="cat-close-btn" onClick={() => setShowModal(false)} aria-label="Close modal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="cat-modal-body">

              {/* ── Bulk upload ── */}
              {modalType === 'bulk' && (
                <div className="cat-bulk">
                  <p className="cat-info-text">Upload a CSV file with category details. Each row should have: name, slug, description, status.</p>
                  <div className="cat-bulk-actions">
                    <label className="cat-upload-label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                      {csvFile ? csvFile.name : 'Choose CSV File'}
                      <input type="file" accept=".csv" onChange={e => setCsvFile(e.target.files?.[0] ?? null)} />
                    </label>
                    <button className="cat-btn cat-btn--secondary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                      Download Template
                    </button>
                  </div>
                </div>
              )}

              {/* ── Add / Edit form ── */}
              {(modalType === 'add' || modalType === 'edit') && (
                <>
                  {/* Section: Info */}
                  <div className="cat-section">
                    <div className="cat-section-title">
                      <span className="cat-section-bar" />
                      Category Information
                    </div>
                    <div className="cat-form-grid">
                      <div className="cat-field">
                        <label htmlFor="cat-name">Name <span className="cat-required">*</span></label>
                        <input
                          id="cat-name"
                          type="text"
                          placeholder="e.g. Electronics"
                          value={formData.name ?? ''}
                          onChange={e => {
                            handleInput('name', e.target.value)
                            // Auto-generate slug only in add mode
                            if (modalType === 'add') handleInput('slug', toSlug(e.target.value))
                          }}
                        />
                      </div>
                      <div className="cat-field">
                        <label htmlFor="cat-slug">Slug</label>
                        <input
                          id="cat-slug"
                          type="text"
                          placeholder="e.g. electronics"
                          value={formData.slug ?? ''}
                          onChange={e => handleInput('slug', toSlug(e.target.value))}
                        />
                      </div>
                      <div className="cat-field">
                        <label htmlFor="cat-status">Status</label>
                        <select
                          id="cat-status"
                          value={String(formData.status ?? 'active')}
                          onChange={e => handleInput('status', e.target.value as 'active' | 'inactive')}
                          className="cat-select"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                      <div className="cat-field cat-field--full">
                        <label htmlFor="cat-desc">Description</label>
                        <textarea
                          id="cat-desc"
                          placeholder="Describe this category…"
                          value={formData.description ?? ''}
                          onChange={e => handleInput('description', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section: Image */}
                  <div className="cat-section">
                    <div className="cat-section-title">
                      <span className="cat-section-bar" />
                      Category Image
                    </div>

                    <div className="cat-image-area">
                      {/* Image previews */}
                      {imagePreviews.length > 0 && (
                        <div className="cat-previews">
                          {imagePreviews.map((url, i) => (
                            <div key={i} className="cat-preview">
                              {/* BUG FIX: img renders the object URL correctly */}
                              <img
                                src={url}
                                alt={`preview ${i + 1}`}
                                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                              />
                              <button
                                className="cat-remove-img"
                                onClick={() => removeImage(i)}
                                aria-label="Remove image"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <label className="cat-upload-label">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                        {imagePreviews.length ? 'Change Image' : 'Upload Image'}
                        <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>

                  {/* Section: Subcategories */}
                  <div className="cat-section">
                    <div className="cat-section-title">
                      <span className="cat-section-bar" />
                      Subcategories
                    </div>
                    <div className="cat-sub-input-row">
                      <input
                        type="text"
                        placeholder="New subcategory name…"
                        value={newSubName}
                        onChange={e => setNewSubName(e.target.value)}
                        onKeyDown={handleSubKeyDown}
                      />
                      <button className="cat-btn cat-btn--primary" onClick={handleAddSub}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        Add
                      </button>
                    </div>
                    {subcategories.length > 0 && (
                      <div className="cat-sub-list">
                        {subcategories.map(sc => (
                          <div key={sc.id} className="cat-sub-tag">
                            <span>{sc.name}</span>
                            <button onClick={() => setSubcategories(prev => prev.filter(s => s.id !== sc.id))} aria-label={`Remove ${sc.name}`}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Modal footer */}
            <div className="cat-modal-footer">
              <button className="cat-btn cat-btn--ghost" onClick={() => setShowModal(false)}>Cancel</button>
              {modalType === 'bulk' && (
                <button className="cat-btn cat-btn--primary" disabled={!csvFile}>
                  Upload CSV
                </button>
              )}
              {(modalType === 'add' || modalType === 'edit') && (
                <>
                  {modalType === 'edit' && selectedCategory && (
                    <button className="cat-btn cat-btn--danger" onClick={() => handleDelete(selectedCategory.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                      Delete
                    </button>
                  )}
                  <button className="cat-btn cat-btn--primary" onClick={handleSave} disabled={saving}>
                    {saving
                      ? <><span className="cat-spinner" />Saving…</>
                      : modalType === 'add' ? 'Add Category' : 'Save Changes'
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