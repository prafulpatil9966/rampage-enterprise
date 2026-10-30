import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/lib/content";

export function Intro() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 sm:py-24 lg:px-10 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading
            label="01 / Who We Are"
            title={
              <>
                Protection built around people, places and peace of mind.
              </>
            }
          />
          <p className="mt-8 max-w-md text-base leading-relaxed text-grey">
            {company.name} is a Mumbai-based security and surveillance service
            provider, offering CCTV installation and professional security
            personnel for residential societies, clubs, commercial spaces and
            events. Our focus is on practical, dependable protection tailored
            to each space we serve.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:aspect-auto">
          <Image
            src="https://images.unsplash.com/photo-1793027516573-e54903e6aa68?q=80&w=1400&auto=format&fit=crop"
            alt="Residential high-rise towers representing the spaces Rampage Enterprise protects"
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
