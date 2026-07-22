import { createFileRoute, Link, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Chronova" },
      { name: "description", content: "Manage your profile, orders, and settings." },
      { property: "og:title", content: "My Account — Chronova" },
      { property: "og:description", content: "Manage your Chronova account." },
    ],
  }),
  component: Account,
});

function Account() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => { if (!loading && !user) navigate({ to: "/login" }); }, [user, loading, navigate]);
  if (loading || !user) return <div className="mx-auto max-w-md py-24 text-center text-muted-foreground">Loading…</div>;

  const links = [
    { to: "/account" as const, label: "Profile", icon: User },
    { to: "/account/orders" as const, label: "Orders", icon: Package },
    { to: "/wishlist" as const, label: "Wishlist", icon: Heart },
    { to: "/account/settings" as const, label: "Settings", icon: Settings },
  ];
  const isProfile = pathname === "/account";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="text-3xl font-bold">My Account</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${pathname === to ? "bg-secondary font-medium" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"}`}>
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
          <button onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-destructive">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </aside>
        <div>
          {isProfile ? (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold">Profile</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between border-b border-border pb-2"><dt className="text-muted-foreground">Name</dt><dd>{(user.user_metadata as { full_name?: string })?.full_name ?? "—"}</dd></div>
                <div className="flex justify-between border-b border-border pb-2"><dt className="text-muted-foreground">Email</dt><dd>{user.email}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Member since</dt><dd>{new Date(user.created_at).toLocaleDateString()}</dd></div>
              </dl>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}