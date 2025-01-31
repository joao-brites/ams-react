type Listener<T> = (state: T) => void;
type Selector<T, R> = (state: T) => R;

export class Store<T extends object> {
  private listeners = new Set<Listener<T>>();
  private selectors = new Map<Selector<T, any>, Set<Listener<any>>>();

  constructor(private state: T) {}

  getState(): Readonly<T> {
    return this.state;
  }

  setState(updater: Partial<T> | ((state: T) => Partial<T>)) {
    const newPartialState =
      typeof updater === "function" ? updater(this.state) : updater;
    const hasChanged = Object.keys(newPartialState).some(
      (key) => this.state[key as keyof T] !== newPartialState[key as keyof T]
    );

    if (hasChanged) {
      this.state = { ...this.state, ...newPartialState };
      this.notify();
    }
  }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  select<R>(selector: Selector<T, R>, listener: Listener<R>): () => void {
    if (!this.selectors.has(selector)) {
      this.selectors.set(selector, new Set());
    }

    const listeners = this.selectors.get(selector)!;
    listeners.add(listener);

    // Initial call
    listener(selector(this.state));

    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.selectors.delete(selector);
      }
    };
  }

  private notify() {
    // Notify general listeners
    this.listeners.forEach((listener) => listener(this.state));

    // Notify selector listeners
    this.selectors.forEach((listeners, selector) => {
      const selectedValue = selector(this.state);
      listeners.forEach((listener) => listener(selectedValue));
    });
  }
}
