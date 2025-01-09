import { Product } from "../types";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
};
