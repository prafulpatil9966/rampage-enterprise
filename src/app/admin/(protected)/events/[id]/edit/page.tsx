import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdministrator } from "@/lib/supabase/auth";
import type { EventRecord } from "@/lib/events";
import { EventForm } from "../../EventForm";

export const metadata: Metadata = { title: "Edit Event" };

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireAdministrator();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-taupe">Edit</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Edit Event</h1>
      <EventForm event={data as EventRecord} />
    </div>
  );
}
