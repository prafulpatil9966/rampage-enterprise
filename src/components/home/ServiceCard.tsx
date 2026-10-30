import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href="/services"
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-border bg-beige/60 transition-colors duration-300 hover:border-taupe"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 400px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 font-display text-sm text-cream">
          {service.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl text-ink">{service.title}</h3>
        <p className="text-sm leading-relaxed text-grey">{service.description}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-taupe">
          Enquire
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
