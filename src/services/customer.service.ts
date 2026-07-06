// services/customer.service.ts

import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 15_000,
})

API.interceptors.request.use(config => {
  const token = sessionStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export type CustomerStatus = 'active' | 'inactive'

export interface OrderHistoryItem {
  id: string
  date: string
  total: number
  status: 'pending' | 'confirmed' | 'cancelled'
  items: string[]
}

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  status: CustomerStatus
  joinDate: string          // first order date, set by backend on first insert
  // The following are DERIVED by the backend from the orders table —
  // never stored as editable fields, so they can't drift from reality.
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  lastOrderDate: string | null
  orderHistory: OrderHistoryItem[]
}

export const customerService = {
  /** List all customers with aggregate stats already computed server-side */
  async getCustomers(): Promise<Customer[]> {
    const { data } = await API.get('/customers')
    return data
  },

  /** Single customer with full order history */
  async getCustomer(id: number | string): Promise<Customer> {
    const { data } = await API.get(`/customers/${id}`)
    return data
  },

  /** Edit only the editable profile fields — never stats, those are derived */
  async updateCustomer(id: number | string, payload: Partial<{
    name: string
    email: string
    phone: string
    address: string
    city: string
    country: string
    status: CustomerStatus
  }>) {
    const { data } = await API.put(`/customers/${id}`, payload)
    return data
  },

  /** Soft action — sets status to inactive rather than deleting order history */
  async deactivateCustomer(id: number | string) {
    const { data } = await API.patch(`/customers/${id}/status`, { status: 'inactive' })
    return data
  },

  async activateCustomer(id: number | string) {
    const { data } = await API.patch(`/customers/${id}/status`, { status: 'active' })
    return data
  },

  /** Hard delete — only safe if the customer has no order history; backend should reject otherwise */
  async deleteCustomer(id: number | string) {
    const { data } = await API.delete(`/customers/${id}`)
    return data
  },
}