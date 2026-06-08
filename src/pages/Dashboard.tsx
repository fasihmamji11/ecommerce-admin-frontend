import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import axios from "axios";
import "../styles/Dashboard.css";

/* -------------------------------
   Types
---------------------------------*/
type SalesData = {
    date: string;
    revenue: number;
    orders: number;
};

type CategoryData = {
    name: string;
    value: number;
};

type TopProduct = {
    id: string;
    name: string;
    sold: number;
    revenue: number;
};

type OverviewData = {
    revenue: number;
    orders: number;
    avgOrderValue: number;
    lowStockCount: number;
};

type Order = {
    id: string;
    customer: string;
    amount: number;
    status: string;
    date: string;
};


/* -------------------------------
   Inline Dashboard Service
---------------------------------*/
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
    withCredentials: true,
});

const mockSalesLast30: SalesData[] = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return {
        date: d.toISOString().slice(5, 10),
        revenue: Math.round(1500 + Math.random() * 5000),
        orders: Math.round(20 + Math.random() * 80),
    };
});

const mockCategories: CategoryData[] = [
    { name: "Electronics", value: 42 },
    { name: "Clothing", value: 28 },
    { name: "Home", value: 15 },
    { name: "Books", value: 10 },
    { name: "Other", value: 5 },
];

const mockTopProducts: TopProduct[] = [
    { id: "p_01", name: "Wireless Headphones", sold: 210, revenue: 10500 },
    { id: "p_02", name: "Running Shoes", sold: 154, revenue: 7700 },
    { id: "p_03", name: "Smart Watch", sold: 120, revenue: 9600 },
    { id: "p_04", name: "Laptop Stand", sold: 98, revenue: 4900 },
    { id: "p_05", name: "USB-C Cable", sold: 87, revenue: 1740 },
];

const mockOrders: Order[] = [
    { id: "ORD-101", customer: "John Doe", amount: 129.99, status: "Completed", date: "2025-02-01" },
    { id: "ORD-102", customer: "Sarah Lee", amount: 89.50, status: "Pending", date: "2025-02-02" },
    { id: "ORD-103", customer: "Michael Chan", amount: 49.00, status: "Shipped", date: "2025-02-03" },
    { id: "ORD-104", customer: "Priya Shah", amount: 220.00, status: "Completed", date: "2025-02-04" },
];

const dashboardService = {
    async getSalesLast30(): Promise<SalesData[]> {
        try {
            const res = await api.get("/admin/analytics/sales?days=30");
            return res.data;
        } catch {
            return mockSalesLast30;
        }
    },

    async getCategoryShare(): Promise<CategoryData[]> {
        try {
            const res = await api.get("/admin/analytics/categories");
            return res.data;
        } catch {
            return mockCategories;
        }
    },

    async getTopProducts(): Promise<TopProduct[]> {
        try {
            const res = await api.get("/admin/analytics/top-products");
            return res.data;
        } catch {
            return mockTopProducts;
        }
    },

    async getRecentOrders(): Promise<Order[]> {
        try {
            const res = await api.get("/admin/orders/recent");
            return res.data;
        } catch {
            return mockOrders;
        }
    },

    async getOverview(): Promise<OverviewData> {
        try {
            const res = await api.get("/admin/analytics/overview");
            return res.data;
        } catch {
            return {
                revenue: 42783,
                orders: 1294,
                avgOrderValue: 33.02,
                lowStockCount: 12,
            };
        }
    },
};


/* -------------------------------
   Chart Components
---------------------------------*/
type SalesLineChartProps = { data: SalesData[] };
const SalesLineChart: React.FC<SalesLineChartProps> = ({ data }) => (
    <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                <XAxis
                    dataKey="date"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    stroke="#cbd5e1"
                />
                <YAxis
                    tickFormatter={(v) => `${v}`}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    stroke="#cbd5e1"
                />
                <Tooltip
                    contentStyle={{
                        background: "#ffffff",
                        border: "2px solid #e2e8f0",
                        borderRadius: "10px",
                        padding: "12px",
                    }}
                    labelStyle={{ color: "#1a202c", fontWeight: 600 }}
                />
                <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="url(#colorRevenue)"
                    strokeWidth={3}
                    dot={{ fill: "#667eea", r: 4 }}
                    activeDot={{ r: 6 }}
                />
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                </defs>
            </LineChart>
        </ResponsiveContainer>
    </div>
);

type OrdersBarChartProps = { data: SalesData[] };
const OrdersBarChart: React.FC<OrdersBarChartProps> = ({ data }) => (
    <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                <XAxis
                    dataKey="date"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    stroke="#cbd5e1"
                />
                <YAxis
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    stroke="#cbd5e1"
                />
                <Tooltip
                    contentStyle={{
                        background: "#ffffff",
                        border: "2px solid #e2e8f0",
                        borderRadius: "10px",
                        padding: "12px",
                    }}
                    labelStyle={{ color: "#1a202c", fontWeight: 600 }}
                />
                <Bar dataKey="orders" fill="url(#colorBar)" radius={[8, 8, 0, 0]} />
                <defs>
                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                </defs>
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const COLORS = ["#667eea", "#764ba2", "#06b6d4", "#8b5cf6", "#ec4899"];

type CategoryPieChartProps = { data: CategoryData[] };
const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => (
    <>
        <div className="chart-container" style={{ minHeight: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={data}
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            background: "#ffffff",
                            border: "2px solid #e2e8f0",
                            borderRadius: "10px",
                            padding: "12px",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="category-legend">
            {data.map((cat, i) => (
                <div key={cat.name} className="legend-item">
                    <div className="legend-color" style={{ background: COLORS[i % COLORS.length] }} />
                    <span>{cat.name}</span>
                </div>
            ))}
        </div>
    </>
);

type TopProductsListProps = { items: TopProduct[] };
const TopProductsList: React.FC<TopProductsListProps> = ({ items }) => (
    <ul className="top-products-list">
        {items.map((it) => (
            <li key={it.id} className="product-item">
                <div className="product-info">
                    <div className="product-name">{it.name}</div>
                    <div className="product-sold">{it.sold} units sold</div>
                </div>
                <div className="product-revenue">
                    <div className="revenue-amount">${it.revenue.toLocaleString()}</div>
                </div>
            </li>
        ))}
    </ul>
);

/* -------------------------------
   Dashboard Page
---------------------------------*/
export default function Dashboard() {
    const [sales, setSales] = useState<SalesData[]>([]);
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [overview, setOverview] = useState<OverviewData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            const [s, c, t, o, r] = await Promise.all([
                dashboardService.getSalesLast30(),
                dashboardService.getCategoryShare(),
                dashboardService.getTopProducts(),
                dashboardService.getOverview(),
                dashboardService.getRecentOrders(),
            ]);

            if (!mounted) return;

            setSales(s);
            setCategories(c);
            setTopProducts(t);
            setOverview(o);
            setOrders(r);

            setLoading(false);
        }

        load();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="dashboard-page">
            {/* Welcome Section */}
            <div className="dashboard-welcome">
                <h2>Welcome back, Admin! 👋</h2>
                <p>Here's what's happening with your store today</p>
            </div>

            {/* Metrics Row */}
            <div className="cards-grid">
                <div className="metric-card">
                    <div className="metric-title">Total Revenue</div>
                    <div className="metric-value">
                        ${overview?.revenue.toLocaleString() ?? "—"}
                    </div>
                    <div className="metric-sub">+8.4% vs last week</div>
                </div>
                <div className="metric-card">
                    <div className="metric-title">Total Orders</div>
                    <div className="metric-value">{overview?.orders.toLocaleString() ?? "—"}</div>
                    <div className="metric-sub">Conversion 3.2%</div>
                </div>
                <div className="metric-card">
                    <div className="metric-title">Avg Order Value</div>
                    <div className="metric-value">
                        ${overview?.avgOrderValue.toFixed(2) ?? "—"}
                    </div>
                    <div className="metric-sub">Avg 2.1 items/order</div>
                </div>
                <div className="metric-card">
                    <div className="metric-title">Low Stock Items</div>
                    <div className="metric-value">{overview?.lowStockCount ?? "—"}</div>
                    <div className="metric-sub">Restock soon</div>
                </div>
            </div>

            {/* Charts Row 1 - Sales & Top Products */}
            <div className="charts-grid">
                <div className="chart-card">
                    <div className="card-header">
                        <span>Revenue Trend (30 days)</span>
                    </div>
                    {loading ? (
                        <div className="chart-loading">Loading chart data...</div>
                    ) : (
                        <SalesLineChart data={sales} />
                    )}
                </div>
                <div className="chart-card">
                    <div className="card-header">
                        <span>Top Selling Products</span>
                    </div>
                    {loading ? (
                        <div className="chart-loading">Loading products...</div>
                    ) : (
                        <TopProductsList items={topProducts} />
                    )}
                </div>
            </div>

            {/* Charts Row 2 - Orders & Categories */}
            <div className="charts-grid">
                <div className="chart-card">
                    <div className="card-header">
                        <span>Orders Volume (30 days)</span>
                    </div>
                    {loading ? (
                        <div className="chart-loading">Loading chart data...</div>
                    ) : (
                        <OrdersBarChart data={sales} />
                    )}
                </div>
                <div className="chart-card">
                    <div className="card-header">
                        <span>Sales by Category</span>
                    </div>
                    {loading ? (
                        <div className="chart-loading">Loading categories...</div>
                    ) : (
                        <CategoryPieChart data={categories} />
                    )}
                </div>
            </div>

            {/* Recent Orders Table Placeholder */}
            <div className="table-grid">
                <div className="card">
                    <div className="card-header">Recent Orders</div>
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o.id}>
                                    <td>{o.id}</td>
                                    <td>{o.customer}</td>
                                    <td>${o.amount.toFixed(2)}</td>
                                    <td>
                                        <span className={`status ${o.status.toLowerCase()}`}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td>{o.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}