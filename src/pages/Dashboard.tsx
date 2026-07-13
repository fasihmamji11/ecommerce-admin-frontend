// import React, { useEffect, useState } from "react";
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer,
//     CartesianGrid,
//     BarChart,
//     Bar,
//     PieChart,
//     Pie,
//     Cell,
// } from "recharts";
// import axios from "axios";
// import "../styles/Dashboard.css";

// /* -------------------------------
//    Types
// ---------------------------------*/
// type SalesData = {
//     date: string;
//     revenue: number;
//     orders: number;
// };

// type CategoryData = {
//     name: string;
//     value: number;
// };

// type TopProduct = {
//     id: string;
//     name: string;
//     sold: number;
//     revenue: number;
// };

// type OverviewData = {
//     revenue: number;
//     orders: number;
//     avgOrderValue: number;
//     lowStockCount: number;
// };

// type Order = {
//     id: string;
//     customer: string;
//     amount: number;
//     status: string;
//     date: string;
// };


// /* -------------------------------
//    Inline Dashboard Service
// ---------------------------------*/
// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
//     withCredentials: true,
// });

// const mockSalesLast30: SalesData[] = Array.from({ length: 30 }).map((_, i) => {
//     const d = new Date();
//     d.setDate(d.getDate() - (29 - i));
//     return {
//         date: d.toISOString().slice(5, 10),
//         revenue: Math.round(1500 + Math.random() * 5000),
//         orders: Math.round(20 + Math.random() * 80),
//     };
// });

// const mockCategories: CategoryData[] = [
//     { name: "Electronics", value: 42 },
//     { name: "Clothing", value: 28 },
//     { name: "Home", value: 15 },
//     { name: "Books", value: 10 },
//     { name: "Other", value: 5 },
// ];

// const mockTopProducts: TopProduct[] = [
//     { id: "p_01", name: "Wireless Headphones", sold: 210, revenue: 10500 },
//     { id: "p_02", name: "Running Shoes", sold: 154, revenue: 7700 },
//     { id: "p_03", name: "Smart Watch", sold: 120, revenue: 9600 },
//     { id: "p_04", name: "Laptop Stand", sold: 98, revenue: 4900 },
//     { id: "p_05", name: "USB-C Cable", sold: 87, revenue: 1740 },
// ];

// const mockOrders: Order[] = [
//     { id: "ORD-101", customer: "John Doe", amount: 129.99, status: "Completed", date: "2025-02-01" },
//     { id: "ORD-102", customer: "Sarah Lee", amount: 89.50, status: "Pending", date: "2025-02-02" },
//     { id: "ORD-103", customer: "Michael Chan", amount: 49.00, status: "Shipped", date: "2025-02-03" },
//     { id: "ORD-104", customer: "Priya Shah", amount: 220.00, status: "Completed", date: "2025-02-04" },
// ];

// const dashboardService = {
//     async getSalesLast30(): Promise<SalesData[]> {
//         try {
//             const res = await api.get("/admin/analytics/sales?days=30");
//             return res.data;
//         } catch {
//             return mockSalesLast30;
//         }
//     },

//     async getCategoryShare(): Promise<CategoryData[]> {
//         try {
//             const res = await api.get("/admin/analytics/categories");
//             return res.data;
//         } catch {
//             return mockCategories;
//         }
//     },

//     async getTopProducts(): Promise<TopProduct[]> {
//         try {
//             const res = await api.get("/admin/analytics/top-products");
//             return res.data;
//         } catch {
//             return mockTopProducts;
//         }
//     },

//     async getRecentOrders(): Promise<Order[]> {
//         try {
//             const res = await api.get("/admin/orders/recent");
//             return res.data;
//         } catch {
//             return mockOrders;
//         }
//     },

//     async getOverview(): Promise<OverviewData> {
//         try {
//             const res = await api.get("/admin/analytics/overview");
//             return res.data;
//         } catch {
//             return {
//                 revenue: 42783,
//                 orders: 1294,
//                 avgOrderValue: 33.02,
//                 lowStockCount: 12,
//             };
//         }
//     },
// };


// /* -------------------------------
//    Chart Components
// ---------------------------------*/
// type SalesLineChartProps = { data: SalesData[] };
// const SalesLineChart: React.FC<SalesLineChartProps> = ({ data }) => (
//     <div className="chart-container">
//         <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
//                 <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
//                 <XAxis
//                     dataKey="date"
//                     tick={{ fill: "#64748b", fontSize: 12 }}
//                     stroke="#cbd5e1"
//                 />
//                 <YAxis
//                     tickFormatter={(v) => `${v}`}
//                     tick={{ fill: "#64748b", fontSize: 12 }}
//                     stroke="#cbd5e1"
//                 />
//                 <Tooltip
//                     contentStyle={{
//                         background: "#ffffff",
//                         border: "2px solid #e2e8f0",
//                         borderRadius: "10px",
//                         padding: "12px",
//                     }}
//                     labelStyle={{ color: "#1a202c", fontWeight: 600 }}
//                 />
//                 <Line
//                     type="monotone"
//                     dataKey="revenue"
//                     stroke="url(#colorRevenue)"
//                     strokeWidth={3}
//                     dot={{ fill: "#667eea", r: 4 }}
//                     activeDot={{ r: 6 }}
//                 />
//                 <defs>
//                     <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
//                         <stop offset="0%" stopColor="#667eea" />
//                         <stop offset="100%" stopColor="#764ba2" />
//                     </linearGradient>
//                 </defs>
//             </LineChart>
//         </ResponsiveContainer>
//     </div>
// );

// type OrdersBarChartProps = { data: SalesData[] };
// const OrdersBarChart: React.FC<OrdersBarChartProps> = ({ data }) => (
//     <div className="chart-container">
//         <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
//                 <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
//                 <XAxis
//                     dataKey="date"
//                     tick={{ fill: "#64748b", fontSize: 12 }}
//                     stroke="#cbd5e1"
//                 />
//                 <YAxis
//                     tick={{ fill: "#64748b", fontSize: 12 }}
//                     stroke="#cbd5e1"
//                 />
//                 <Tooltip
//                     contentStyle={{
//                         background: "#ffffff",
//                         border: "2px solid #e2e8f0",
//                         borderRadius: "10px",
//                         padding: "12px",
//                     }}
//                     labelStyle={{ color: "#1a202c", fontWeight: 600 }}
//                 />
//                 <Bar dataKey="orders" fill="url(#colorBar)" radius={[8, 8, 0, 0]} />
//                 <defs>
//                     <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="0%" stopColor="#667eea" />
//                         <stop offset="100%" stopColor="#764ba2" />
//                     </linearGradient>
//                 </defs>
//             </BarChart>
//         </ResponsiveContainer>
//     </div>
// );

// const COLORS = ["#667eea", "#764ba2", "#06b6d4", "#8b5cf6", "#ec4899"];

// type CategoryPieChartProps = { data: CategoryData[] };
// const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => (
//     <>
//         <div className="chart-container" style={{ minHeight: '240px' }}>
//             <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                     <Pie
//                         dataKey="value"
//                         data={data}
//                         innerRadius={60}
//                         outerRadius={90}
//                         paddingAngle={5}
//                         label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                     >
//                         {data.map((_, i) => (
//                             <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                         ))}
//                     </Pie>
//                     <Tooltip
//                         contentStyle={{
//                             background: "#ffffff",
//                             border: "2px solid #e2e8f0",
//                             borderRadius: "10px",
//                             padding: "12px",
//                         }}
//                     />
//                 </PieChart>
//             </ResponsiveContainer>
//         </div>
//         <div className="category-legend">
//             {data.map((cat, i) => (
//                 <div key={cat.name} className="legend-item">
//                     <div className="legend-color" style={{ background: COLORS[i % COLORS.length] }} />
//                     <span>{cat.name}</span>
//                 </div>
//             ))}
//         </div>
//     </>
// );

// type TopProductsListProps = { items: TopProduct[] };
// const TopProductsList: React.FC<TopProductsListProps> = ({ items }) => (
//     <ul className="top-products-list">
//         {items.map((it) => (
//             <li key={it.id} className="product-item">
//                 <div className="product-info">
//                     <div className="product-name">{it.name}</div>
//                     <div className="product-sold">{it.sold} units sold</div>
//                 </div>
//                 <div className="product-revenue">
//                     <div className="revenue-amount">${it.revenue.toLocaleString()}</div>
//                 </div>
//             </li>
//         ))}
//     </ul>
// );

// /* -------------------------------
//    Dashboard Page
// ---------------------------------*/
// export default function Dashboard() {
//     const [sales, setSales] = useState<SalesData[]>([]);
//     const [categories, setCategories] = useState<CategoryData[]>([]);
//     const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
//     const [orders, setOrders] = useState<Order[]>([]);
//     const [overview, setOverview] = useState<OverviewData | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         let mounted = true;

//         async function load() {
//             setLoading(true);
//             const [s, c, t, o, r] = await Promise.all([
//                 dashboardService.getSalesLast30(),
//                 dashboardService.getCategoryShare(),
//                 dashboardService.getTopProducts(),
//                 dashboardService.getOverview(),
//                 dashboardService.getRecentOrders(),
//             ]);

//             if (!mounted) return;

//             setSales(s);
//             setCategories(c);
//             setTopProducts(t);
//             setOverview(o);
//             setOrders(r);

//             setLoading(false);
//         }

//         load();
//         return () => {
//             mounted = false;
//         };
//     }, []);

//     return (
//         <div className="dashboard-page">
//             {/* Welcome Section */}
//             <div className="dashboard-welcome">
//                 <h2>Welcome back, Admin! 👋</h2>
//                 <p>Here's what's happening with your store today</p>
//             </div>

//             {/* Metrics Row */}
//             <div className="cards-grid">
//                 <div className="metric-card">
//                     <div className="metric-title">Total Revenue</div>
//                     <div className="metric-value">
//                         ${overview?.revenue.toLocaleString() ?? "—"}
//                     </div>
//                     <div className="metric-sub">+8.4% vs last week</div>
//                 </div>
//                 <div className="metric-card">
//                     <div className="metric-title">Total Orders</div>
//                     <div className="metric-value">{overview?.orders.toLocaleString() ?? "—"}</div>
//                     <div className="metric-sub">Conversion 3.2%</div>
//                 </div>
//                 <div className="metric-card">
//                     <div className="metric-title">Avg Order Value</div>
//                     <div className="metric-value">
//                         ${overview?.avgOrderValue.toFixed(2) ?? "—"}
//                     </div>
//                     <div className="metric-sub">Avg 2.1 items/order</div>
//                 </div>
//                 <div className="metric-card">
//                     <div className="metric-title">Low Stock Items</div>
//                     <div className="metric-value">{overview?.lowStockCount ?? "—"}</div>
//                     <div className="metric-sub">Restock soon</div>
//                 </div>
//             </div>

//             {/* Charts Row 1 - Sales & Top Products */}
//             <div className="charts-grid">
//                 <div className="chart-card">
//                     <div className="card-header">
//                         <span>Revenue Trend (30 days)</span>
//                     </div>
//                     {loading ? (
//                         <div className="chart-loading">Loading chart data...</div>
//                     ) : (
//                         <SalesLineChart data={sales} />
//                     )}
//                 </div>
//                 <div className="chart-card">
//                     <div className="card-header">
//                         <span>Top Selling Products</span>
//                     </div>
//                     {loading ? (
//                         <div className="chart-loading">Loading products...</div>
//                     ) : (
//                         <TopProductsList items={topProducts} />
//                     )}
//                 </div>
//             </div>

//             {/* Charts Row 2 - Orders & Categories */}
//             <div className="charts-grid">
//                 <div className="chart-card">
//                     <div className="card-header">
//                         <span>Orders Volume (30 days)</span>
//                     </div>
//                     {loading ? (
//                         <div className="chart-loading">Loading chart data...</div>
//                     ) : (
//                         <OrdersBarChart data={sales} />
//                     )}
//                 </div>
//                 <div className="chart-card">
//                     <div className="card-header">
//                         <span>Sales by Category</span>
//                     </div>
//                     {loading ? (
//                         <div className="chart-loading">Loading categories...</div>
//                     ) : (
//                         <CategoryPieChart data={categories} />
//                     )}
//                 </div>
//             </div>

//             {/* Recent Orders Table Placeholder */}
//             <div className="table-grid">
//                 <div className="card">
//                     <div className="card-header">Recent Orders</div>
//                     <table className="orders-table">
//                         <thead>
//                             <tr>
//                                 <th>Order ID</th>
//                                 <th>Customer</th>
//                                 <th>Amount</th>
//                                 <th>Status</th>
//                                 <th>Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orders.map((o) => (
//                                 <tr key={o.id}>
//                                     <td>{o.id}</td>
//                                     <td>{o.customer}</td>
//                                     <td>${o.amount.toFixed(2)}</td>
//                                     <td>
//                                         <span className={`status ${o.status.toLowerCase()}`}>
//                                             {o.status}
//                                         </span>
//                                     </td>
//                                     <td>{o.date}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState, useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart,
} from 'recharts'
import axios from 'axios'
import '../styles/Dashboard.css'

/* ─────────────────────────────────────
   Types
───────────────────────────────────── */
type SalesData    = { date: string; revenue: number; orders: number }
type CategoryData = { name: string; value: number }
type TopProduct   = { id: string; name: string; sold: number; revenue: number }
type OverviewData = { revenue: number; orders: number; avgOrderValue: number; lowStockCount: number }
type Order        = { id: string; customer: string; amount: number; status: string; date: string }

/* ─────────────────────────────────────
   Mock data (fallback)
───────────────────────────────────── */
const mockSales: SalesData[] = Array.from({ length: 30 }).map((_, i) => {
  const d = new Date(); d.setDate(d.getDate() - (29 - i))
  return {
    date: d.toISOString().slice(5, 10),
    revenue: Math.round(1500 + Math.random() * 5000),
    orders:  Math.round(20   + Math.random() * 80),
  }
})

const mockCategories: CategoryData[] = [
  { name: 'Electronics', value: 42 },
  { name: 'Clothing',    value: 28 },
  { name: 'Home',        value: 15 },
  { name: 'Books',       value: 10 },
  { name: 'Other',       value: 5  },
]

const mockTopProducts: TopProduct[] = [
  { id: 'p1', name: 'Wireless Headphones', sold: 210, revenue: 10500 },
  { id: 'p2', name: 'Running Shoes',        sold: 154, revenue: 7700  },
  { id: 'p3', name: 'Smart Watch',          sold: 120, revenue: 9600  },
  { id: 'p4', name: 'Laptop Stand',         sold: 98,  revenue: 4900  },
  { id: 'p5', name: 'USB-C Cable',          sold: 87,  revenue: 1740  },
]

const mockOrders: Order[] = [
  { id: 'ORD-101', customer: 'John Doe',     amount: 129.99, status: 'Completed', date: '2025-02-01' },
  { id: 'ORD-102', customer: 'Sarah Lee',    amount: 89.50,  status: 'Pending',   date: '2025-02-02' },
  { id: 'ORD-103', customer: 'Michael Chan', amount: 49.00,  status: 'Shipped',   date: '2025-02-03' },
  { id: 'ORD-104', customer: 'Priya Shah',   amount: 220.00, status: 'Completed', date: '2025-02-04' },
  { id: 'ORD-105', customer: 'Ali Hassan',   amount: 310.00, status: 'Cancelled', date: '2025-02-05' },
]

/* ─────────────────────────────────────
   API service
───────────────────────────────────── */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
})

const dashboardService = {
  async getSales():      Promise<SalesData[]>    { try { return (await api.get('/admin/analytics/sales?days=30')).data  } catch { return mockSales        } },
  async getCategories(): Promise<CategoryData[]> { try { return (await api.get('/admin/analytics/categories')).data    } catch { return mockCategories   } },
  async getTopProducts():Promise<TopProduct[]>   { try { return (await api.get('/admin/analytics/top-products')).data  } catch { return mockTopProducts  } },
  async getOrders():     Promise<Order[]>         { try { return (await api.get('/admin/orders/recent')).data           } catch { return mockOrders       } },
  async getOverview():   Promise<OverviewData>   {
    try { return (await api.get('/admin/analytics/overview')).data }
    catch { return { revenue: 42783, orders: 1294, avgOrderValue: 33.02, lowStockCount: 12 } }
  },
}

/* ─────────────────────────────────────
   Design tokens (chart colours)
───────────────────────────────────── */
const TEAL      = '#00c9a7'
const TEAL_2    = '#00a896'
const ACCENT    = '#3b82f6'
const NAVY_3    = '#1e2636'
const GRID_CLR  = 'rgba(255,255,255,0.06)'
const TICK_CLR  = '#64748b'
const TIP_STYLE = {
  background: '#161b26',
  border: '1px solid rgba(0,201,167,0.25)',
  borderRadius: '10px',
  padding: '10px 14px',
  color: '#f0f4f8',
  fontSize: '13px',
}
const PIE_COLORS = [TEAL, '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899']

/* ─────────────────────────────────────
   Skeleton block
───────────────────────────────────── */
const Skeleton = ({ h = 20, w = '100%', r = 8 }: { h?: number; w?: number | string; r?: number }) => (
  <div className="db-skeleton" style={{ height: h, width: w, borderRadius: r }} />
)

/* ─────────────────────────────────────
   Metric card
───────────────────────────────────── */
type MetricCardProps = {
  label: string
  value: string
  sub: string
  trend?: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  accent?: string
  loading?: boolean
}
const MetricCard: React.FC<MetricCardProps> = ({ label, value, sub, trend = 'up', icon, accent = TEAL, loading }) => (
  <div className="db-metric">
    <div className="db-metric-top">
      <div className="db-metric-icon" style={{ background: `${accent}18`, border: `1px solid ${accent}30`, color: accent }}>
        {icon}
      </div>
      <span className={`db-trend db-trend--${trend}`}>
        {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '–'}
      </span>
    </div>
    {loading ? (
      <><Skeleton h={32} w="70%" /><Skeleton h={14} w="50%" /></>
    ) : (
      <>
        <div className="db-metric-value">{value}</div>
        <div className="db-metric-label">{label}</div>
        <div className="db-metric-sub">{sub}</div>
      </>
    )}
  </div>
)

/* ─────────────────────────────────────
   Chart card wrapper
───────────────────────────────────── */
const ChartCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`db-card ${className}`}>
    <div className="db-card-header">
      <span className="db-card-title">{title}</span>
    </div>
    {children}
  </div>
)

/* ─────────────────────────────────────
   Revenue area chart
───────────────────────────────────── */
const RevenueChart: React.FC<{ data: SalesData[] }> = ({ data }) => (
  <div className="db-chart-wrap">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 4, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={TEAL} stopOpacity={0.25} />
            <stop offset="100%" stopColor={TEAL} stopOpacity={0}    />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={GRID_CLR} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tick={{ fill: TICK_CLR, fontSize: 11 }} stroke="transparent" tickLine={false} interval={4} />
        <YAxis tick={{ fill: TICK_CLR, fontSize: 11 }} stroke="transparent" tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
        <Tooltip contentStyle={TIP_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
        <Area type="monotone" dataKey="revenue" stroke={TEAL} strokeWidth={2.5} fill="url(#areaGrad)" dot={false} activeDot={{ r: 5, fill: TEAL }} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
)

/* ─────────────────────────────────────
   Orders bar chart
───────────────────────────────────── */
const OrdersChart: React.FC<{ data: SalesData[] }> = ({ data }) => (
  <div className="db-chart-wrap">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 4, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity={0.9} />
            <stop offset="100%" stopColor={ACCENT} stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={GRID_CLR} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tick={{ fill: TICK_CLR, fontSize: 11 }} stroke="transparent" tickLine={false} interval={4} />
        <YAxis tick={{ fill: TICK_CLR, fontSize: 11 }} stroke="transparent" tickLine={false} />
        <Tooltip contentStyle={TIP_STYLE} formatter={(v: number) => [v, 'Orders']} />
        <Bar dataKey="orders" fill="url(#barGrad)" radius={[4, 4, 0, 0]} maxBarSize={18} />
      </BarChart>
    </ResponsiveContainer>
  </div>
)

/* ─────────────────────────────────────
   Donut chart
───────────────────────────────────── */
const DonutChart: React.FC<{ data: CategoryData[] }> = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div className="db-donut-wrap">
      <div className="db-donut-chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius="58%" outerRadius="80%" paddingAngle={3} startAngle={90} endAngle={-270}>
              {data.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip contentStyle={TIP_STYLE} formatter={(v: number) => [`${((v / total) * 100).toFixed(1)}%`, '']} />
          </PieChart>
        </ResponsiveContainer>
        <div className="db-donut-center">
          <span className="db-donut-pct">100%</span>
          <span className="db-donut-sub">Share</span>
        </div>
      </div>
      <ul className="db-legend">
        {data.map((d, i) => (
          <li key={d.name} className="db-legend-item">
            <span className="db-legend-dot" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
            <span className="db-legend-name">{d.name}</span>
            <span className="db-legend-pct">{((d.value / total) * 100).toFixed(0)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─────────────────────────────────────
   Top products
───────────────────────────────────── */
const TopProducts: React.FC<{ items: TopProduct[] }> = ({ items }) => {
  const max = Math.max(...items.map(p => p.revenue))
  return (
    <ul className="db-products">
      {items.map((p, i) => (
        <li key={p.id} className="db-product">
          <span className="db-product-rank">{i + 1}</span>
          <div className="db-product-info">
            <div className="db-product-name">{p.name}</div>
            <div className="db-product-bar-wrap">
              <div className="db-product-bar" style={{ width: `${(p.revenue / max) * 100}%` }} />
            </div>
          </div>
          <div className="db-product-stats">
            <div className="db-product-rev">${p.revenue.toLocaleString()}</div>
            <div className="db-product-sold">{p.sold} sold</div>
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ─────────────────────────────────────
   Status badge
───────────────────────────────────── */
const STATUS_MAP: Record<string, { color: string; bg: string }> = {
  completed: { color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  pending:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
  shipped:   { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
  cancelled: { color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const key = status.toLowerCase()
  const { color, bg } = STATUS_MAP[key] ?? { color: '#8899aa', bg: 'rgba(136,153,170,0.12)' }
  return (
    <span className="db-status" style={{ color, background: bg, border: `1px solid ${color}30` }}>
      {status}
    </span>
  )
}

/* ─────────────────────────────────────
   Dashboard page
───────────────────────────────────── */
export default function Dashboard() {
  const [sales,       setSales]       = useState<SalesData[]>([])
  const [categories,  setCategories]  = useState<CategoryData[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [orders,      setOrders]      = useState<Order[]>([])
  const [overview,    setOverview]    = useState<OverviewData | null>(null)
  const [loading,     setLoading]     = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      const [s, c, t, ov, o] = await Promise.all([
        dashboardService.getSales(),
        dashboardService.getCategories(),
        dashboardService.getTopProducts(),
        dashboardService.getOverview(),
        dashboardService.getOrders(),
      ])
      if (!alive) return
      setSales(s); setCategories(c); setTopProducts(t); setOverview(ov); setOrders(o)
      setLoading(false)
    })()
    return () => { alive = false }
  }, [])

  // Derived stats
  const revenueTotal = useMemo(() => sales.reduce((s, d) => s + d.revenue, 0), [sales])
  const ordersTotal  = useMemo(() => sales.reduce((s, d) => s + d.orders,  0), [sales])

  return (
    <div className="db-page">

      {/* ── Welcome banner ── */}
      <div className="db-banner">
        <div className="db-banner-text">
          <h2 className="db-banner-title">Good to see you, Admin</h2>
          <p  className="db-banner-sub">Here's your store at a glance for the last 30 days</p>
        </div>
        <div className="db-banner-stats">
          <div className="db-banner-stat">
            <span className="db-banner-stat-val">${(revenueTotal / 1000).toFixed(1)}k</span>
            <span className="db-banner-stat-lbl">30-day revenue</span>
          </div>
          <div className="db-banner-divider" />
          <div className="db-banner-stat">
            <span className="db-banner-stat-val">{ordersTotal.toLocaleString()}</span>
            <span className="db-banner-stat-lbl">total orders</span>
          </div>
        </div>
      </div>

      {/* ── Metric cards ── */}
      <div className="db-metrics">
        <MetricCard
          label="Total Revenue" loading={loading}
          value={`$${overview?.revenue.toLocaleString() ?? '—'}`}
          sub="+8.4% vs last week" trend="up" accent={TEAL}
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6"/></svg>}
        />
        <MetricCard
          label="Total Orders" loading={loading}
          value={overview?.orders.toLocaleString() ?? '—'}
          sub="Conversion 3.2%" trend="up" accent="#3b82f6"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>}
        />
        <MetricCard
          label="Avg Order Value" loading={loading}
          value={`$${overview?.avgOrderValue.toFixed(2) ?? '—'}`}
          sub="2.1 items per order" trend="neutral" accent="#8b5cf6"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2M12 12v4M10 14h4"/></svg>}
        />
        <MetricCard
          label="Low Stock Items" loading={loading}
          value={String(overview?.lowStockCount ?? '—')}
          sub="Needs restocking" trend="down" accent="#f59e0b"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
        />
      </div>

      {/* ── Charts row 1: Revenue + Top Products ── */}
      <div className="db-row">
        <ChartCard title="Revenue — last 30 days" className="db-col-2">
          {loading ? <div className="db-chart-wrap db-shimmer" /> : <RevenueChart data={sales} />}
        </ChartCard>
        <ChartCard title="Top products" className="db-col-1">
          {loading ? <div className="db-chart-wrap db-shimmer" /> : <TopProducts items={topProducts} />}
        </ChartCard>
      </div>

      {/* ── Charts row 2: Orders + Donut ── */}
      <div className="db-row">
        <ChartCard title="Orders volume — last 30 days" className="db-col-2">
          {loading ? <div className="db-chart-wrap db-shimmer" /> : <OrdersChart data={sales} />}
        </ChartCard>
        <ChartCard title="Sales by category" className="db-col-1">
          {loading ? <div className="db-chart-wrap db-shimmer" /> : <DonutChart data={categories} />}
        </ChartCard>
      </div>

      {/* ── Recent orders table ── */}
      <div className="db-card db-orders-card">
        <div className="db-card-header">
          <span className="db-card-title">Recent orders</span>
          <span className="db-card-count">{orders.length} entries</span>
        </div>
        <div className="db-table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <td key={j}><Skeleton h={16} /></td>
                      ))}
                    </tr>
                  ))
                : orders.map(o => (
                    <tr key={o.id}>
                      <td><span className="db-order-id">{o.id}</span></td>
                      <td>{o.customer}</td>
                      <td><span className="db-order-amt">${o.amount.toFixed(2)}</span></td>
                      <td><StatusBadge status={o.status} /></td>
                      <td><span className="db-order-date">{o.date}</span></td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}