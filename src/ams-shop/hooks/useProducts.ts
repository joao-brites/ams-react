import { useState, useEffect } from "react";
import { Product } from "../types";
import { fetchProducts } from "../services/api";

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

export const useProducts = (itemsPerPage: number = 12): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts(currentPage, itemsPerPage);
        if (mounted) {
          setProducts(data.products);
          setTotalPages(Math.ceil(data.total / itemsPerPage));
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error ? err : new Error("Failed to fetch products")
          );
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();
    return () => {
      mounted = false;
    };
  }, [currentPage, itemsPerPage]);

  return {
    products,
    isLoading,
    error,
    totalPages,
    currentPage,
    setPage: setCurrentPage
  };
};
