"use client";

import { useActionState } from "react";
import { resetPasswordAction } from "./actions";

export function ResetPasswordForm() {
  const [error, formAction, pending] = useActionState(resetPasswordAction, null);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-ink">
          New password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className="mt-2 h-12 w-full rounded-lg border border-border bg-cream px-4 text-sm text-ink outline-none focus:border-taupe focus:ring-2 focus:ring-taupe/20"
        />
      </div>

      <div>
        <label htmlFor="confirmation" className="block text-sm font-semibold text-ink">
          Confirm password
        </label>
        <input
          id="confirmation"
          name="confirmation"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          className="mt-2 h-12 w-full rounded-lg border border-border bg-cream px-4 text-sm text-ink outline-none focus:border-taupe focus:ring-2 focus:ring-taupe/20"
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
        className="flex h-12 w-full items-center justify-center rounded-lg bg-ink px-5 text-sm font-semibold text-cream disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}
