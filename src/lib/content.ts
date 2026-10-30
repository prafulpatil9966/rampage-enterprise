export const company = {
  name: "Rampage Enterprise",
  shortName: "Rampage",
  location: "Mumbai, Maharashtra, India",
  founder: "Vedant Uttam Koli",
  tagline: "Security is not an option. It's a standard.",
  description:
    "Integrated security, surveillance and professional protection solutions designed to help safeguard the spaces that matter.",
};

// Placeholders — replace with verified business details before launch.
export const contactInfo = {
  phone: "+91 9167885599",
  email: "Add verified email address",
  address: "Mumbai, Maharashtra, India",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Approach", href: "/#approach" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  number: string;
  slug: string;
  title: string;
  description: string;
  image: string;
};

export const services: Service[] = [
   {
    number: "01",
    slug: "event-security",
    title: "Event Security",
    description: "Security support for events and gatherings.",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1600&auto=format&fit=crop",
  }, 
  {
    number: "02",
    slug: "club-security",
    title: "Club Security",
    description: "Security services for clubs and entertainment venues.",
    image:
      "https://images.unsplash.com/photo-1690992375579-0a91942e9dc3?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "03",
    slug: "cctv-surveillance",
    title: "CCTV & Surveillance",
    description: "Professional CCTV installation and surveillance solutions.",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "04",
    slug: "security-personnel",
    title: "Security Personnel",
    description: "Security personnel for different security requirements.",
    image:
      "https://images.unsplash.com/photo-1793027516573-e54903e6aa68?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "05",
    slug: "society-security",
    title: "Society Security",
    description: "Security services for residential societies.",
    image:
      "https://images.unsplash.com/photo-1775990366475-cc8de2cadfa1?q=80&w=1600&auto=format&fit=crop",
  },
];

export type ApproachStep = {
  number: string;
  title: string;
  description: string;
};

export const approachSteps: ApproachStep[] = [
  {
    number: "01",
    title: "Understand",
    description: "Understand the location, environment and security requirements.",
  },
  {
    number: "02",
    title: "Assess",
    description: "Identify the relevant surveillance or security needs.",
  },
  {
    number: "03",
    title: "Plan",
    description: "Recommend a suitable service approach based on the requirements.",
  },
  {
    number: "04",
    title: "Execute",
    description: "Coordinate the selected installation or security service.",
  },
];

export type Space = {
  title: string;
  image: string;
};

export const spaces: Space[] = [
  {
    title: "Residential Societies",
    image:
      "https://images.unsplash.com/photo-1793027516573-e54903e6aa68?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Events & Venues",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Clubs",
    image:
      "https://images.unsplash.com/photo-1690992375579-0a91942e9dc3?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Commercial Spaces",
    image:
      "https://images.unsplash.com/photo-1543892607-04657ef3a279?q=80&w=1400&auto=format&fit=crop",
  },
];
