import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Chronova" },
      { name: "description", content: "Get in touch with the Chronova concierge team." },
      { property: "og:title", content: "Contact Chronova" },
      { property: "og:description", content: "We're here to help." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Contact us</h1>
      <p className="mt-1 text-muted-foreground">Our concierge team replies within one business day.</p>
      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_320px]">
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="space-y-4 rounded-2xl border border-border bg-card p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input required placeholder="Name" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <input required type="email" placeholder="Email" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <input placeholder="Subject" className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          <textarea required rows={6} placeholder="Message" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          <button className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">Send message</button>
          {sent && <p className="text-sm text-emerald-600">Message sent — we'll be in touch soon.</p>}
        </form>
        <aside className="space-y-4 text-sm">
          {[[Mail, "hello@chronova.example"], [Phone, "+1 (555) 010-1234"], [MapPin, "42 Timepiece Lane, NYC"]].map(([Icon, t], i) => (
            // @ts-expect-error tuple
            <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"><Icon className="h-4 w-4 mt-0.5 text-primary" /> {t}</div>
          ))}
        </aside>
      </div>
    </div>
  );
}