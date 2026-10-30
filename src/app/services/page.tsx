import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "CCTV & surveillance, security personnel, event security, club security and society security services from Rampage Enterprise.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="What We Do"
        title="Security solutions for every space."
        description="From CCTV installation to security personnel, explore the services Rampage Enterprise provides across Mumbai."
        image="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Event space representing the range of security services offered"
      />

      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        {services.map((service, i) => (
          <Reveal
            key={service.slug}
            className={`grid gap-10 border-t border-border py-16 lg:grid-cols-2 lg:gap-20 lg:py-20 ${
              i === services.length - 1 ? "border-b" : ""
            }`}
          >
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] ${
                i % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>

            <div className={`flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <span className="font-display text-5xl text-taupe">{service.number}</span>
              <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
                {service.title}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-grey">
                {service.description}
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="secondary">
                  Enquire About This Service
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
