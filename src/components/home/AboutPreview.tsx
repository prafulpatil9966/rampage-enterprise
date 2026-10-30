import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/content";

export function AboutPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
        <Reveal className="relative order-2 aspect-[4/5] overflow-hidden rounded-[2rem] lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1543892607-04657ef3a279?q=80&w=1400&auto=format&fit=crop"
            alt="Commercial building representing the professional standards of Rampage Enterprise"
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <SectionHeading
            label="05 / About Rampage"
            title="Built on the importance of protection."
          />
          <p className="mt-8 max-w-md text-base leading-relaxed text-grey">
            {company.name} was founded by {company.founder}, based in{" "}
            {company.location}. The company provides CCTV installation and
            security personnel services across residential societies, clubs,
            commercial spaces and events in and around Mumbai.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="secondary">
              More About Us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
