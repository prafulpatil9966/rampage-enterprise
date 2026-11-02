import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Services } from "@/components/home/Services";
import { Industries } from "@/components/home/Industries";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Industries />
      <AboutPreview />
      <ContactSection />
    </>
  );
}
