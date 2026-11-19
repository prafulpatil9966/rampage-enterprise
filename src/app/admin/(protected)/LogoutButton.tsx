"use client";

import { useTransition } from "react";
import { logoutAction } from "./actions";

export function LogoutButton({ email }: { email: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="mt-4">
      <p className="mb-2 truncate px-3 text-xs text-cream/50" title={email}>{email}</p>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => logoutAction())}
        className="w-full rounded-md px-3 py-2.5 text-left text-sm text-cream/75 transition hover:bg-white/10 hover:text-cream disabled:opacity-60"
      >
        {pending ? "Signing out..." : "Logout"}
      </button>
    </div>
  );
}
