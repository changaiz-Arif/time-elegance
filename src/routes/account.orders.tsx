import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { useOrders } from "@/lib/store";

export const Route = createFileRoute("/account/orders")({
  head: () => ({
    meta: [
      { title: "Order History — Chronova" },
      { name: "description", content: "View your past orders." },
      { property: "og:title", content: "Order History" },
      { property: "og:description", content: "Your Chronova orders." },
    ],
  }),
  component: Orders,
});

function Orders() {
  const orders = useOrders((s) => s.orders);
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-12 text-center">
        <Package className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 text-muted-foreground">No orders yet.</p>
        <Link to="/shop" className="mt-4 inline-block text-primary hover:underline">Start shopping →</Link>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <div key={o.id} className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold">{o.id}</p>
              <p className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">{o.status}</span>
          </div>
          <div className="mt-4 space-y-2">
            {o.items.map((i) => (
              <div key={i.productId} className="flex items-center gap-3 text-sm">
                <img src={i.image} alt="" className="h-12 w-12 rounded-md object-cover" />
                <div className="flex-1">{i.title} × {i.quantity}</div>
                <span>${(i.price * i.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-3 text-sm font-semibold">
            <span>Total</span><span>${o.total.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}