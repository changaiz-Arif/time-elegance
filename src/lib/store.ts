import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

// ---- Cart ----
export interface CartItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { id: product.id, slug: product.slug, name: product.name, brand: product.brand, price: product.price, image: product.image, qty },
            ],
          };
        }),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "ma-watches-cart" },
  ),
);

export function cartTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 50000 || subtotal === 0 ? 0 : 500;
  const total = subtotal + shipping;
  const count = items.reduce((n, i) => n + i.qty, 0);
  return { subtotal, shipping, total, count };
}

// ---- Wishlist ----
interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  remove: (id: string) => void;
  clear: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids.filter((i) => i !== id) : [...state.ids, id],
        })),
      has: (id) => get().ids.includes(id),
      remove: (id) => set((state) => ({ ids: state.ids.filter((i) => i !== id) })),
      clear: () => set({ ids: [] }),
    }),
    { name: "ma-watches-wishlist" },
  ),
);

// ---- Orders ----
export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "placed" | "processing" | "shipped" | "delivered" | "cancelled";
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  payment: "cod" | "bank" | "jazzcash" | "easypaisa";
}

interface OrdersState {
  orders: Order[];
  add: (order: Order) => void;
  clear: () => void;
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      add: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      clear: () => set({ orders: [] }),
    }),
    { name: "ma-watches-orders" },
  ),
);

// ---- Auth (localStorage) ----
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthState {
  user: AuthUser | null;
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  updateProfile: (patch: Partial<Pick<AuthUser, "name" | "email">>) => void;
}

interface AccountRecord { user: AuthUser; password: string }

function loadAccounts(): AccountRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("ma-watches-accounts");
    return raw ? (JSON.parse(raw) as AccountRecord[]) : [];
  } catch { return []; }
}

function saveAccounts(list: AccountRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("ma-watches-accounts", JSON.stringify(list));
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      register: (name, email, password) => {
        const accounts = loadAccounts();
        const normalized = email.trim().toLowerCase();
        if (accounts.find((a) => a.user.email === normalized)) {
          return { ok: false, error: "An account with this email already exists." };
        }
        const user: AuthUser = {
          id: crypto.randomUUID(),
          name: name.trim() || normalized.split("@")[0],
          email: normalized,
          createdAt: new Date().toISOString(),
        };
        accounts.push({ user, password });
        saveAccounts(accounts);
        set({ user });
        return { ok: true };
      },
      login: (email, password) => {
        const accounts = loadAccounts();
        const normalized = email.trim().toLowerCase();
        const match = accounts.find((a) => a.user.email === normalized && a.password === password);
        if (!match) return { ok: false, error: "Invalid email or password." };
        set({ user: match.user });
        return { ok: true };
      },
      logout: () => set({ user: null }),
      updateProfile: (patch) =>
        set((state) => {
          if (!state.user) return state;
          const updated: AuthUser = { ...state.user, ...patch, email: patch.email?.toLowerCase() ?? state.user.email };
          const accounts = loadAccounts();
          const idx = accounts.findIndex((a) => a.user.id === updated.id);
          if (idx >= 0) { accounts[idx].user = updated; saveAccounts(accounts); }
          return { user: updated };
        }),
    }),
    { name: "ma-watches-auth" },
  ),
);
