import { contactInfo } from "@/lib/content";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" className="fill-current stroke-none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4A8 8 0 1 1 20 11.7Z" />
      <path d="M8.8 8.2c.2-.5.4-.5.7-.5h.4c.2 0 .4.1.5.4l.7 1.7c.1.3 0 .5-.2.7l-.5.6c.7 1.3 1.6 2.2 2.9 2.9l.6-.6c.2-.2.5-.3.7-.2l1.7.7c.3.1.4.3.4.5v.4c0 .3-.1.6-.4.8-.4.3-.9.5-1.5.4-3.1-.5-5.8-3.2-6.3-6.3-.1-.6.1-1.1.3-1.5Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M8.2 3.5 5.7 4.7c-1 .5-1.5 1.6-1.2 2.7 1.5 5.4 5.7 9.6 11.1 11.1 1.1.3 2.2-.2 2.7-1.2l1.2-2.5-4.1-1.7-1.1 1.8c-2.5-1.1-4.5-3.1-5.6-5.6l1.8-1.1-2.3-4.7Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

const phoneNumber = contactInfo.phone.replace(/\D/g, "");

export function ReachOutLinks({ light = false }: { light?: boolean }) {
  const linkClass = light
    ? "text-cream/90 hover:text-taupe"
    : "text-ink/80 hover:text-taupe";

  return (
    <div className="flex items-center gap-2">
      <a
        href={contactInfo.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Rampage Enterprise on Instagram"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 transition-colors ${linkClass}`}
      >
        <InstagramIcon />
      </a>
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Rampage Enterprise on WhatsApp"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 transition-colors ${linkClass}`}
      >
        <WhatsAppIcon />
      </a>
      <a
        href={`tel:${phoneNumber}`}
        aria-label="Call Rampage Enterprise"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 transition-colors ${linkClass}`}
      >
        <PhoneIcon />
      </a>
      {contactInfo.email !== "Add verified email address" && (
        <a
          href={`mailto:${contactInfo.email}`}
          aria-label="Email Rampage Enterprise"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 transition-colors ${linkClass}`}
        >
          <MailIcon />
        </a>
      )}
    </div>
  );
}

