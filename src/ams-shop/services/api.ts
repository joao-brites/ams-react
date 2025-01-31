import { Product } from "../types";

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchProducts = async (
  page: number = 1,
  limit: number = 12
): Promise<ProductResponse> => {
  const skip = (page - 1) * limit;
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};
