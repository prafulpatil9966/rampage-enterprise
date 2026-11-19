import Link from "next/link";
import { requireAdministrator } from "@/lib/supabase/auth";
import { LogoutButton } from "./LogoutButton";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/events", label: "Manage Events" },
  { href: "/admin/events/new", label: "Add New Event" },
];

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await requireAdministrator();

  return (
    <div className="min-h-screen bg-[#f2eee8] text-ink lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="border-b border-[#ddd6cc] bg-ink px-5 py-4 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-6 lg:py-7">
        <div className="flex items-center justify-between lg:block">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-taupe">Rampage</p>
            <p className="mt-1 font-display text-xl text-cream">Admin Panel</p>
          </div>
          <nav className="hidden gap-2 lg:mt-10 lg:flex lg:flex-col" aria-label="Admin navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-cream/75 transition hover:bg-white/10 hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 hidden border-t border-white/10 pt-5 lg:block">
          <Link href="/" className="block rounded-md px-3 py-2.5 text-sm text-cream/75 hover:bg-white/10 hover:text-cream">
            View Website
          </Link>
          <LogoutButton email={user.email ?? "Administrator"} />
        </div>
      </aside>

      <div className="min-w-0">
        <header className="flex h-16 items-center justify-between border-b border-[#ddd6cc] bg-white px-5 sm:px-8">
          <p className="text-sm font-semibold">Administrator</p>
          <p className="max-w-[180px] truncate text-xs text-grey sm:max-w-none">{user.email}</p>
        </header>
        <main className="p-5 sm:p-8 lg:p-10">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-[#ddd6cc] bg-white px-2 py-2 lg:hidden" aria-label="Mobile admin navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="px-1 py-2 text-center text-[11px] font-semibold text-ink">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
