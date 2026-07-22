import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Chronova — Our Story" },
      { name: "description", content: "Chronova curates premium timepieces from master watchmakers around the world." },
      { property: "og:title", content: "About Chronova" },
      { property: "og:description", content: "Our story, mission, and values." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Where craft meets time.</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Chronova began with a simple idea: the world's finest watches shouldn't be locked behind opaque markups and confusing catalogs. We source directly from master watchmakers and pass the value on to collectors like you.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { i: ShieldCheck, t: "Authenticity", d: "Every timepiece is verified original with full documentation." },
          { i: Sparkles, t: "Craftsmanship", d: "Curated by expert watchmakers who obsess over every detail." },
          { i: Users, t: "Community", d: "Join a global circle of collectors and enthusiasts." },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
            <h3 className="font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-14 rounded-3xl bg-[image:var(--gradient-hero)] p-8 md:p-12">
        <h2 className="text-2xl font-bold">Our promise</h2>
        <p className="mt-3 text-muted-foreground">
          Ship the right watch, at the right price, backed by a real human who cares. That's it.
        </p>
      </div>
    </div>
  );
}