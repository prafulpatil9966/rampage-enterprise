export const company = {
  name: "Rampage Enterprise",
  shortName: "Rampage",
  location: "Mumbai, Maharashtra, India",
  founder: "Vedant Uttam Koli",
  tagline: "Security is not an option. It's a standard.",
  description:
    "Integrated security, surveillance and professional protection solutions designed to help safeguard the spaces that matter.",
  // From the official Instagram bio (@rampage.enterprise).
  bio: "Where safety meets service. Redefining security in physical vigilance and digital surveillance.",
  instagram: "https://www.instagram.com/rampage.enterprise/",
};

// Placeholders — replace with verified business details before launch.
export const contactInfo = {
  phone: "+91 9167885599",
  email: "Add verified email address",
  address: "Mumbai, Maharashtra, India",
  instagram: "https://www.instagram.com/rampage.enterprise/",
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

// Services list matches the official "Services Offered" roster shared on Instagram.
export const services: Service[] = [
  {
    number: "01",
    slug: "manned-guarding",
    title: "Manned Guarding",
    description: "Trained guards stationed on-site for round-the-clock protection.",
    image:
      "https://images.unsplash.com/photo-1552622594-f27a9f6103a3?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "02",
    slug: "event-security",
    title: "Event Security",
    description: "Security support for events and gatherings.",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "03",
    slug: "residential-security",
    title: "Residential Security",
    description: "Security services for residential societies.",
    image:
      "https://images.unsplash.com/photo-1793027516573-e54903e6aa68?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "04",
    slug: "corporate-security",
    title: "Corporate Security",
    description: "Security services for offices and commercial spaces.",
    image:
      "https://images.unsplash.com/photo-1543892607-04657ef3a279?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "05",
    slug: "retail-security",
    title: "Retail Security",
    description: "Security services for retail stores and shopping spaces.",
    image:
      "https://images.unsplash.com/photo-1694715641112-755248c25d5b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "06",
    slug: "cctv-monitoring",
    title: "CCTV Monitoring",
    description: "Professional CCTV installation, monitoring and maintenance.",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1600&auto=format&fit=crop",
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
