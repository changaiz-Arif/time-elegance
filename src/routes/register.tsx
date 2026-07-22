import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — Chronova" },
      { name: "description", content: "Create your Chronova account." },
      { property: "og:title", content: "Create account — Chronova" },
      { property: "og:description", content: "Join Chronova." },
    ],
  }),
  component: Register,
});

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name }, emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) { setErr(error.message); return; }
    if (data.session) navigate({ to: "/account" });
    else setOk(true);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 md:px-6">
      <h1 className="text-3xl font-bold">Create account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Join Chronova to save your favorites and orders.</p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <input required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        <input required minLength={6} type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        {err && <p className="text-sm text-destructive">{err}</p>}
        {ok && <p className="text-sm text-emerald-600">Check your email to confirm your account.</p>}
        <button disabled={loading} className="h-11 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50">{loading ? "Creating…" : "Create account"}</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
      </p>
    </div>
  );
}