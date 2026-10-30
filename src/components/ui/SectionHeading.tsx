import type { ReactNode } from "react";

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  label,
  title,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-taupe">
        <span className="h-px w-8 bg-taupe" aria-hidden />
        {label}
      </span>
      <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
        {title}
      </h2>
    </div>
  );
}
