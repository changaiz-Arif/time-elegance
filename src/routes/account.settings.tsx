import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/account/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Chronova" },
      { name: "description", content: "Account settings." },
      { property: "og:title", content: "Settings" },
      { property: "og:description", content: "Chronova account settings." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-semibold">Settings</h2>
      <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }} className="mt-4 space-y-4">
        <label className="flex items-center justify-between text-sm">
          <span>Email me about promotions</span>
          <input type="checkbox" defaultChecked className="rounded" />
        </label>
        <label className="flex items-center justify-between text-sm">
          <span>Order shipment updates</span>
          <input type="checkbox" defaultChecked className="rounded" />
        </label>
        <button className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">Save preferences</button>
        {saved && <p className="text-sm text-emerald-600">Preferences saved.</p>}
      </form>
    </div>
  );
}