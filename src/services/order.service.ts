// import axios from 'axios'

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
//   withCredentials: true,
//   timeout: 15_000,
// })

// export type OrderStatus = 'pending' | 'confirmed' | 'cancelled'

// export const orderService = {
//   /** Fetch all orders */
//   async getOrders() {
//     const { data } = await API.get('/orders')
//     return data
//   },

//   /** Fetch a single order by id (used for the "View" refresh-on-open) */
//   async getOrder(id: string) {
//     const { data } = await API.get(`/orders/${id}`)
//     return data
//   },

//   /**
//    * Update order status.
//    * Backend is responsible for the side effects:
//    *  - 'confirmed': deduct stock for each line item, atomically, in a transaction.
//    *    If any item has insufficient stock, the backend should reject with 409
//    *    and a message naming the product — the UI surfaces this to the admin.
//    *  - 'cancelled': if the order was previously 'confirmed', restore the
//    *    stock that was deducted. If it was still 'pending', no stock changes.
//    */
//   async updateStatus(id: string, status: OrderStatus) {
//     const { data } = await API.patch(`/orders/${id}/status`, { status })
//     return data
//   },

//   /** Update editable order fields (customer info, line items, discount) */
//   async updateOrder(id: string, payload: Partial<{
//     customer: { name: string; email: string; phone: string; address: string }
//     products: { name: string; price: number; quantity: number }[]
//     discount: number
//     delivery: string
//   }>) {
//     const { data } = await API.put(`/orders/${id}`, payload)
//     return data
//   },

//   async deleteOrder(id: string) {
//     const { data } = await API.delete(`/orders/${id}`)
//     return data
//   },
// }

import axios from 'axios'

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    'http://localhost:5000/api',
  withCredentials: true,
  timeout: 15000,
})

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'

export interface Order {
  id:number

  name:string
  email:string
  phone:string

  address:string
  city:string

  delivery:'Standard' | 'Express' | 'Pickup'

  discount:number
  total:number

  status:OrderStatus

  viewed:boolean
  created_at:string

  products:{
    product_id:number
    name:string
    price:number
    quantity:number
  }[]
}

export const orderService = {

  async getOrders(): Promise<Order[]> {
    const { data } =
      await API.get('/orders')

    return data
  },

  async getOrder(
    id:number|string
  ): Promise<Order> {

    const { data } =
      await API.get(`/orders/${id}`)

    return data
  },

  async updateStatus(
    id:number|string,
    status:OrderStatus
  ) {

    const { data } =
      await API.patch(
        `/orders/${id}/status`,
        { status }
      )

    return data
  },

  async updateOrder(
    id:number|string,
    payload:Partial<{
      customer:{name:string, email:string, phone:string, address:string, city:string}
      products:{product_id:number,name:string,price:number,quantity:number}[]
      discount:number
      delivery:string
    }>
  ) {

    const { data } =
      await API.put(
        `/orders/${id}`,
        payload
      )

    return data
  },

  async deleteOrder(
    id:number|string
  ) {

    const { data } =
      await API.delete(
        `/orders/${id}`
      )

    return data
  }
}