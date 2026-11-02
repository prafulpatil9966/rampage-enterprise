import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { eventGallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Photos and videos from events Rampage Enterprise has provided security for across Mumbai.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        label="Our Work"
        title="Events we've secured."
        description="A look at some of the events, venues and gatherings Rampage Enterprise has provided security for."
        image="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Rampage Enterprise security team at an event"
      />

      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
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
              <p className="pointer-events-none absolute bottom-5 left-5 right-5 text-sm font-medium text-cream">
                {item.caption}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
