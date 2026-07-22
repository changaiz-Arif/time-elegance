import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";

export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const hasWish = useWishlist((s) => s.ids.includes(product.id));
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative grid w-full max-w-3xl overflow-hidden rounded-2xl bg-card shadow-2xl md:grid-cols-2"
        >
          <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-1.5 hover:bg-secondary">
            <X className="h-4 w-4" />
          </button>
          <div className="aspect-square bg-secondary/30">
            <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col gap-3 p-6">
            <span className="text-xs text-muted-foreground">{product.brand}</span>
            <h3 className="text-xl font-semibold">{product.title}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">${product.price}</span>
              {product.oldPrice && <span className="text-sm text-muted-foreground line-through">${product.oldPrice}</span>}
            </div>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <div className="mt-auto flex gap-2">
              <button onClick={() => { add(product); onClose(); }} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              <button onClick={() => toggle(product.id)} className={`rounded-lg border border-border p-2.5 ${hasWish ? "text-primary" : ""}`}>
                <Heart className={`h-4 w-4 ${hasWish ? "fill-current" : ""}`} />
              </button>
            </div>
            <Link to="/product/$slug" params={{ slug: product.slug }} onClick={onClose} className="text-center text-xs text-primary hover:underline">
              View full details →
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}