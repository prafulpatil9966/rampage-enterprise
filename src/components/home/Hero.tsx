import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-10 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(20,16,12,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,16,12,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-taupe">
          <span>01 / Protection</span>
          <span className="hidden sm:inline">{company.location}</span>
        </div>

        <h1 className="mt-8 font-display text-[13vw] leading-[0.95] tracking-tight text-ink sm:text-[9vw] lg:text-[6.4vw]">
          SECURITY IS NOT
          <br />
          AN OPTION.
          <br />
          <span className="italic text-taupe">It&apos;s a standard.</span>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-grey lg:text-xl">
            {company.description}
          </p>

          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Button href="/services" variant="primary">
              Explore Our Services
            </Button>
            <Button href="/contact" variant="secondary">
              Discuss Your Security Needs
            </Button>
          </div>
        </div>

        <div className="relative mt-16 aspect-[16/9] w-full overflow-hidden rounded-[2rem] lg:aspect-[21/9]">
          <Image
            src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2000&auto=format&fit=crop"
            alt="CCTV surveillance camera mounted for professional security monitoring"
            fill
            priority
            sizes="(min-width: 1024px) 1200px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
