// services/discount.service.ts

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

export type DiscountType   = 'percentage' | 'fixed'
export type DiscountTarget = 'product' | 'category' | 'subcategory' | 'order'
export type DiscountStatus = 'active' | 'expired' | 'scheduled' | 'disabled'

export interface Discount {
  id: number
  code: string          // coupon code the customer types at checkout
  name: string          // internal label shown in admin
  type: DiscountType
  value: number         // % or $ amount
  target: DiscountTarget
  targetId: number | null   // null when target = 'order'
  targetName: string        // human-readable name of product/category
  minOrderValue: number     // 0 = no minimum
  usageLimit: number        // 0 = unlimited
  usedCount: number         // how many times used so far
  startDate: string         // ISO date string YYYY-MM-DD
  endDate: string
  isActive: boolean         // manually toggled on/off by admin
  createdAt: string
}

export interface ApplyCouponResult {
  valid: boolean
  discount: Discount | null
  message: string
  // server computes the actual saving for the given cart
  saving: number
}

export const discountService = {
  async getDiscounts(): Promise<Discount[]> {
    const { data } = await API.get('/discounts')
    return data
  },

  async getDiscount(id: number | string): Promise<Discount> {
    const { data } = await API.get(`/discounts/${id}`)
    return data
  },

  async createDiscount(payload: Omit<Discount, 'id' | 'usedCount' | 'createdAt'>): Promise<Discount> {
    const { data } = await API.post('/discounts', payload)
    return data
  },

  async updateDiscount(id: number | string, payload: Partial<Omit<Discount, 'id' | 'usedCount' | 'createdAt'>>): Promise<Discount> {
    const { data } = await API.put(`/discounts/${id}`, payload)
    return data
  },

  async toggleActive(id: number | string, isActive: boolean): Promise<Discount> {
    const { data } = await API.patch(`/discounts/${id}/status`, { isActive })
    return data
  },

  async deleteDiscount(id: number | string): Promise<void> {
    await API.delete(`/discounts/${id}`)
  },

  /**
   * Called from the storefront checkout to validate a coupon code.
   * cartTotal is sent so the server can check minOrderValue and compute savings.
   */
  async applyCoupon(code: string, cartTotal: number): Promise<ApplyCouponResult> {
    const { data } = await API.post('/discounts/apply', { code, cartTotal })
    return data
  },
}