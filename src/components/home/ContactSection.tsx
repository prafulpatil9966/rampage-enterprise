import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactInfo } from "@/lib/content";

export function ContactSection() {
  return (
    <section id="contact" className="bg-ink py-24 text-cream lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-taupe">
            <span className="h-px w-8 bg-taupe" aria-hidden />
            06 / Start a Conversation
          </span>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s talk about your security requirements.
          </h2>
          <div className="mt-10 space-y-3 text-sm text-cream/70">
            <p>{contactInfo.address}</p>
            <p>{contactInfo.phone}</p>
            <p>{contactInfo.email}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-[2rem] bg-cream p-8 text-ink lg:p-10">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
