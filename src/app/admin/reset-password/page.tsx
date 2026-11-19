import type { Metadata } from "next";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-ink px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <section className="w-full rounded-lg border border-white/10 bg-cream p-7 shadow-2xl sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-taupe">
            Rampage Enterprise
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink">Set new password</h1>
          <p className="mt-3 text-sm leading-relaxed text-grey">
            Enter a new password for the authorized administrator account.
          </p>
          <ResetPasswordForm />
        </section>
      </div>
    </main>
  );
}
