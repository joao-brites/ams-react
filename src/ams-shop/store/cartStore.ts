import { Store } from "./createStore";
import { CartState, Product, CartItem } from "../types";

class CartStore extends Store<CartState> {
  private debounceTimeout: number | null = null;
  private readonly STORAGE_KEY = "shop_cart";
  private readonly DEBOUNCE_TIME = 300;

  constructor() {
    super({
      items: [],
      isLoading: false,
      lastUpdated: Date.now(),
      error: null
    });

    this.initialize();
  }

  private initialize() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const items = JSON.parse(saved) as CartItem[];
        this.setState({
          items,
          lastUpdated: Date.now(),
          error: null
        });
      }
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
      this.setState({
        error: "Failed to load cart data"
      });
    }

    window.addEventListener("storage", this.handleStorageChange);
  }

  private handleStorageChange = (event: StorageEvent) => {
    if (event.key === this.STORAGE_KEY) {
      this.initialize();
    }
  };

  private saveToStorage = (items: CartItem[]) => {
    if (this.debounceTimeout) {
      window.clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = window.setTimeout(() => {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
        this.setState({ error: null });
      } catch (error) {
        console.error("Failed to save cart to storage:", error);
        this.setState({
          error: "Failed to save cart data"
        });
      }
      this.debounceTimeout = null;
    }, this.DEBOUNCE_TIME);
  };

  public getTotal = () => {
    return this.getState().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  public getItemCount = () => {
    return this.getState().items.reduce((sum, item) => sum + item.quantity, 0);
  };

  public getItemById = (id: number) => {
    return this.getState().items.find((item) => item.id === id);
  };

  addToCart(product: Product, quantity = 1) {
    if (quantity < 1) return;

    this.setState((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          existingItem.stock
        );

        if (newQuantity === existingItem.quantity) return state;

        const newItems = state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );

        this.saveToStorage(newItems);
        return { items: newItems, lastUpdated: Date.now() };
      }

      const newItems = [
        ...state.items,
        { ...product, quantity: Math.min(quantity, product.stock) }
      ];

      this.saveToStorage(newItems);
      return { items: newItems, lastUpdated: Date.now() };
    });
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) return;

    this.setState((state) => {
      const item = state.items.find((item) => item.id === productId);
      if (!item || quantity > item.stock) return state;

      const newItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      this.saveToStorage(newItems);
      return { items: newItems, lastUpdated: Date.now() };
    });
  }

  removeFromCart(productId: number) {
    this.setState((state) => {
      const newItems = state.items.filter((item) => item.id !== productId);
      this.saveToStorage(newItems);
      return { items: newItems, lastUpdated: Date.now() };
    });
  }

  clearCart() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.setState({
      items: [],
      lastUpdated: Date.now(),
      error: null
    });
  }

  destroy() {
    window.removeEventListener("storage", this.handleStorageChange);
    if (this.debounceTimeout) {
      window.clearTimeout(this.debounceTimeout);
    }
  }
}

export const cartStore = new CartStore();
