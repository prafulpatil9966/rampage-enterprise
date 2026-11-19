import type { Metadata } from "next";
import { EventForm } from "../EventForm";

export const metadata: Metadata = { title: "Add Event" };

export default function NewEventPage() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-taupe">Create</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Add New Event</h1>
      <EventForm />
    </div>
  );
}
