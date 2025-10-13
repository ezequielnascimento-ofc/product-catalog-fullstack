import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const productService = {
  // GET
  getAll: async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar produtos:", error);
      throw error;
    }
  },

  // GET
  getById: async (id: number) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao buscar produto ${id}:`, error);
      throw error;
    }
  },

  // POST
  create: async (productData: any) => {
    try {
      const response = await api.post("/products", productData);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao criar produto:", error);
      throw error;
    }
  },

  // PUT
  update: async (id: number, productData: any) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao atualizar produto ${id}:`, error);
      throw error;
    }
  },

  // DELETE
  delete: async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`❌ Erro ao deletar produto ${id}:`, error);
      throw error;
    }
  },
};

export default api;
