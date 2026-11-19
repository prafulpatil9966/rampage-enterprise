import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  return profile?.is_admin ? supabase : null;
}

export async function POST(request: NextRequest) {
  const supabase = await requireAdmin();
  if (!supabase) return NextResponse.json({ error: "Admin access required." }, { status: 401 });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "The upload request is too large or incomplete. Try smaller or fewer video files." },
      { status: 413 },
    );
  }
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const eventDate = String(formData.get("event_date") || "") || null;
  const published = formData.get("published") !== "false";
  const files = formData.getAll("media").filter((value): value is File => value instanceof File);

  if (title.length < 1 || title.length > 160) {
    return NextResponse.json({ error: "Enter an event title of 1 to 160 characters." }, { status: 400 });
  }
  if (files.length > 20) {
    return NextResponse.json({ error: "Upload no more than 20 media files." }, { status: 400 });
  }

  const { data: event, error: eventError } = await supabase
    .from("events")
    .insert({ title, description, event_date: eventDate, published })
    .select("id")
    .single();

  if (eventError) {
    return NextResponse.json({ error: "The event could not be created." }, { status: 500 });
  }

  for (const [index, file] of files.entries()) {
    const mediaType = file.type.startsWith("video/") ? "video" : "image";
    if (mediaType === "image" && !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      await supabase.from("events").delete().eq("id", event.id);
      return NextResponse.json({ error: "Unsupported image format." }, { status: 400 });
    }
    if (mediaType === "video" && !["video/mp4", "video/webm", "video/quicktime"].includes(file.type)) {
      await supabase.from("events").delete().eq("id", event.id);
      return NextResponse.json({ error: "Unsupported video format." }, { status: 400 });
    }
    if (file.size > 50 * 1024 * 1024) {
      await supabase.from("events").delete().eq("id", event.id);
      return NextResponse.json({ error: "Each file must be 50 MB or smaller." }, { status: 400 });
    }

    const extension = file.name.includes(".") ? file.name.split(".").pop()?.toLowerCase() : mediaType;
    const path = `${event.id}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("event-media").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

    if (uploadError) {
      await supabase.from("events").delete().eq("id", event.id);
      return NextResponse.json({ error: "Media upload failed." }, { status: 500 });
    }

    const { error: mediaError } = await supabase.from("event_media").insert({
      event_id: event.id,
      media_type: mediaType,
      storage_path: path,
      caption: title,
      sort_order: index,
    });

    if (mediaError) {
      await supabase.storage.from("event-media").remove([path]);
    }
  }

  return NextResponse.json({ success: true, eventId: event.id }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const supabase = await requireAdmin();
  if (!supabase) return NextResponse.json({ error: "Admin access required." }, { status: 401 });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "The update request is incomplete or too large." }, { status: 413 });
  }

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const eventDate = String(formData.get("event_date") || "") || null;
  const published = formData.get("published") !== "false";
  const removeMediaIds = String(formData.get("remove_media_ids") || "")
    .split(",")
    .filter(Boolean);
  const files = formData.getAll("media").filter((value): value is File => value instanceof File);

  if (!id) return NextResponse.json({ error: "Event ID is required." }, { status: 400 });
  if (title.length < 1 || title.length > 160) {
    return NextResponse.json({ error: "Enter an event title of 1 to 160 characters." }, { status: 400 });
  }
  if (files.length > 20) {
    return NextResponse.json({ error: "Upload no more than 20 media files." }, { status: 400 });
  }

  const { error: eventError } = await supabase
    .from("events")
    .update({ title, description, event_date: eventDate, published })
    .eq("id", id);

  if (eventError) return NextResponse.json({ error: "The event could not be updated." }, { status: 500 });

  if (removeMediaIds.length) {
    const { data: removedMedia } = await supabase
      .from("event_media")
      .select("storage_path")
      .eq("event_id", id)
      .in("id", removeMediaIds);

    if (removedMedia?.length) {
      await supabase.storage.from("event-media").remove(removedMedia.map((item) => item.storage_path));
    }
    await supabase.from("event_media").delete().eq("event_id", id).in("id", removeMediaIds);
  }

  const { data: existingMedia } = await supabase
    .from("event_media")
    .select("sort_order")
    .eq("event_id", id)
    .order("sort_order", { ascending: false })
    .limit(1);
  let sortOrder = (existingMedia?.[0]?.sort_order ?? -1) + 1;

  for (const file of files) {
    const mediaType = file.type.startsWith("video/") ? "video" : "image";
    const allowed = mediaType === "image"
      ? ["image/jpeg", "image/png", "image/webp", "image/gif"]
      : ["video/mp4", "video/webm", "video/quicktime"];

    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported image or video format." }, { status: 400 });
    }
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "Each file must be 50 MB or smaller." }, { status: 400 });
    }

    const extension = file.name.includes(".") ? file.name.split(".").pop()?.toLowerCase() : mediaType;
    const path = `${id}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("event-media").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (uploadError) return NextResponse.json({ error: "Media upload failed." }, { status: 500 });

    await supabase.from("event_media").insert({
      event_id: id,
      media_type: mediaType,
      storage_path: path,
      caption: title,
      sort_order: sortOrder++,
    });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const supabase = await requireAdmin();
  if (!supabase) return NextResponse.json({ error: "Admin access required." }, { status: 401 });

  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Event ID is required." }, { status: 400 });

  const { data: media } = await supabase.from("event_media").select("storage_path").eq("event_id", id);
  if (media?.length) {
    await supabase.storage.from("event-media").remove(media.map((item) => item.storage_path));
  }
  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) return NextResponse.json({ error: "The event could not be deleted." }, { status: 500 });
  return NextResponse.json({ success: true });
}
