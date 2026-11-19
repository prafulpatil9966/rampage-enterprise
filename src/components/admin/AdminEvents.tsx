"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type EventRecord = {
  id: string;
  title: string;
  description: string;
  event_date: string | null;
  published: boolean;
  created_at: string;
  event_media: Array<{
    id: string;
    media_type: "image" | "video";
    storage_path: string;
  }>;
};

function mediaUrl(storagePath: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event-media/${storagePath}`;
}

export function AdminEvents({
  initialEvents,
  email,
}: {
  initialEvents: EventRecord[];
  email: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [published, setPublished] = useState(true);
  const [media, setMedia] = useState<FileList | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editPublished, setEditPublished] = useState(true);
  const [editMedia, setEditMedia] = useState<FileList | null>(null);
  const [removedMediaIds, setRemovedMediaIds] = useState<string[]>([]);

  async function createEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("description", description);
      formData.set("event_date", eventDate);
      formData.set("published", String(published));
      Array.from(media || []).forEach((file) => formData.append("media", file));

      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });
      const text = await response.text();
      let payload: { error?: string } = {};
      if (text) {
        try {
          payload = JSON.parse(text) as { error?: string };
        } catch {
          throw new Error("The server returned an invalid response. The upload may be too large.");
        }
      }
      if (!response.ok) {
        throw new Error(payload.error || "The event could not be created.");
      }

      setTitle("");
      setDescription("");
      setEventDate("");
      setMedia(null);
      setPublished(true);
      event.currentTarget.reset();
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "The event could not be created.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteEvent(id: string) {
    if (!window.confirm("Delete this event and all of its media?")) return;

    const response = await fetch(`/api/events?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const payload = await response.json();
      setError(payload.error || "The event could not be deleted.");
      return;
    }
    router.refresh();
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  function setSelectedFiles(files: FileList | null) {
    setMedia(files);
  }

  function startEditing(event: EventRecord) {
    setEditingId(event.id);
    setEditTitle(event.title);
    setEditDescription(event.description);
    setEditDate(event.event_date || "");
    setEditPublished(event.published);
    setEditMedia(null);
    setRemovedMediaIds([]);
    setError("");
  }

  function cancelEditing() {
    setEditingId(null);
    setEditMedia(null);
    setRemovedMediaIds([]);
  }

  async function saveEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId) return;
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.set("id", editingId);
      formData.set("title", editTitle);
      formData.set("description", editDescription);
      formData.set("event_date", editDate);
      formData.set("published", String(editPublished));
      formData.set("remove_media_ids", removedMediaIds.join(","));
      Array.from(editMedia || []).forEach((file) => formData.append("media", file));

      const response = await fetch("/api/events", { method: "PATCH", body: formData });
      const text = await response.text();
      let payload: { error?: string } = {};
      if (text) payload = JSON.parse(text) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "The event could not be updated.");

      cancelEditing();
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "The event could not be updated.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">Administration</p>
          <h1 className="mt-2 font-display text-4xl text-ink">Events</h1>
          <p className="mt-2 text-sm text-grey">{email}</p>
        </div>
        <button type="button" onClick={signOut} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-ink hover:bg-beige">
          Sign out
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={createEvent} className="h-fit rounded-[2rem] border border-border bg-beige p-6 text-ink lg:p-8">
          <h2 className="font-display text-2xl">Add a new event</h2>

          <label className="mt-6 block text-sm font-semibold" htmlFor="title">Event name</label>
          <input id="title" required maxLength={160} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Corporate Annual Event 2026" className="mt-2 w-full rounded-xl border border-border bg-cream px-4 py-3 outline-none placeholder:text-grey/70 focus:border-taupe" />

          <label className="mt-5 block text-sm font-semibold" htmlFor="event-date">Event date</label>
          <input id="event-date" type="date" value={eventDate} onChange={(event) => setEventDate(event.target.value)} className="mt-2 w-full rounded-xl border border-border bg-cream px-4 py-3 outline-none focus:border-taupe" />

          <label className="mt-5 block text-sm font-semibold" htmlFor="description">Event description</label>
          <textarea id="description" rows={4} maxLength={3000} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Security management and surveillance coverage." className="mt-2 w-full resize-y rounded-xl border border-border bg-cream px-4 py-3 outline-none placeholder:text-grey/70 focus:border-taupe" />

          <label className="mt-5 block text-sm font-semibold" htmlFor="media">Upload event photos/videos</label>
          <label
            htmlFor="media"
            onDragEnter={(event) => { event.preventDefault(); setDragActive(true); }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setDragActive(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragActive(false);
              setSelectedFiles(event.dataTransfer.files);
            }}
            className={`mt-2 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 text-center transition-colors ${
              dragActive ? "border-taupe bg-cream" : "border-border bg-cream"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
              <path d="M7 18a4.5 4.5 0 0 1-.9-8.9A6 6 0 0 1 17.7 8.2 4.9 4.9 0 0 1 18 18h-1" />
              <path d="M12 19V10m0 0-3 3m3-3 3 3" />
            </svg>
            <span className="mt-2 text-sm font-semibold">Drag files here or browse</span>
            <span className="mt-1 text-xs text-grey">JPG, PNG, MP4, WEBM</span>
          </label>
          <input id="media" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime" onChange={(event) => setSelectedFiles(event.currentTarget.files)} className="sr-only" />
          {media?.length ? (
            <p className="mt-2 text-xs text-taupe-dark">{media.length} file(s) selected</p>
          ) : (
            <p className="mt-2 text-xs text-grey">Up to 20 files. Each file must be 50 MB or smaller.</p>
          )}

          <label className="mt-5 flex items-center gap-3 text-sm font-semibold">
            <input type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} className="h-4 w-4 accent-[#14100c]" />
            Publish on website
            {published && <span className="ml-auto text-xs font-bold text-taupe-dark">Enabled</span>}
          </label>

          {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="mt-6 w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-taupe-dark disabled:opacity-60">
            {loading ? "Publishing Event..." : "Publish Event"}
          </button>
        </form>

        <div>
          <h2 className="font-display text-2xl text-ink">Existing events</h2>
          {initialEvents.length === 0 ? (
            <p className="mt-5 rounded-2xl border border-border p-6 text-sm text-grey">No events have been added yet.</p>
          ) : (
            <div className="mt-5 space-y-4">
              {initialEvents.map((event) => (
                <article key={event.id} className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-beige p-5">
                  {editingId === event.id ? (
                    <form onSubmit={saveEvent} className="w-full">
                      <h3 className="font-display text-xl text-ink">Edit event</h3>
                      <label className="mt-4 block text-sm font-semibold" htmlFor={`edit-title-${event.id}`}>Event name</label>
                      <input id={`edit-title-${event.id}`} required maxLength={160} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-cream px-4 py-3 outline-none focus:border-taupe" />

                      <label className="mt-4 block text-sm font-semibold" htmlFor={`edit-date-${event.id}`}>Event date</label>
                      <input id={`edit-date-${event.id}`} type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-cream px-4 py-3 outline-none focus:border-taupe" />

                      <label className="mt-4 block text-sm font-semibold" htmlFor={`edit-description-${event.id}`}>Event description</label>
                      <textarea id={`edit-description-${event.id}`} rows={3} maxLength={3000} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="mt-2 w-full resize-y rounded-xl border border-border bg-cream px-4 py-3 outline-none focus:border-taupe" />

                      {event.event_media.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold">Existing media</p>
                          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {event.event_media.filter((item) => !removedMediaIds.includes(item.id)).map((item) => (
                              <div key={item.id} className="relative">
                                {item.media_type === "video" ? (
                                  <video src={mediaUrl(item.storage_path)} muted preload="metadata" className="h-20 w-full rounded-lg bg-ink object-cover" />
                                ) : (
                                  <div className="relative h-20 overflow-hidden rounded-lg bg-beige">
                                    <Image src={mediaUrl(item.storage_path)} alt="" fill sizes="120px" className="object-cover" />
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={() => setRemovedMediaIds((ids) => [...ids, item.id])}
                                  className="absolute right-1 top-1 rounded-full bg-ink px-2 py-1 text-xs font-bold text-cream"
                                  aria-label="Remove media"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <label className="mt-4 block text-sm font-semibold" htmlFor={`edit-media-${event.id}`}>Add photos or videos</label>
                      <input
                        id={`edit-media-${event.id}`}
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
                        onChange={(e) => setEditMedia(e.currentTarget.files)}
                        className="mt-2 block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cream"
                      />

                      <label className="mt-4 flex items-center gap-3 text-sm font-semibold">
                        <input type="checkbox" checked={editPublished} onChange={(e) => setEditPublished(e.target.checked)} className="h-4 w-4 accent-[#14100c]" />
                        Publish on website
                      </label>

                      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
                      <div className="mt-5 flex gap-3">
                        <button type="submit" disabled={loading} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream disabled:opacity-60">
                          {loading ? "Saving..." : "Save changes"}
                        </button>
                        <button type="button" onClick={cancelEditing} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-ink">
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                  <>
                  {event.event_media?.[0] ? (
                    event.event_media[0].media_type === "video" ? (
                      <video
                        src={mediaUrl(event.event_media[0].storage_path)}
                        muted
                        preload="metadata"
                        className="h-20 w-24 shrink-0 rounded-xl bg-ink object-cover"
                        aria-label={`Video thumbnail for ${event.title}`}
                      />
                    ) : (
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-beige">
                        <Image
                          src={mediaUrl(event.event_media[0].storage_path)}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl border border-border bg-cream text-xs text-grey">
                      No media
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink">{event.title}</p>
                    {event.event_date && <p className="mt-1 text-xs text-grey">{event.event_date}</p>}
                    {event.description && <p className="mt-2 line-clamp-2 text-sm text-grey">{event.description}</p>}
                    <p className={`mt-3 text-xs font-semibold ${event.published ? "text-green-700" : "text-grey"}`}>
                      {event.published ? "Published" : "Draft"}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <button type="button" onClick={() => startEditing(event)} className="rounded-full border border-border px-3 py-2 text-xs font-semibold text-ink hover:bg-cream">
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteEvent(event.id)} className="rounded-full border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                  </>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
