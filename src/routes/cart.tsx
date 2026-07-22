import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Chronova" },
      { name: "description", content: "Review your selected timepieces." },
      { property: "og:title", content: "Your Cart — Chronova" },
      { property: "og:description", content: "Review and checkout your selection." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md py-24 text-center">
        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary"><ShoppingBag className="h-6 w-6 text-muted-foreground" /></div>
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Start browsing our collection.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">Shop watches</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((i) => (
            <div key={i.productId} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
              <img src={i.image} alt={i.title} className="h-24 w-24 rounded-lg object-cover" />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{i.brand}</p>
                    <Link to="/product/$slug" params={{ slug: i.slug }} className="font-semibold hover:text-primary">{i.title}</Link>
                  </div>
                  <button onClick={() => remove(i.productId)} aria-label="Remove" className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-border">
                    <button onClick={() => setQty(i.productId, i.quantity - 1)} className="p-1.5 hover:bg-secondary rounded-l-full"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm">{i.quantity}</span>
                    <button onClick={() => setQty(i.productId, i.quantity + 1)} className="p-1.5 hover:bg-secondary rounded-r-full"><Plus className="h-3 w-3" /></button>
                  </div>
                  <span className="font-semibold">${(i.price * i.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold">Order Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd></div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-semibold"><dt>Total</dt><dd>${total.toFixed(2)}</dd></div>
          </dl>
          <Link to="/checkout" className="mt-6 block rounded-full bg-primary py-3 text-center text-sm font-medium text-primary-foreground hover:opacity-90">Proceed to Checkout</Link>
          <Link to="/shop" className="mt-2 block text-center text-xs text-muted-foreground hover:text-foreground">or continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}