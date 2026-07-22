import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { products, brands, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Watches — Chronova" },
      { name: "description", content: "Browse all 16 curated timepieces. Filter by brand, price, rating, and availability." },
      { property: "og:title", content: "Shop Watches — Chronova" },
      { property: "og:description", content: "Curated collection of premium watches." },
    ],
  }),
  component: Shop,
});

type Sort = "newest" | "price-asc" | "price-desc" | "rating";

function Shop() {
  const [brand, setBrand] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<Sort>("newest");

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice && p.rating >= minRating);
    if (brand.length) list = list.filter((p) => brand.includes(p.brand));
    if (category) list = list.filter((p) => p.category === category);
    if (inStockOnly) list = list.filter((p) => p.stock > 0);
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "newest": list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break;
    }
    return list;
  }, [brand, maxPrice, minRating, inStockOnly, category, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">All Watches</h1>
        <p className="mt-1 text-muted-foreground">{filtered.length} of {products.length} timepieces</p>
      </div>
      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <aside className="space-y-6 text-sm">
          <div>
            <h3 className="mb-3 font-semibold">Category</h3>
            <div className="space-y-1.5">
              <button onClick={() => setCategory("")} className={`block w-full rounded px-2 py-1 text-left ${!category ? "bg-secondary font-medium" : "hover:bg-secondary/60"}`}>All</button>
              {categories.map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={`block w-full rounded px-2 py-1 text-left ${category === c ? "bg-secondary font-medium" : "hover:bg-secondary/60"}`}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-semibold">Brand</h3>
            <div className="space-y-1.5">
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={brand.includes(b)} onChange={() => setBrand((x) => x.includes(b) ? x.filter((v) => v !== b) : [...x, b])} className="rounded" />
                  {b}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 font-semibold">Max Price</h3>
            <input type="range" min={100} max={2000} step={50} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-primary" />
            <p className="mt-1 text-muted-foreground">Up to ${maxPrice}</p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold">Min Rating</h3>
            <div className="flex gap-1">
              {[0, 3, 4, 4.5].map((r) => (
                <button key={r} onClick={() => setMinRating(r)} className={`rounded-full border px-2.5 py-1 text-xs ${minRating === r ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                  {r === 0 ? "Any" : <span className="inline-flex items-center gap-0.5">{r}<Star className="h-3 w-3 fill-current" /></span>}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="rounded" />
            In stock only
          </label>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No watches match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}