import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Wallet, Truck } from "lucide-react";
import { useCart, useOrders } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Chronova" },
      { name: "description", content: "Complete your order." },
      { property: "og:title", content: "Checkout — Chronova" },
      { property: "og:description", content: "Complete your order." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const place = useOrders((s) => s.place);
  const navigate = useNavigate();
  const [payment, setPayment] = useState<"card" | "paypal" | "cod">("card");
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "", country: "United States" });
  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    const order = place({ items, total, customer: form });
    clear();
    navigate({ to: "/account/orders", search: { placed: order.id } as never });
  }

  if (items.length === 0) {
    return <div className="mx-auto max-w-md py-24 text-center text-muted-foreground">Your cart is empty.</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 font-semibold">Customer Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <input required placeholder="Full name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </section>
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 font-semibold"><Truck className="h-4 w-4" /> Shipping Address</h2>
            <div className="grid gap-4">
              <input required placeholder="Street address" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <div className="grid gap-4 md:grid-cols-3">
                <input required placeholder="City" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                <input required placeholder="ZIP" value={form.zip} onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))} className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                <input required placeholder="Country" value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
          </section>
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 font-semibold">Payment Method</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {([["card", "Card", CreditCard], ["paypal", "PayPal", Wallet], ["cod", "Cash on Delivery", Truck]] as const).map(([id, label, Icon]) => (
                <button type="button" key={id} onClick={() => setPayment(id)} className={`flex items-center gap-3 rounded-xl border p-4 text-sm ${payment === id ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"}`}>
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </div>
            {payment === "card" && (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <input placeholder="Card number" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none md:col-span-2" />
                <input placeholder="MM / YY" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none" />
                <input placeholder="CVC" className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none" />
              </div>
            )}
            <p className="mt-3 text-xs text-muted-foreground">Payment UI is for demo only — no card is charged.</p>
          </section>
        </div>
        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold">Order Summary</h2>
          <div className="mt-3 max-h-64 space-y-2 overflow-auto">
            {items.map((i) => (
              <div key={i.productId} className="flex items-center gap-3 text-sm">
                <img src={i.image} alt="" className="h-12 w-12 rounded-md object-cover" />
                <div className="flex-1 truncate">{i.title} × {i.quantity}</div>
                <span>${(i.price * i.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd></div>
            <div className="flex justify-between text-base font-semibold"><dt>Total</dt><dd>${total.toFixed(2)}</dd></div>
          </dl>
          <button className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground hover:opacity-90">Place Order</button>
        </aside>
      </form>
    </div>
  );
}