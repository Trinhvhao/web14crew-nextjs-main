"use client";

import CustomCursor from "@/components/CustomCursor";
import SiteHeader from "@/components/layout/SiteHeader";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import OnTheSetSection from "@/components/sections/OnTheSetSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ReputationSection from "@/components/sections/ReputationSection";
import ServicesSection from "@/components/sections/ServicesSection";
import { corpData, prodData, tvcData } from "@/data";

const portfolioSections = [
  {
    id: "showreel",
    number: "02",
    label: "TVC - ITVC",
    title: "THONG DIEP BRAND",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=1600&h=600",
    items: tvcData,
    routeBase: "tvc",
    autoRotate: true,
  },
  {
    id: "corp",
    number: "03",
    label: "CORPORATION FILM",
    title: "SETIABECAMEX",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600&h=600",
    items: corpData,
    routeBase: "corp",
    autoRotate: true,
  },
  {
    id: "prod",
    number: "04",
    label: "TESTIMONIAL",
    title: "THONG DIEP BRAND",
    image: "https://images.unsplash.com/photo-1517816743773-6e0fd5ce925c?auto=format&fit=crop&q=80&w=1600&h=600",
    items: prodData,
    routeBase: "prod",
    autoRotate: true,
  },
];

export default function HomePage() {
  return (
    <div className="noise-bg text-[#fef5e4] font-sans relative selection:bg-brand-yellow selection:text-brand-red min-h-screen w-full">
      <CustomCursor />
      <SiteHeader />
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20 pointer-events-none mix-blend-screen z-0" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)", filter: "blur(40px)" }} />

      <HeroSection />
      {portfolioSections.map((section) => (
        <PortfolioSection key={section.id} {...section} />
      ))}
      <OnTheSetSection />
      <ServicesSection />
      <ReputationSection />
      <ContactSection />
    </div>
  );
}
