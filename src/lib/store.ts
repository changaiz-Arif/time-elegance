import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "./products";

export interface CartItem {
  productId: number;
  slug: string;
  title: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (productId: number) => void;
  setQty: (productId: number, qty: number) => void;
  clear: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === product.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === product.id ? { ...i, quantity: i.quantity + qty } : i,
              ),
            };
          }
          return {
            items: [
              ...s.items,
              {
                productId: product.id,
                slug: product.slug,
                title: product.title,
                brand: product.brand,
                price: product.price,
                image: product.images[0],
                quantity: qty,
              },
            ],
          };
        }),
      remove: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      setQty: (productId, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, qty) } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((n, i) => n + i.quantity, 0),
      subtotal: () => get().items.reduce((n, i) => n + i.price * i.quantity, 0),
    }),
    { name: "chronova-cart", storage: createJSONStorage(() => localStorage) },
  ),
);

interface WishlistState {
  ids: number[];
  toggle: (id: number) => void;
  has: (id: number) => boolean;
  clear: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "chronova-wishlist", storage: createJSONStorage(() => localStorage) },
  ),
);

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  total: number;
  customer: { name: string; email: string; address: string; city: string; zip: string; country: string };
  status: "processing" | "shipped" | "delivered";
}

interface OrdersState {
  orders: Order[];
  place: (order: Omit<Order, "id" | "createdAt" | "status">) => Order;
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      place: (o) => {
        const order: Order = {
          ...o,
          id: `ORD-${Date.now().toString(36).toUpperCase()}`,
          createdAt: new Date().toISOString(),
          status: "processing",
        };
        set((s) => ({ orders: [order, ...s.orders] }));
        return order;
      },
    }),
    { name: "chronova-orders", storage: createJSONStorage(() => localStorage) },
  ),
);