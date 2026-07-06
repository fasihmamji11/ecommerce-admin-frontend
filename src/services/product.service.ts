import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 15_000,
})

export type ProductPayload = FormData

export const productService = {
  async getProducts() {
    const { data } = await API.get('/products')
    return data
  },

  async createProduct(payload: ProductPayload) {
    const { data } = await API.post('/products', payload)
    return data
  },

  async updateProduct(id: number, payload: ProductPayload) {
    const { data } = await API.put(`/products/${id}`, payload)
    return data
  },

  async deleteProduct(id: number) {
    const { data } = await API.delete(`/products/${id}`)
    return data
  },
}