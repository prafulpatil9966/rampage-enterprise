export type EventRecord = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  event_date: string | null;
  cover_image: string | null;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export type EventMediaRecord = {
  id: string;
  event_id: string;
  file_url: string;
  storage_path: string;
  media_type: "image" | "video";
  file_name: string | null;
  sort_order: number;
  created_at: string;
};

export function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}
