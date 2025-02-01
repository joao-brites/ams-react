import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState, Product, CartItem } from "../types";

/*----------------------------------------------------------------------------*/
/* Cart # State
/*----------------------------------------------------------------------------*/

const initialState: CartState = {
  items: [],
  isLoading: false,
  lastUpdated: Date.now(),
  error: null
};

/*----------------------------------------------------------------------------*/
/* Cart # Mutations
/*----------------------------------------------------------------------------*/

interface CartMutations {
  addToCart(product: Product, quantity?: number): void;
  updateQuantity(productId: number, quantity: number): void;
  removeFromCart(productId: number): void;
  clearCart(): void;
  getTotal(): number;
  getItemCount(): number;
}

/*----------------------------------------------------------------------------*/
/* Cart # Store
/*----------------------------------------------------------------------------*/

interface CartStore extends CartState, CartMutations {}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addToCart: (product: Product, quantity = 1) => {
        if (quantity < 1) return;

        set(
          produce((state: CartState) => {
            const existingItem = state.items.find(
              (item) => item.id === product.id
            );

            if (existingItem) {
              const newQuantity = Math.min(
                existingItem.quantity + quantity,
                existingItem.stock
              );

              if (newQuantity === existingItem.quantity) return;

              existingItem.quantity = newQuantity;
            } else {
              state.items.push({
                ...product,
                quantity: Math.min(quantity, product.stock)
              });
            }

            state.lastUpdated = Date.now();
          })
        );
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity < 1) return;

        set(
          produce((state: CartState) => {
            const item = state.items.find((item) => item.id === productId);
            if (!item || quantity > item.stock) return;

            item.quantity = quantity;
            state.lastUpdated = Date.now();
          })
        );
      },

      removeFromCart: (productId: number) => {
        set(
          produce((state: CartState) => {
            state.items = state.items.filter((item) => item.id !== productId);
            state.lastUpdated = Date.now();
          })
        );
      },

      clearCart: () => {
        set(initialState);
      },

      getTotal: () => {
        const state = get();
        return state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    {
      name: "shop-cart" // storage key
    }
  )
);

// Opcional: Getter para acesso direto ao estado
export const getCartStore = () => useCartStore.getState();
