import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api",
  withCredentials: true,
});

export const categoryService = {
  async createCategory(formData: FormData) {
    const res = await api.post(
      "/categories",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return res.data;
  },

  async getCategories() {
    const res = await api.get(
      "/categories"
    );

    return res.data;
  },

  async updateCategories(id: string | number,payload: FormData) {
    const res = await api.put(
      `/categories/${id}`,
      payload,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return res.data;
  },
};