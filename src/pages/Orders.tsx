import { useState, useEffect } from "react";
import "../styles/Orders.css";

type ProductItem = {
    name: string;
    price: number;
    quantity: number;
};

type Order = {
    id: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    products: ProductItem[];
    discount: number;
    delivery: "Standard" | "Express" | "Pickup";
    total: number;
    status: "pending" | "shipped" | "delivered" | "cancelled";
    date: string;
    viewed: boolean;
};

export default function Orders() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const ordersPerPage = 5;

    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const indexOfLast = currentPage * ordersPerPage;
    const indexOfFirst = indexOfLast - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirst, indexOfLast);

    // =========================
    // FETCH ORDERS
    // =========================
    useEffect(() => {
        fetch("http://localhost:5000/api/orders")
            .then(res => res.json())
            .then(data => {
                const formatted: Order[] = data.map((o: any) => ({
                    id: o.id?.toString() || "",
                    customer: {
                        name: o.name || "",
                        email: "",
                        phone: o.phone || "",
                        address: `${o.address || ""}, ${o.city || ""}`
                    },
                    products: Array.isArray(o.products) ? o.products : [],
                    discount: 0,
                    delivery: "Standard",
                    total: Number(o.total || 0),
                    status: (o.status?.toLowerCase() || "pending"),
                    date: o.created_at || "",
                    viewed: false
                }));

                setOrders(formatted);
            })
            .catch(err => console.log(err));
    }, []);

    // =========================
    // VIEW ORDER (FIXED)
    // =========================
    const handleViewOrder = (order: Order) => {
        fetch("http://localhost:5000/api/orders")
            .then(res => res.json())
            .then(data => {
                const found = data.find((o: any) => o.id == order.id);

                if (found) {
                    const formatted: Order = {
                        id: found.id?.toString() || "",
                        customer: {
                            name: found.name || "",
                            email: "",
                            phone: found.phone || "",
                            address: `${found.address || ""}, ${found.city || ""}`
                        },
                        products: Array.isArray(found.products) ? found.products : [],
                        discount: 0,
                        delivery: "Standard",
                        total: Number(found.total || 0),
                        status: (found.status?.toLowerCase() || "pending"),
                        date: found.created_at || "",
                        viewed: true
                    };

                    setSelectedOrder(formatted);
                }
            });

        setOrders(prev =>
            prev.map(o =>
                o.id === order.id ? { ...o, viewed: true } : o
            )
        );
    };

    const handleOrderChange = (field: string, value: any) => {
        if (!selectedOrder) return;
        setSelectedOrder({ ...selectedOrder, [field]: value });
    };

    const handleCustomerChange = (field: string, value: string) => {
        if (!selectedOrder) return;
        setSelectedOrder({
            ...selectedOrder,
            customer: { ...selectedOrder.customer, [field]: value }
        });
    };

    const handleProductChange = (
        index: number,
        field: keyof ProductItem,
        value: number | string
    ) => {
        if (!selectedOrder) return;

        const updatedProducts = [...selectedOrder.products];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [field]: value
        };

        setSelectedOrder({
            ...selectedOrder,
            products: updatedProducts
        });

        updateTotal(updatedProducts, selectedOrder.discount);
    };

    const updateTotal = (products: ProductItem[], discount: number) => {
        const total =
            products.reduce((sum, p) => sum + p.price * p.quantity, 0) - discount;

        if (selectedOrder) {
            setSelectedOrder({ ...selectedOrder, total });
        }
    };

    const handleDiscountChange = (value: number) => {
        if (!selectedOrder) return;

        setSelectedOrder({ ...selectedOrder, discount: value });
        updateTotal(selectedOrder.products, value);
    };

    const handleSaveOrder = () => {
        if (!selectedOrder) return;

        setOrders(prev =>
            prev.map(o => (o.id === selectedOrder.id ? selectedOrder : o))
        );

        setSelectedOrder(null);
    };

    const handleDeleteOrder = (orderId: string) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            setOrders(prev => prev.filter(o => o.id !== orderId));
            setSelectedOrder(null);
        }
    };

    return (
        <div className="orders-page">

            <div className="page-header">
                <h2>Orders</h2>
                <p>Manage your orders, update status, and view detailed information.</p>
            </div>

            <div className="card orders-card">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Products</th>
                            <th>Total ($)</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentOrders.map(o => (
                            <tr key={o.id} className={!o.viewed ? "new-order" : ""}>
                                <td>{o.id}</td>
                                <td>{o.customer.name}</td>
                                <td>{o.products?.map(p => p.name).join(", ") || "No Products"}</td>
                                <td>{Number(o.total || 0).toFixed(2)}</td>
                                <td>
                                    <span className={`status ${o.status}`}>
                                        {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                                    </span>
                                </td>
                                <td>{o.date}</td>
                                <td className="actions">
                                    <button onClick={() => handleViewOrder(o)}>View</button>
                                    <button onClick={() => handleDeleteOrder(o.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Prev
                    </button>

                    <span>{currentPage} / {totalPages}</span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* MODAL */}
            {selectedOrder && (
                <div className="order-modal">
                    <div className="order-modal-content">

                        <div className="modal-header">
                            <h3>Order {selectedOrder.id}</h3>
                            <button onClick={() => setSelectedOrder(null)}>×</button>
                        </div>

                        <div className="modal-body">

                            <h4>Customer Info</h4>

                            <input
                                value={selectedOrder.customer.name}
                                onChange={(e) =>
                                    handleCustomerChange("name", e.target.value)
                                }
                            />

                            <input
                                value={selectedOrder.customer.email}
                                onChange={(e) =>
                                    handleCustomerChange("email", e.target.value)
                                }
                            />

                            <input
                                value={selectedOrder.customer.phone}
                                onChange={(e) =>
                                    handleCustomerChange("phone", e.target.value)
                                }
                            />

                            <textarea
                                value={selectedOrder.customer.address}
                                onChange={(e) =>
                                    handleCustomerChange("address", e.target.value)
                                }
                            />

                            <h4>Products</h4>

                            <table>
                                <tbody>
                                    {selectedOrder.products.map((p, idx) => (
                                        <tr key={idx}>
                                            <td>{p.name}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={p.price}
                                                    onChange={(e) =>
                                                        handleProductChange(idx, "price", Number(e.target.value))
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={p.quantity}
                                                    onChange={(e) =>
                                                        handleProductChange(idx, "quantity", Number(e.target.value))
                                                    }
                                                />
                                            </td>
                                            <td>{(p.price * p.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <h4>Discount</h4>
                            <input
                                type="number"
                                value={selectedOrder.discount}
                                onChange={(e) =>
                                    handleDiscountChange(Number(e.target.value))
                                }
                            />

                            <h4>Total: {Number(selectedOrder.total || 0).toFixed(2)}</h4>

                        </div>

                        <div className="modal-footer">
                            <button onClick={handleSaveOrder}>Save</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}