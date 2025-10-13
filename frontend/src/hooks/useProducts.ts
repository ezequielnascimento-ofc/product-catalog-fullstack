// hooks/useProducts.ts
import { useState, useEffect } from "react";
import { productService } from "@/services/ProductServices";

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar todos os produtos
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const productsData = await productService.getAll();
      setProducts(productsData);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Erro ao carregar produtos";
      setError(errorMessage);
      console.error("🎯 Erro no hook:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Busca os produtos quando o componente é montado
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products, // Lista de produtos
    loading, // Estado de carregamento
    error, // Mensagem de erro
    refetch: fetchProducts, // Função para recarregar
  };
}
