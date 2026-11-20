import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AdminEvents } from "@/components/admin/AdminEvents";

export const dynamic = "force-dynamic";

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

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) redirect("/admin/login");

  const { data } = await supabase
    .from("events")
    .select("id,title,description,event_date,published,created_at,event_media(id,media_type,storage_path,sort_order)")
    .order("created_at", { ascending: false })
    .order("sort_order", { foreignTable: "event_media", ascending: true });

  return (
    <div className="min-h-[70vh] bg-cream">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 text-ink lg:px-10">
        <AdminEvents
          initialEvents={(data as EventRecord[]) || []}
          email={user.email || ""}
        />
      </div>
    </div>
  );
}
