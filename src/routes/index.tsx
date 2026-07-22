import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Sparkles, RefreshCcw, Star } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { WatchViewer3D } from "@/components/WatchViewer3D";
import heroImg from "@/assets/watch-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chronova — Premium Watches, Modern Craftsmanship" },
      { name: "description", content: "Shop premium automatic, diver, chronograph and dress watches. Curated collection with free shipping and 2-year warranty." },
      { property: "og:title", content: "Chronova — Premium Watches" },
      { property: "og:description", content: "Timepieces engineered for the modern connoisseur." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newest = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> Spring Collection — Up to 30% off
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Time, <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">refined.</span>
            </h1>
            <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
              Discover a curated collection of premium watches — from precision divers to elegant dress pieces.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elegant)] transition-all hover:-translate-y-0.5">
                Shop Collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/categories" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-secondary">
                Browse Categories
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative aspect-square">
            <img src={heroImg} alt="Premium blue-dial automatic watch" width={1600} height={1200} className="h-full w-full rounded-3xl object-cover shadow-[var(--shadow-elegant)]" />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-4 -left-4 hidden h-40 w-40 rounded-2xl bg-background/95 shadow-lg backdrop-blur md:block">
              <WatchViewer3D />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-sm md:grid-cols-4 md:px-6">
          {[
            { i: Truck, t: "Free Shipping", s: "On orders over $200" },
            { i: ShieldCheck, t: "2-Year Warranty", s: "On every timepiece" },
            { i: RefreshCcw, t: "30-Day Returns", s: "No questions asked" },
            { i: Sparkles, t: "Authenticity", s: "Guaranteed original" },
          ].map(({ i: Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2 text-primary"><Icon className="h-5 w-5" /></div>
              <div><p className="font-semibold">{t}</p><p className="text-xs text-muted-foreground">{s}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured Watches</h2>
            <p className="mt-1 text-muted-foreground">Handpicked pieces from our curated collection.</p>
          </div>
          <Link to="/shop" className="hidden text-sm font-medium text-primary hover:underline md:inline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* NEW COLLECTION */}
      <section className="bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">New Collection</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {newest.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Best Sellers</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[image:var(--gradient-hero)] py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">Why Chronova</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { t: "Expert Curation", d: "Every timepiece is selected by our master watchmakers for craftsmanship and value." },
              { t: "Authenticated Origin", d: "100% original pieces with certificates and manufacturer warranties." },
              { t: "Concierge Support", d: "Personal guidance from purchase to servicing — for a lifetime." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><ShieldCheck className="h-5 w-5" /></div>
                <h3 className="text-lg font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">Loved by collectors</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: "Marcus L.", t: "The Abyss Diver is incredible. The build quality rivals watches twice the price." },
            { n: "Sophie R.", t: "Lumière Crystal is my daily. Elegant, timeless, and the packaging felt like a gift." },
            { n: "Daniel K.", t: "Fast shipping, real deal, and the concierge helped me pick the right size. 10/10." },
          ].map((r) => (
            <div key={r.n} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex text-primary">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="text-sm text-muted-foreground">"{r.t}"</p>
              <p className="mt-4 text-sm font-semibold">{r.n}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-4xl px-4 pb-16 md:px-6">
        <div className="rounded-3xl bg-[image:var(--gradient-primary)] p-8 text-center text-primary-foreground md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">Get 10% off your first order</h2>
          <p className="mt-2 text-sm opacity-90">Subscribe to our newsletter for launches, private sales, and stories.</p>
          <form className="mx-auto mt-6 flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="you@example.com" className="h-11 flex-1 rounded-full bg-background/95 px-4 text-sm text-foreground outline-none" />
            <button className="h-11 rounded-full bg-foreground px-5 text-sm font-medium text-background hover:opacity-90">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
