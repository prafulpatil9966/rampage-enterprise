"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdministrator } from "@/lib/supabase/auth";
import { makeSlug } from "@/lib/events";

export async function saveEventAction(eventId: string | null, formData: FormData) {
  const { supabase } = await requireAdministrator();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const eventDate = String(formData.get("event_date") ?? "").trim() || null;
  const coverImage = String(formData.get("cover_image") ?? "").trim() || null;
  const isPublished = formData.get("is_published") === "on";
  const isFeatured = formData.get("is_featured") === "on";

  if (!title) {
    throw new Error("Event title is required.");
  }

  const baseSlug = makeSlug(title);
  if (!baseSlug) {
    throw new Error("Event title must contain letters or numbers.");
  }

  const payload = {
    title,
    description,
    event_date: eventDate,
    cover_image: coverImage,
    is_published: isPublished,
    is_featured: isFeatured,
  };

  let savedId = eventId;

  if (eventId) {
    const { error } = await supabase
      .from("events")
      .update(payload)
      .eq("id", eventId);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    let slug = baseSlug;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const { data, error } = await supabase
        .from("events")
        .insert({ ...payload, slug })
        .select("id")
        .single();

      if (!error && data) {
        savedId = data.id;
        break;
      }

      if (error && error.code !== "23505") {
        throw new Error(error.message);
      }

      slug = `${baseSlug}-${Date.now().toString().slice(-6)}-${attempt + 1}`;
    }

    if (!savedId) {
      throw new Error("Unable to create a unique event slug.");
    }
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect(`/admin/events/${savedId}/edit`);
}

export async function togglePublishedAction(eventId: string, isPublished: boolean) {
  const { supabase } = await requireAdministrator();
  const { error } = await supabase
    .from("events")
    .update({ is_published: isPublished })
    .eq("id", eventId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function deleteEventAction(eventId: string) {
  const { supabase } = await requireAdministrator();
  const { data: media } = await supabase
    .from("event_media")
    .select("storage_path")
    .eq("event_id", eventId);

  const { error } = await supabase.from("events").delete().eq("id", eventId);
  if (error) {
    throw new Error(error.message);
  }

  if (media?.length) {
    const storagePaths = media
      .map((item) => item.storage_path)
      .filter((path): path is string => Boolean(path));

    if (storagePaths.length) {
      const { error: storageError } = await supabase.storage
        .from("rampage-events")
        .remove(storagePaths);

      if (storageError) {
        throw new Error(`Event deleted, but file cleanup failed: ${storageError.message}`);
      }
    }
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events");
}
