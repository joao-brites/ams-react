import { useState, useEffect, useCallback } from "react";
import { cartStore } from "../store/cartStore";
import { CartItem, Product } from "../types";

export const useCart = () => {
  const [state, setState] = useState(() => ({
    items: cartStore.getState().items,
    total: cartStore.getTotal(),
    itemCount: cartStore.getItemCount()
  }));

  useEffect(() => {
    return cartStore.subscribe(() => {
      setState({
        items: cartStore.getState().items,
        total: cartStore.getTotal(),
        itemCount: cartStore.getItemCount()
      });
    });
  }, []);

  const addToCart = useCallback((product: Product) => {
    cartStore.addToCart(product);
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    cartStore.updateQuantity(productId, quantity);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    cartStore.removeFromCart(productId);
  }, []);

  const clearCart = useCallback(() => {
    cartStore.clearCart();
  }, []);

  return {
    ...state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
};
