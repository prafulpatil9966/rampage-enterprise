"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteEventAction, togglePublishedAction } from "./actions";

export function EventRowActions({
  eventId,
  isPublished,
}: {
  eventId: string;
  isPublished: boolean;
}) {
  const [pending, startTransition] = useTransition();

  function confirmDelete() {
    if (!window.confirm("Delete this event and all associated media?")) return;
    startTransition(async () => {
      await deleteEventAction(eventId);
    });
  }

  function togglePublished() {
    startTransition(async () => {
      await togglePublishedAction(eventId, !isPublished);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link href={`/admin/events/${eventId}/edit`} className="rounded-md border border-[#ddd6cc] px-3 py-2 text-xs font-semibold hover:bg-[#f6f2ec]">
        Edit
      </Link>
      <button type="button" disabled={pending} onClick={togglePublished} className="rounded-md border border-[#ddd6cc] px-3 py-2 text-xs font-semibold hover:bg-[#f6f2ec] disabled:opacity-50">
        {isPublished ? "Unpublish" : "Publish"}
      </button>
      <button type="button" disabled={pending} onClick={confirmDelete} className="rounded-md border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50">
        Delete
      </button>
    </div>
  );
}
