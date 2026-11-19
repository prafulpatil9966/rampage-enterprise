"use client";

import { useState } from "react";
import type { EventRecord } from "@/lib/events";
import { saveEventAction } from "./actions";

export function EventForm({ event }: { event?: EventRecord }) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    try {
      await saveEventAction(event?.id ?? null, formData);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to save the event.");
    }
  }

  return (
    <form action={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="rounded-lg border border-[#ddd6cc] bg-white p-5 sm:p-7">
        <div>
          <label htmlFor="title" className="text-sm font-semibold text-ink">Event title</label>
          <input
            id="title"
            name="title"
            required
            defaultValue={event?.title ?? ""}
            className="mt-2 h-12 w-full rounded-md border border-[#d8d0c4] px-4 text-sm outline-none focus:border-taupe focus:ring-2 focus:ring-taupe/20"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="description" className="text-sm font-semibold text-ink">Description</label>
          <textarea
            id="description"
            name="description"
            rows={7}
            defaultValue={event?.description ?? ""}
            className="mt-2 w-full resize-y rounded-md border border-[#d8d0c4] px-4 py-3 text-sm outline-none focus:border-taupe focus:ring-2 focus:ring-taupe/20"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="cover_image" className="text-sm font-semibold text-ink">Cover image URL</label>
          <input
            id="cover_image"
            name="cover_image"
            type="url"
            defaultValue={event?.cover_image ?? ""}
            placeholder="https://..."
            className="mt-2 h-12 w-full rounded-md border border-[#d8d0c4] px-4 text-sm outline-none focus:border-taupe focus:ring-2 focus:ring-taupe/20"
          />
          <p className="mt-2 text-xs text-grey">Direct storage upload will be enabled in the media phase.</p>
        </div>

        {error ? <p role="alert" className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p> : null}
      </section>

      <aside className="h-fit rounded-lg border border-[#ddd6cc] bg-white p-5 sm:p-6">
        <label htmlFor="event_date" className="text-sm font-semibold text-ink">Event date</label>
        <input
          id="event_date"
          name="event_date"
          type="date"
          defaultValue={event?.event_date ?? ""}
          className="mt-2 h-12 w-full rounded-md border border-[#d8d0c4] px-4 text-sm outline-none focus:border-taupe focus:ring-2 focus:ring-taupe/20"
        />

        <div className="mt-6 space-y-4">
          <label className="flex items-center gap-3 text-sm font-medium">
            <input type="checkbox" name="is_published" defaultChecked={event?.is_published ?? false} className="h-4 w-4 accent-[#6f5a44]" />
            Published
          </label>
          <label className="flex items-center gap-3 text-sm font-medium">
            <input type="checkbox" name="is_featured" defaultChecked={event?.is_featured ?? false} className="h-4 w-4 accent-[#6f5a44]" />
            Featured event
          </label>
        </div>

        <button type="submit" className="mt-8 h-11 w-full rounded-md bg-ink text-sm font-semibold text-cream transition hover:bg-taupe-dark">
          {event ? "Save changes" : "Create event"}
        </button>
      </aside>
    </form>
  );
}
