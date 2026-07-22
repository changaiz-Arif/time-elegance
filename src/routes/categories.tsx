import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Watch Categories — Chronova" },
      { name: "description", content: "Browse timepieces by category: Dress, Sport, Diver, Chronograph, Smart, and Classic." },
      { property: "og:title", content: "Categories — Chronova" },
      { property: "og:description", content: "Shop watches by category." },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Categories</h1>
      <p className="mt-1 text-muted-foreground">Find the timepiece that matches your moment.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {categories.map((c, i) => {
          const sample = products.find((p) => p.category === c);
          const count = products.filter((p) => p.category === c).length;
          return (
            <motion.div key={c} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to="/shop" className="group block overflow-hidden rounded-2xl border border-border bg-card">
                <div className="aspect-[4/3] overflow-hidden bg-secondary/30">
                  {sample && <img src={sample.images[0]} alt={c} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-semibold">{c}</h3>
                    <p className="text-xs text-muted-foreground">{count} watches</p>
                  </div>
                  <span className="text-sm text-primary group-hover:underline">Explore →</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}