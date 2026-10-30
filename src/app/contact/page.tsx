import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rampage Enterprise to discuss CCTV installation, security personnel, event security or society security requirements.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Start a Conversation"
        title="Let's talk about your security requirements."
        description="Share a few details about your space and requirement, and we'll get back to you."
        image="https://images.unsplash.com/photo-1793027516573-e54903e6aa68?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Residential high-rise towers representing a space Rampage Enterprise can protect"
      />

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="font-display text-2xl text-ink">Contact Information</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-grey">
              Reach out with your requirement and we&apos;ll follow up to
              understand your space and recommend a suitable approach.
            </p>
            <div className="mt-8 space-y-3 text-sm text-ink/80">
              <p>{contactInfo.address}</p>
              <p className="text-grey">{contactInfo.phone}</p>
              <p className="text-grey">{contactInfo.email}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-[2rem] border border-border bg-beige/60 p-8 lg:p-10">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
