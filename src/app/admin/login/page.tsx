"use client";

import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Sign-in failed.");

      const nextPath = searchParams.get("next") || "/admin";
      window.location.replace(nextPath);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 pt-24">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[2rem] border border-border bg-beige p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">Rampage Admin</p>
        <h1 className="mt-3 font-display text-4xl">Event dashboard</h1>
        <label className="mt-8 block text-sm font-semibold" htmlFor="email">Email</label>
        <input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-cream px-4 py-3 outline-none focus:border-taupe" />
        <label className="mt-5 block text-sm font-semibold" htmlFor="password">Password</label>
        <input id="password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-cream px-4 py-3 outline-none focus:border-taupe" />
        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={loading} className="mt-6 w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream disabled:opacity-60">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] pt-28 text-center">Loading...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
