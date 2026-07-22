import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, useWishlist } from "@/lib/store";
import { useAuth } from "@/hooks/use-auth";
import { categories, products } from "@/lib/products";

export function Header() {
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const wishlistCount = useWishlist((s) => s.ids.length);
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const matches = query.trim()
    ? products
        .filter((p) =>
          `${p.title} ${p.brand} ${p.category}`.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-8 w-8 rounded-full bg-[image:var(--gradient-primary)]" />
          <span className="text-lg">CHRONOVA</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <Link to="/categories" className="hover:text-foreground transition-colors">Categories</Link>
          <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </nav>

        <div className="relative ml-auto hidden max-w-sm flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search watches..."
            className="h-10 w-full rounded-full border border-border bg-secondary/50 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:bg-background"
          />
          <AnimatePresence>
            {open && matches.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute left-0 right-0 top-12 rounded-xl border border-border bg-card p-2 shadow-lg"
              >
                {matches.map((p) => (
                  <button
                    key={p.id}
                    onMouseDown={() => { navigate({ to: "/product/$slug", params: { slug: p.slug } }); setOpen(false); setQuery(""); }}
                    className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-secondary"
                  >
                    <img src={p.images[0]} alt={p.title} className="h-10 w-10 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{p.title}</p>
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                    </div>
                    <span className="text-sm font-semibold">${p.price}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <Link to="/wishlist" className="relative rounded-full p-2 hover:bg-secondary transition-colors">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">{wishlistCount}</span>
            )}
          </Link>
          <Link to="/cart" className="relative rounded-full p-2 hover:bg-secondary transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">{cartCount}</span>
            )}
          </Link>
          <Link to={user ? "/account" : "/login"} className="rounded-full p-2 hover:bg-secondary transition-colors">
            <User className="h-5 w-5" />
          </Link>
          <button onClick={() => setMobileOpen((v) => !v)} className="rounded-full p-2 hover:bg-secondary transition-colors md:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-3">
              {["/", "/shop", "/categories", "/about", "/contact"].map((href, i) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary"
                >
                  {["Home", "Shop", "Categories", "About", "Contact"][i]}
                </Link>
              ))}
              <div className="relative pt-2">
                <Search className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search watches..."
                  className="h-10 w-full rounded-full border border-border bg-secondary/50 pl-9 pr-4 text-sm outline-none"
                />
              </div>
              {matches.map((p) => (
                <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary">
                  <img src={p.images[0]} alt={p.title} className="h-10 w-10 rounded-md object-cover" />
                  <span className="text-sm">{p.title}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}