import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { spaces } from "@/lib/content";

export function Industries() {
  return (
    <section className="bg-beige py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            label="04 / Where We Protect"
            title="Spaces we help safeguard."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {spaces.map((space, i) => (
            <Reveal
              key={space.title}
              delay={i * 0.08}
              className="group relative aspect-[5/4] overflow-hidden rounded-[1.75rem]"
            >
              <Image
                src={space.image}
                alt={space.title}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <h3 className="absolute bottom-6 left-6 font-display text-2xl text-cream">
                {space.title}
              </h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
