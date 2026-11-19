"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { loginAction } from "./actions";

export function LoginForm() {
  const [error, formAction, pending] = useActionState(loginAction, null);
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("type=recovery") && !hash.includes("access_token=")) {
      return;
    }

    const supabase = createClient();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        window.history.replaceState(null, "", "/admin/reset-password");
        router.replace("/admin/reset-password");
      }
    });

    void supabase.auth.getSession().then(({ data: sessionData }) => {
      if (sessionData.session) {
        window.history.replaceState(null, "", "/admin/reset-password");
        router.replace("/admin/reset-password");
      }
    });

    return () => data.subscription.unsubscribe();
  }, [router]);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-ink">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 h-12 w-full rounded-lg border border-border bg-cream px-4 text-sm text-ink outline-none transition focus:border-taupe focus:ring-2 focus:ring-taupe/20"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 h-12 w-full rounded-lg border border-border bg-cream px-4 text-sm text-ink outline-none transition focus:border-taupe focus:ring-2 focus:ring-taupe/20"
        />
      </div>

      {error ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full items-center justify-center rounded-lg bg-ink px-5 text-sm font-semibold text-cream transition hover:bg-taupe-dark disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
