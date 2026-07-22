import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag, Minus, Plus, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { getProduct, getRelated, type Product } from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { WatchViewer3D } from "@/components/WatchViewer3D";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Watch not found — Chronova" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.title} by ${p.brand} — Chronova` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.title} — Chronova` },
        { property: "og:description", content: p.description },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md py-24 text-center">
      <h1 className="text-2xl font-bold">Watch not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-primary hover:underline">← Back to Shop</Link>
    </div>
  ),
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [show3D, setShow3D] = useState(false);
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const hasWish = useWishlist((s) => s.ids.includes(product.id));
  const navigate = useNavigate();
  const related = getRelated(product.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/shop" className="hover:text-foreground">Shop</Link> / <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)}
            className="relative aspect-square overflow-hidden rounded-3xl bg-secondary/40"
          >
            {show3D ? (
              <WatchViewer3D interactive />
            ) : (
              <img src={product.images[0]} alt={product.title} className={`h-full w-full object-cover transition-transform duration-500 ${zoom ? "scale-125" : ""}`} />
            )}
          </motion.div>
          <div className="mt-3 flex gap-2">
            <button onClick={() => setShow3D(false)} className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${!show3D ? "border-primary" : "border-transparent"}`}>
              <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
            </button>
            <button onClick={() => setShow3D(true)} className={`flex h-16 w-16 items-center justify-center rounded-lg border-2 bg-[image:var(--gradient-hero)] text-xs font-semibold ${show3D ? "border-primary text-primary" : "border-transparent"}`}>
              360°
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">{product.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <div className="flex text-primary">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : ""}`} />)}</div>
            <span className="text-muted-foreground">{product.rating.toFixed(1)} · {product.reviewsCount} reviews</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.oldPrice && <span className="text-lg text-muted-foreground line-through">${product.oldPrice}</span>}
            {product.discount && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">-{product.discount}%</span>}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{product.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {[
              ["Color", product.color], ["Strap", product.strap],
              ["Movement", product.movement], ["Water Resistance", product.waterResistance],
              ["Warranty", product.warranty], ["Stock", product.stock > 0 ? `${product.stock} available` : "Sold out"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-border bg-secondary/40 p-3">
                <dt className="text-xs uppercase text-muted-foreground">{k}</dt>
                <dd className="mt-0.5 font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 hover:bg-secondary rounded-l-full"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="p-2 hover:bg-secondary rounded-r-full"><Plus className="h-4 w-4" /></button>
            </div>
            <button
              onClick={() => add(product, qty)}
              disabled={product.stock === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
            <button onClick={() => toggle(product.id)} aria-label="Wishlist" className={`rounded-full border border-border p-3 ${hasWish ? "text-primary" : ""}`}>
              <Heart className={`h-4 w-4 ${hasWish ? "fill-current" : ""}`} />
            </button>
          </div>
          <button
            onClick={() => { add(product, qty); navigate({ to: "/checkout" }); }}
            disabled={product.stock === 0}
            className="mt-3 w-full rounded-full border border-primary py-3 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
          >
            Buy Now
          </button>

          <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
            {[[Truck, "Free shipping"], [ShieldCheck, "2-yr warranty"], [RefreshCcw, "30-day returns"]].map(([Icon, t], i) => (
              // @ts-expect-error - tuple typed loose for icon
              <div key={i} className="flex items-center gap-2"><Icon className="h-4 w-4 text-primary" /> {t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-6 border-b border-border">
          {[["desc", "Description"], ["specs", "Specifications"], ["reviews", "Reviews"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k as typeof tab)} className={`border-b-2 px-1 py-3 text-sm font-medium ${tab === k ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{l}</button>
          ))}
        </div>
        <div className="py-6 text-sm text-muted-foreground">
          {tab === "desc" && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <ul className="list-disc space-y-1 pl-5">
                {product.features.map((f: string) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          )}
          {tab === "specs" && (
            <table className="w-full text-left">
              <tbody>
                {Object.entries(product.specifications).map(([k, v]) => (
                  <tr key={k} className="border-b border-border last:border-0"><th className="w-1/3 py-3 font-medium text-foreground">{k}</th><td className="py-3">{String(v)}</td></tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "reviews" && (
            <div className="space-y-4">
              {[
                { n: "Alex M.", r: 5, t: "Exceeds expectations. Weight and finish are premium." },
                { n: "Priya K.", r: 4, t: "Great watch, arrived quickly. Strap a bit stiff at first." },
                { n: "Ivan T.", r: 5, t: "Second watch from Chronova — flawless as usual." },
              ].map((r) => (
                <div key={r.n} className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{r.n}</span>
                    <div className="flex text-primary">{[...Array(5)].map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < r.r ? "fill-current" : ""}`} />)}</div>
                  </div>
                  <p className="mt-2">{r.t}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related Watches</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}