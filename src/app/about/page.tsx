import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Rampage Enterprise, a Mumbai-based security and surveillance provider founded by Vedant Uttam Koli.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Rampage"
        title="Built on the importance of protection."
        description="A Mumbai-based security and surveillance provider, founded to help safeguard the spaces people live, work and gather in."
        image="https://images.unsplash.com/photo-1543892607-04657ef3a279?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Commercial building exterior representing Rampage Enterprise's area of operation"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <Reveal>
            <SectionHeading
              label="Our Founder"
              title={company.founder}
            />
            <p className="mt-8 max-w-md text-base leading-relaxed text-grey">
              {company.founder} founded {company.name} in {company.location}
              , with a focus on providing dependable security, surveillance
              and protection services to residential societies, clubs,
              commercial spaces and events.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/instagram/founder-portrait.jpg"
              alt={`${company.founder}, founder of Rampage Enterprise`}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-beige py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              label="Our Focus"
              title="A practical approach to security and protection."
            />
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-grey">
              {company.name} works across CCTV installation, security
              personnel deployment, event security, and protection for clubs
              and residential societies. Every engagement begins with
              understanding the space and its specific requirements before
              recommending a suitable approach.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/instagram/surveillance-guards.webp"
              alt="Real promotional graphic shared by Rampage Enterprise on Instagram"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              label="Follow Our Work"
              title="See it on Instagram."
            />
            <p className="mt-8 max-w-md text-base leading-relaxed text-grey">
              &ldquo;{company.bio}&rdquo;
            </p>
            <a
              href={company.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-taupe transition-colors hover:text-taupe-dark"
            >
              @rampage.enterprise
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
