import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/store";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Chronova" },
      { name: "description", content: "Your saved timepieces." },
      { property: "og:title", content: "Wishlist — Chronova" },
      { property: "og:description", content: "Your saved watches." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold">Wishlist</h1>
      {items.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-border p-12 text-center">
          <Heart className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-muted-foreground">Your wishlist is empty.</p>
          <Link to="/shop" className="mt-4 inline-block text-primary hover:underline">Browse watches →</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}