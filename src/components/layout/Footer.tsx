import Link from "next/link";
import { company, contactInfo, navLinks, services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-beige">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl text-ink">{company.name}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-grey">
              {company.description}
            </p>
            <a
              href={company.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-taupe transition-colors hover:text-taupe-dark"
            >
              @rampage.enterprise on Instagram
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
              Navigate
            </p>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink/80 transition-colors hover:text-taupe"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
              Services
            </p>
            <ul className="mt-4 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href="/services"
                    className="text-sm text-ink/80 transition-colors hover:text-taupe"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink/80">
              <li>{contactInfo.address}</li>
              <li className="text-grey">{contactInfo.phone}</li>
              <li className="text-grey">{contactInfo.email}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-grey sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rampage Enterprise. All rights reserved.</p>
          <p>Mumbai, Maharashtra, India</p>
        </div>
      </div>
    </footer>
  );
}
