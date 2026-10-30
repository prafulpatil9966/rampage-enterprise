import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Rampage Enterprise | Security & Surveillance, Mumbai",
    template: "%s | Rampage Enterprise",
  },
  description:
    "Rampage Enterprise is a Mumbai-based security and surveillance provider offering CCTV installation, security personnel, event security, and protection for clubs and residential societies.",
  keywords: [
    "Rampage Enterprise",
    "CCTV installation Mumbai",
    "security personnel Mumbai",
    "event security",
    "society security",
    "club security",
  ],
  openGraph: {
    title: "Rampage Enterprise | Security & Surveillance, Mumbai",
    description:
      "Integrated security, surveillance and professional protection solutions designed to help safeguard the spaces that matter.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
