import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    withCredentials: true,
})

export type LoginPayload = {
    email: string,
    password: string
}

export const authService = {
    login: async (payload: LoginPayload) => {
        const res = await api.post(
            "/auth/login",
            payload
        );

        return res.data;
    },
    requestPasswordReset: async (email: string) => {
        const res = await api.post('/admin/forget-password', { email })
        return res.data
    },
    resetPassword: async (token: string, password: string) => {
        const res = await api.post(`/admin/reset-password`, { token, password })
        return res.data
    },
}