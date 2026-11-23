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

      <div className="mx-auto max-w-7xl space-y-20 px-6 pb-24 lg:px-10 lg:pb-32">
        {eventGallery.map((event) => (
          <section key={event.title} className="border-t border-border pt-10">
            <Reveal>
              <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
                {event.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-grey">
                {event.description}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {event.media.map((item, i) => (
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
                      preload="metadata"
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
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
