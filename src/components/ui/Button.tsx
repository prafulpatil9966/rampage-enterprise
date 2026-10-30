import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const base =
  "group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300";

const variants = {
  primary: "bg-ink text-cream hover:bg-taupe-dark",
  secondary:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  ghost: "text-ink hover:text-taupe",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
