import { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  lastUpdated: number;
  error: string | null;
}
