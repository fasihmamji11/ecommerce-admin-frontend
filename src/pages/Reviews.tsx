import { useState } from "react";
import "../styles/Reviews.css";

type Review = {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    status: "approved" | "pending" | "rejected";
    helpful: number;
    verified: boolean;
};

const dummyReviews: Review[] = [
    {
        id: "REV001",
        productId: "P001",
        productName: "Wireless Headphones",
        productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
        customerId: "CU001",
        customerName: "John Doe",
        customerEmail: "john.doe@example.com",
        rating: 5,
        title: "Excellent sound quality!",
        comment: "These headphones are amazing! The noise cancellation works perfectly and the battery life is outstanding. Highly recommend for anyone looking for premium audio experience.",
        date: "2025-11-28",
        status: "approved",
        helpful: 24,
        verified: true,
    },
    {
        id: "REV002",
        productId: "P002",
        productName: "Smart Watch",
        productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
        customerId: "CU002",
        customerName: "Jane Smith",
        customerEmail: "jane.smith@example.com",
        rating: 4,
        title: "Great features but pricey",
        comment: "The watch has all the features I need for fitness tracking. The display is bright and the battery lasts about 2 days. Only downside is the price point.",
        date: "2025-11-25",
        status: "approved",
        helpful: 18,
        verified: true,
    },
    {
        id: "REV003",
        productId: "P001",
        productName: "Wireless Headphones",
        productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
        customerId: "CU003",
        customerName: "Robert Johnson",
        customerEmail: "robert.j@example.com",
        rating: 2,
        title: "Uncomfortable for long use",
        comment: "Sound quality is good but they become uncomfortable after wearing for more than an hour. Not ideal for long flights or work sessions.",
        date: "2025-11-20",
        status: "pending",
        helpful: 5,
        verified: false,
    },
    {
        id: "REV004",
        productId: "P003",
        productName: "Running Shoes",
        productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
        customerId: "CU004",
        customerName: "Emily Davis",
        customerEmail: "emily.d@example.com",
        rating: 5,
        title: "Perfect for marathons!",
        comment: "I've run over 200 miles in these shoes and they still feel great. Excellent cushioning and support. Will definitely buy again!",
        date: "2025-11-22",
        status: "approved",
        helpful: 31,
        verified: true,
    },
];

export default function Reviews() {
    const [reviews, setReviews] = useState<Review[]>(dummyReviews);
    const [showModal, setShowModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<Partial<Review>>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRating, setFilterRating] = useState<"all" | "5" | "4" | "3" | "2" | "1">("all");
    const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending" | "rejected">("all");

    function openReviewModal(review: Review) {
        setSelectedReview(review);
        setFormData(review);
        setEditMode(false);
        setShowModal(true);
    }

    function handleInputChange(field: keyof Review, value: any) {
        setFormData({ ...formData, [field]: value });
    }

    function handleSaveReview() {
        if (!selectedReview) return;
        setReviews(reviews.map((r) => (r.id === selectedReview.id ? { ...selectedReview, ...formData } : r)));
        setSelectedReview({ ...selectedReview, ...formData } as Review);
        setEditMode(false);
    }

    function handleDeleteReview(id: string) {
        if (window.confirm("Are you sure you want to delete this review?")) {
            setReviews(reviews.filter((r) => r.id !== id));
            setShowModal(false);
        }
    }

    function handleStatusChange(id: string, status: "approved" | "pending" | "rejected") {
        setReviews(reviews.map((r) => (r.id === id ? { ...r, status } : r)));
        if (selectedReview?.id === id) {
            setSelectedReview({ ...selectedReview, status });
        }
    }

    const filteredReviews = reviews.filter((r) => {
        const matchesSearch =
            r.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.comment.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRating = filterRating === "all" || r.rating === Number(filterRating);
        const matchesStatus = filterStatus === "all" || r.status === filterStatus;
        return matchesSearch && matchesRating && matchesStatus;
    });

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0;
    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: reviews.filter((r) => r.rating === rating).length,
        percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100 || 0,
    }));

    function renderStars(rating: number, size: "small" | "medium" | "large" = "medium") {
        const sizeMap = { small: 14, medium: 18, large: 24 };
        const starSize = sizeMap[size];
        return (
            <div className={`star-rating ${size}`}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        width={starSize}
                        height={starSize}
                        viewBox="0 0 24 24"
                        fill={star <= rating ? "#fbbf24" : "#e5e7eb"}
                        stroke={star <= rating ? "#fbbf24" : "#d1d5db"}
                        strokeWidth="1"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                ))}
            </div>
        );
    }

    return (
        <div className="reviews-page">
            {/* PAGE HEADER */}
            <div className="page-header">
                <div>
                    <h2>Product Reviews</h2>
                    <p>Manage customer reviews, ratings and feedback</p>
                </div>
            </div>

            {/* STATS CARDS */}
            <div className="stats-grid">
                <div className="stat-card primary">
                    <div className="stat-icon reviews-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Total Reviews</div>
                        <div className="stat-value">{reviews.length}</div>
                    </div>
                </div>
                <div className="stat-card success">
                    <div className="stat-icon rating-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Average Rating</div>
                        <div className="stat-value">{avgRating.toFixed(1)}</div>
                    </div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon pending-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Pending Reviews</div>
                        <div className="stat-value">{reviews.filter((r) => r.status === "pending").length}</div>
                    </div>
                </div>
                <div className="stat-card info">
                    <div className="stat-icon verified-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Verified Reviews</div>
                        <div className="stat-value">{reviews.filter((r) => r.verified).length}</div>
                    </div>
                </div>
            </div>

            {/* RATING DISTRIBUTION */}
            <div className="rating-distribution-card">
                <h3>Rating Distribution</h3>
                <div className="distribution-grid">
                    {ratingDistribution.map(({ rating, count, percentage }) => (
                        <div key={rating} className="distribution-row">
                            <div className="distribution-label">
                                {rating} <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            </div>
                            <div className="distribution-bar">
                                <div className="distribution-fill" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <div className="distribution-count">{count}</div>
                        </div>
                    ))}
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
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select value={filterRating} onChange={(e) => setFilterRating(e.target.value as any)}>
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* REVIEWS LIST */}
            <div className="reviews-list">
                {filteredReviews.map((review) => (
                    <div key={review.id} className="review-card" onClick={() => openReviewModal(review)}>
                        <div className="review-header">
                            <div className="product-info">
                                <img src={review.productImage} alt={review.productName} className="product-thumb" />
                                <div>
                                    <div className="product-name">{review.productName}</div>
                                    <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div className="review-badges">
                                {review.verified && (
                                    <span className="verified-badge">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        Verified
                                    </span>
                                )}
                                <span className={`status-badge ${review.status}`}>{review.status}</span>
                            </div>
                        </div>

                        <div className="review-body">
                            <div className="rating-row">
                                {renderStars(review.rating, "medium")}
                                <span className="rating-text">{review.rating}.0</span>
                            </div>
                            <h4 className="review-title">{review.title}</h4>
                            <p className="review-comment">{review.comment}</p>
                        </div>

                        <div className="review-footer">
                            <div className="customer-info">
                                <div className="customer-avatar">
                                    {review.customerName.charAt(0)}
                                </div>
                                <div>
                                    <div className="customer-name">{review.customerName}</div>
                                    <div className="customer-email">{review.customerEmail}</div>
                                </div>
                            </div>
                            <div className="helpful-count">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                </svg>
                                {review.helpful} helpful
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* REVIEW DETAIL MODAL */}
            {showModal && selectedReview && (
                <div className="review-modal">
                    <div className="review-modal-content">
                        <div className="modal-header">
                            <h3>Review Details</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
                        </div>

                        <div className="modal-body">
                            {/* Product & Customer Info */}
                            <div className="modal-info-grid">
                                <div className="info-section">
                                    <h4 className="section-title">Product Information</h4>
                                    <div className="product-detail">
                                        <img src={selectedReview.productImage} alt={selectedReview.productName} />
                                        <div>
                                            <div className="detail-label">Product Name</div>
                                            <div className="detail-value">{selectedReview.productName}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-section">
                                    <h4 className="section-title">Customer Information</h4>
                                    <div className="customer-detail">
                                        <div className="customer-avatar large">
                                            {selectedReview.customerName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="detail-label">Customer Name</div>
                                            <div className="detail-value">{selectedReview.customerName}</div>
                                            <div className="detail-label">Email</div>
                                            <div className="detail-value">{selectedReview.customerEmail}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="review-content-section">
                                <h4 className="section-title">Review Content</h4>
                                {editMode ? (
                                    <div className="edit-form">
                                        <div className="form-group">
                                            <label>Rating</label>
                                            <select value={formData.rating || 5} onChange={(e) => handleInputChange("rating", Number(e.target.value))}>
                                                <option value="5">5 Stars</option>
                                                <option value="4">4 Stars</option>
                                                <option value="3">3 Stars</option>
                                                <option value="2">2 Stars</option>
                                                <option value="1">1 Star</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input type="text" value={formData.title || ""} onChange={(e) => handleInputChange("title", e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Comment</label>
                                            <textarea value={formData.comment || ""} onChange={(e) => handleInputChange("comment", e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select value={formData.status || "pending"} onChange={(e) => handleInputChange("status", e.target.value)}>
                                                <option value="approved">Approved</option>
                                                <option value="pending">Pending</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="review-display">
                                        <div className="display-row">
                                            <span className="display-label">Rating</span>
                                            <div className="display-value">
                                                {renderStars(selectedReview.rating, "medium")}
                                                <span className="rating-text">{selectedReview.rating}.0</span>
                                            </div>
                                        </div>
                                        <div className="display-row">
                                            <span className="display-label">Title</span>
                                            <span className="display-value">{selectedReview.title}</span>
                                        </div>
                                        <div className="display-row column">
                                            <span className="display-label">Comment</span>
                                            <p className="display-comment">{selectedReview.comment}</p>
                                        </div>
                                        <div className="display-row">
                                            <span className="display-label">Status</span>
                                            <span className={`status-badge ${selectedReview.status}`}>{selectedReview.status}</span>
                                        </div>
                                        <div className="display-row">
                                            <span className="display-label">Posted On</span>
                                            <span className="display-value">{new Date(selectedReview.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                        <div className="display-row">
                                            <span className="display-label">Helpful Votes</span>
                                            <span className="display-value">{selectedReview.helpful} people found this helpful</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Quick Status Actions */}
                            {!editMode && (
                                <div className="quick-status-actions">
                                    <h4 className="section-title">Quick Actions</h4>
                                    <div className="status-buttons">
                                        <button
                                            className={`status-action-btn approve ${selectedReview.status === "approved" ? "active" : ""}`}
                                            onClick={() => handleStatusChange(selectedReview.id, "approved")}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            Approve
                                        </button>
                                        <button
                                            className={`status-action-btn pending ${selectedReview.status === "pending" ? "active" : ""}`}
                                            onClick={() => handleStatusChange(selectedReview.id, "pending")}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            Pending
                                        </button>
                                        <button
                                            className={`status-action-btn reject ${selectedReview.status === "rejected" ? "active" : ""}`}
                                            onClick={() => handleStatusChange(selectedReview.id, "rejected")}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            {editMode ? (
                                <>
                                    <button className="save-btn" onClick={handleSaveReview}>Save Changes</button>
                                    <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Review</button>
                                    <button className="delete-btn" onClick={() => handleDeleteReview(selectedReview.id)}>Delete Review</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}