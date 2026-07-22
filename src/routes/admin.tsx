import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, TrendingUp, DollarSign } from "lucide-react";
import { useState } from "react";
import { products } from "@/lib/products";
import { useOrders } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Chronova" },
      { name: "description", content: "Admin dashboard (UI-only mock)." },
      { property: "og:title", content: "Admin — Chronova" },
      { property: "og:description", content: "Store admin dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [tab, setTab] = useState<"dashboard" | "products" | "orders" | "customers" | "analytics" | "settings">("dashboard");
  const orders = useOrders((s) => s.orders);
  const revenue = orders.reduce((n, o) => n + o.total, 0);

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "products" as const, label: "Products", icon: Package },
    { id: "orders" as const, label: "Orders", icon: ShoppingCart },
    { id: "customers" as const, label: "Customers", icon: Users },
    { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin</h1>
          <p className="text-sm text-muted-foreground">Chronova store dashboard (UI-only mock)</p>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${tab === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"}`}>
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </aside>
        <div>
          {tab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  { l: "Revenue", v: `$${revenue.toFixed(0)}`, i: DollarSign },
                  { l: "Orders", v: orders.length, i: ShoppingCart },
                  { l: "Products", v: products.length, i: Package },
                  { l: "Growth", v: "+18%", i: TrendingUp },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between text-muted-foreground"><span className="text-xs uppercase">{s.l}</span><s.i className="h-4 w-4" /></div>
                    <p className="mt-2 text-2xl font-bold">{s.v}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold">Sales this week</h3>
                <div className="flex h-40 items-end gap-2">
                  {[40, 65, 55, 80, 70, 90, 60].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-[image:var(--gradient-primary)]" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
              </div>
            </div>
          )}
          {tab === "products" && (
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50 text-xs uppercase text-muted-foreground"><tr><th className="p-3 text-left">Product</th><th className="p-3 text-left">Brand</th><th className="p-3 text-left">Price</th><th className="p-3 text-left">Stock</th></tr></thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-border">
                      <td className="flex items-center gap-3 p-3"><img src={p.images[0]} alt="" className="h-10 w-10 rounded object-cover" />{p.title}</td>
                      <td className="p-3">{p.brand}</td>
                      <td className="p-3">${p.price}</td>
                      <td className="p-3">{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === "orders" && (
            <div className="rounded-2xl border border-border bg-card p-6">
              {orders.length === 0 ? <p className="text-sm text-muted-foreground">No orders yet.</p> : (
                <ul className="space-y-3 text-sm">
                  {orders.map((o) => (
                    <li key={o.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                      <div><p className="font-semibold">{o.id}</p><p className="text-xs text-muted-foreground">{o.customer.name} · {new Date(o.createdAt).toLocaleDateString()}</p></div>
                      <span className="font-semibold">${o.total.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {tab === "customers" && (
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">Customer directory placeholder — connect Lovable Cloud to populate.</div>
          )}
          {tab === "analytics" && (
            <div className="grid gap-4 md:grid-cols-2">
              {["Traffic", "Conversion", "AOV", "Repeat Rate"].map((k) => (
                <div key={k} className="rounded-2xl border border-border bg-card p-6">
                  <p className="text-xs uppercase text-muted-foreground">{k}</p>
                  <p className="mt-2 text-2xl font-bold">{Math.floor(Math.random() * 100)}%</p>
                </div>
              ))}
            </div>
          )}
          {tab === "settings" && (
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">Store settings placeholder.</div>
          )}
        </div>
      </div>
    </div>
  );
}