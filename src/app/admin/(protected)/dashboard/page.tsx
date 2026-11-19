import type { Metadata } from "next";
import Link from "next/link";
import { requireAdministrator } from "@/lib/supabase/auth";
import type { EventRecord } from "@/lib/events";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdministrator();

  const [totalEvents, publishedEvents, draftEvents, images, videos, recent] = await Promise.all([
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase.from("events").select("id", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("events").select("id", { count: "exact", head: true }).eq("is_published", false),
    supabase.from("event_media").select("id", { count: "exact", head: true }).eq("media_type", "image"),
    supabase.from("event_media").select("id", { count: "exact", head: true }).eq("media_type", "video"),
    supabase.from("events").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const cards = [
    ["Total Events", totalEvents.count ?? 0],
    ["Published", publishedEvents.count ?? 0],
    ["Drafts", draftEvents.count ?? 0],
    ["Images", images.count ?? 0],
    ["Videos", videos.count ?? 0],
  ];
  const recentEvents = (recent.data ?? []) as EventRecord[];

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-taupe">Overview</p>
          <h1 className="mt-2 font-display text-4xl text-ink">Dashboard</h1>
        </div>
        <Link href="/admin/events/new" className="hidden h-11 items-center rounded-md bg-ink px-5 text-sm font-semibold text-cream sm:inline-flex">
          Add Event
        </Link>
      </div>

      <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {cards.map(([label, value]) => (
          <article key={String(label)} className="rounded-lg border border-[#ddd6cc] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-grey">{String(label)}</p>
            <p className="mt-3 font-display text-4xl text-ink">{value}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-lg border border-[#ddd6cc] bg-white">
        <div className="flex items-center justify-between border-b border-[#eee8df] px-5 py-4">
          <h2 className="font-display text-xl">Recent Events</h2>
          <Link href="/admin/events" className="text-sm font-semibold text-taupe-dark">View all</Link>
        </div>
        {recentEvents.length ? (
          <div className="divide-y divide-[#eee8df]">
            {recentEvents.map((event) => (
              <Link key={event.id} href={`/admin/events/${event.id}/edit`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-[#faf8f5]">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{event.title}</p>
                  <p className="mt-1 text-xs text-grey">{event.event_date ?? "Date not set"}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold uppercase ${event.is_published ? "bg-green-100 text-green-800" : "bg-[#eee8df] text-grey"}`}>
                  {event.is_published ? "Published" : "Draft"}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="px-5 py-12 text-center text-sm text-grey">No events have been created.</p>
        )}
      </section>
    </div>
  );
}
