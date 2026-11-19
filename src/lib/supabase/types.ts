export type EventRow = {
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

export type EventMediaRow = {
  id: string;
  event_id: string;
  file_url: string;
  storage_path: string;
  media_type: "image" | "video";
  file_name: string | null;
  sort_order: number;
  created_at: string;
};
