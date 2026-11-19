import Image from "next/image";
import Link from "next/link";
import { requireAdministrator } from "@/lib/supabase/auth";
import type { EventRecord } from "@/lib/events";
import { EventRowActions } from "./EventRowActions";

export default async function EventsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { supabase } = await requireAdministrator();
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const status = params.status ?? "all";

  let eventsQuery = supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (status === "published") eventsQuery = eventsQuery.eq("is_published", true);
  if (status === "draft") eventsQuery = eventsQuery.eq("is_published", false);
  if (query) eventsQuery = eventsQuery.ilike("title", `%${query}%`);

  const [{ data: events }, { count: mediaCount }] = await Promise.all([
    eventsQuery,
    supabase.from("event_media").select("id", { count: "exact", head: true }),
  ]);

  const eventRows = (events ?? []) as EventRecord[];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-taupe">Content</p>
          <h1 className="mt-2 font-display text-4xl text-ink">Manage Events</h1>
        </div>
        <Link href="/admin/events/new" className="inline-flex h-11 items-center justify-center rounded-md bg-ink px-5 text-sm font-semibold text-cream hover:bg-taupe-dark">
          Add New Event
        </Link>
      </div>

      <form className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input name="q" defaultValue={query} placeholder="Search events" className="h-11 min-w-0 flex-1 rounded-md border border-[#ddd6cc] bg-white px-4 text-sm outline-none focus:border-taupe" />
        <select name="status" defaultValue={status} className="h-11 rounded-md border border-[#ddd6cc] bg-white px-3 text-sm">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button type="submit" className="h-11 rounded-md border border-[#ddd6cc] bg-white px-5 text-sm font-semibold">Filter</button>
      </form>

      <div className="mt-6 overflow-hidden rounded-lg border border-[#ddd6cc] bg-white">
        {eventRows.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-display text-2xl">No events found</p>
            <p className="mt-2 text-sm text-grey">Create an event or adjust the active filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#eee8df]">
            {eventRows.map((event) => (
              <article key={event.id} className="grid gap-4 p-5 md:grid-cols-[72px_minmax(0,1fr)_auto] md:items-center">
                <div className="h-16 w-full overflow-hidden rounded-md bg-[#e7dfd4] md:w-[72px]">
                  {event.cover_image ? (
                    <Image src={event.cover_image} alt="" fill sizes="72px" className="object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-xl">{event.title}</p>
                  <p className="mt-1 text-xs text-grey">
                    {event.event_date ?? "Date not set"} · {mediaCount ?? 0} total media
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${event.is_published ? "bg-green-100 text-green-800" : "bg-[#eee8df] text-grey"}`}>
                      {event.is_published ? "Published" : "Draft"}
                    </span>
                    {event.is_featured ? <span className="rounded-full bg-[#eadfce] px-2 py-1 text-[10px] font-bold uppercase text-taupe-dark">Featured</span> : null}
                  </div>
                </div>
                <EventRowActions eventId={event.id} isPublished={event.is_published} />
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
