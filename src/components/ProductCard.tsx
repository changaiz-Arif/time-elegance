import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";
import { useState } from "react";
import { QuickView } from "./QuickView";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const hasWish = useWishlist((s) => s.ids.includes(product.id));
  const [quickOpen, setQuickOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
      >
        <Link to="/product/$slug" params={{ slug: product.slug }} className="relative block aspect-square overflow-hidden bg-secondary/30">
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.discount && (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
              -{product.discount}%
            </span>
          )}
          {product.isNew && !product.discount && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">New</span>
          )}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={(e) => { e.preventDefault(); setQuickOpen(true); }}
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-background/95 text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); toggle(product.id); }}
              className={`pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-background/95 shadow-sm hover:bg-primary hover:text-primary-foreground ${hasWish ? "text-primary" : "text-foreground"}`}
              aria-label="Wishlist"
            >
              <Heart className={`h-4 w-4 ${hasWish ? "fill-current" : ""}`} />
            </button>
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{product.brand}</span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current text-primary" />
              {product.rating.toFixed(1)}
            </span>
          </div>
          <Link to="/product/$slug" params={{ slug: product.slug }} className="mt-1 text-sm font-semibold leading-tight hover:text-primary">
            {product.title}
          </Link>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <span className="text-base font-bold">${product.price}</span>
              {product.oldPrice && <span className="ml-2 text-xs text-muted-foreground line-through">${product.oldPrice}</span>}
            </div>
            <span className={`text-[10px] uppercase tracking-wider ${product.stock > 0 ? "text-emerald-600" : "text-destructive"}`}>
              {product.stock > 0 ? "In stock" : "Sold out"}
            </span>
          </div>
          <button
            onClick={() => add(product)}
            disabled={product.stock === 0}
            className="mt-3 flex h-9 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
          >
            <ShoppingBag className="h-4 w-4" /> Add to Cart
          </button>
        </div>
      </motion.div>

      {quickOpen && <QuickView product={product} onClose={() => setQuickOpen(false)} />}
    </>
  );
}