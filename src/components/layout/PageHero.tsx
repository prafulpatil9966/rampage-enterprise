import Image from "next/image";

type PageHeroProps = {
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export function PageHero({ label, title, description, image, imageAlt }: PageHeroProps) {
  return (
    <section className="pt-36 pb-16 lg:pt-44 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-taupe">
          <span className="h-px w-8 bg-taupe" aria-hidden />
          {label}
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-grey">
          {description}
        </p>

        <div className="relative mt-14 aspect-[16/9] w-full overflow-hidden rounded-[2rem] lg:aspect-[21/9]">
          <Image
            src={image}
            alt={imageAlt}
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
