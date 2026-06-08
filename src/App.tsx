import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/DashboardLayout'
import './App.css'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Discounts from './pages/Discounts'
import Customers from './pages/Customers'
import Settings from './pages/Settings'
import Inventory from './pages/Inventory'
import Reviews from './pages/Reviews'

function App() {

  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/reset-password" element={<ResetPassword />} />
      <Route path="/admin/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
      <Route path="/admin/products" element={<DashboardLayout><Products /></DashboardLayout>} />
      <Route path="/admin/categories" element={<DashboardLayout><Categories /></DashboardLayout>} />
      <Route path="/admin/orders" element={<DashboardLayout><Orders /></DashboardLayout>} />
      <Route path="/admin/customers" element={<DashboardLayout><Customers /></DashboardLayout>} />
      <Route path="/admin/inventory" element={<DashboardLayout><Inventory /></DashboardLayout>} />
      <Route path="/admin/reviews" element={<DashboardLayout><Reviews /></DashboardLayout>} />
      <Route path="/admin/discounts" element={<DashboardLayout><Discounts /></DashboardLayout>} />
      <Route path="/admin/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  )
}

export default App
