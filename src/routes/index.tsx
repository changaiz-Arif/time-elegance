import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/ma-watches-logo.png.asset.json";
import { products } from "@/lib/products";
import { formatPKR } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MA WATCHES — Premium Timepieces in Pakistan" },
      { name: "description", content: "Discover 16 hand-picked luxury, sport, dress, and digital watches. Free shipping across Pakistan. Cash on delivery available." },
      { property: "og:title", content: "MA WATCHES — Premium Timepieces" },
      { property: "og:description", content: "Discover 16 hand-picked luxury, sport, dress, and digital watches." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <img src={logo.url} alt="MA WATCHES" className="h-12 w-auto" />
          <span className="ml-auto text-sm text-muted-foreground">Premium Timepieces · Pakistan</span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="text-center">
          <h1 className="text-serif text-5xl font-semibold md:text-6xl">Time, refined.</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            A curated collection of 16 timepieces. Full storefront (Shop, Cart, Checkout, Account, Admin) is being built — preview the catalog below.
          </p>
        </section>
        <section className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <article key={p.id} className="card-elevate rounded-xl border border-border bg-card p-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
                <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="mt-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.brand}</p>
                <h3 className="mt-1 font-medium">{p.name}</h3>
                <p className="mt-2 font-semibold text-royal">{formatPKR(p.price)}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
      <footer className="mt-16 border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MA WATCHES Co. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
