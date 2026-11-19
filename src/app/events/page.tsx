  import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { eventGallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Photos and videos from events Rampage Enterprise has provided security for across Mumbai.",
};

type EventRecord = {
  id: string;
  title: string;
  description: string;
  event_media: Array<{
    id: string;
    media_type: "image" | "video";
    storage_path: string;
    caption: string;
  }>;
};

function supabasePublicUrl(storagePath: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${baseUrl}/storage/v1/object/public/event-media/${storagePath}`;
}

export default async function EventsPage() {
  let events: EventRecord[] = [];

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase environment variables are not configured.");
    }

    const supabase = createSupabaseClient(supabaseUrl, supabaseKey);
    const { data } = await supabase
      .from("events")
      .select("id,title,description,event_media(id,media_type,storage_path,caption,sort_order)")
      .eq("published", true)
      .order("event_date", { ascending: false })
      .order("created_at", { ascending: false })
      .order("sort_order", { foreignTable: "event_media", ascending: true });

    if (data) events = data as EventRecord[];
  } catch (error) {
    console.error("Failed to load event gallery:", error);
  }

  const hasDatabaseEvents = events.length > 0;

  return (
    <>
      <PageHero
        label="Our Work"
        title="Events we've secured."
        description="A look at some of the events, venues and gatherings Rampage Enterprise has provided security for."
        image="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Rampage Enterprise security team at an event"
      />

      <div className="mx-auto max-w-7xl space-y-20 px-6 pb-24 lg:px-10 lg:pb-32">
        {hasDatabaseEvents ? events.map((event, eventIndex) => (
          <section key={event.id}>
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-4xl">{event.title}</h2>
              {event.description && (
                <p className="mt-3 max-w-3xl text-sm leading-7 text-grey sm:text-base">
                  {event.description}
                </p>
              )}
            </Reveal>
            {event.event_media.length > 0 && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {event.event_media.map((item, mediaIndex) => {
                  const src = supabasePublicUrl(item.storage_path);
                  return (
                    <Reveal
                      key={item.id}
                      delay={(eventIndex + mediaIndex) * 0.06}
                      className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-beige"
                    >
                      {item.media_type === "video" ? (
                        <video src={src} controls playsInline className="h-full w-full object-cover" />
                      ) : (
                        <Image src={src} alt={item.caption || event.title} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                      {/* {item.caption && (
                        <p className="pointer-events-none absolute bottom-5 left-5 right-5 text-sm font-medium text-cream">
                          {item.caption}
                        </p>
                      )} */}
                    </Reveal>
                  );
                })}
              </div>
            )}
          </section>
        )) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eventGallery.map((item, i) => (
            <Reveal
              key={item.src}
              delay={i * 0.06}
              className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-beige"
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              {/* <p className="pointer-events-none absolute bottom-5 left-5 right-5 text-sm font-medium text-cream">
                {item.caption}
              </p> */}
            </Reveal>
          ))}
          </div>
        )}
      </div>
    </>
  );
}
