"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import FadeIn from "@/components/FadeIn";
import ScrollIndicator from "@/components/shared/ScrollIndicator";
import { useTranslations } from "@/i18n/useTranslations";

export default function HeroSection() {
  const { t } = useTranslations();
  return (
    <section data-scroll-id="hero" className="h-screen md:h-screen relative overflow-hidden flex flex-col z-10 shrink-0">
      <div className="max-w-[1440px] mx-auto px-8 pt-24 pb-6 relative z-10 flex flex-col h-full w-full">
        <main className="flex-grow flex flex-col justify-center relative mt-0 mb-8">
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/2 left-0 -translate-y-[120%] -translate-x-4 w-[280px] sm:w-[380px] md:w-[480px] lg:w-[550px] h-[150px] pointer-events-none z-0"
          >
            <svg viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-brand-blue overflow-visible" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <motion.path d="M -30 183 L 155 25 Q 160 15 150 35 L 120 105 Q 115 120 130 110 L 235 45 Q 240 35 230 55 L 215 85 Q 210 95 225 90 L 295 60 Q 300 50 290 65 L 280 80 Q 275 90 290 85 Q 380 70 480 40" />
            </svg>
          </motion.div>

          <div className="relative z-10">
            <FadeIn delay={0.2} direction="left">
              <h2 className="font-display font-normal uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[7.5rem] leading-[0.95] tracking-tight drop-shadow-lg text-[#fef5e4]">
                <span className="block">{t("hero.inspiration")}</span>
                <span className="block">{t("hero.oriented")}</span>
              </h2>
            </FadeIn>

            <div className="mt-2 relative w-fit pl-[120px] pt-4 pb-2">
              <motion.svg className="absolute top-0 left-0 w-[280px] sm:w-[380px] md:w-[480px] lg:w-[580px] h-[170px] overflow-visible pointer-events-none" fill="none" viewBox="0 0 580 170" xmlns="http://www.w3.org/2000/svg">
                <motion.path d="M 10 10 L 80 10 Q 100 10 100 30 L 100 70 Q 100 90 120 90 L 520 90 Q 540 90 540 110 L 540 125" stroke="#F2C94C" strokeWidth="2.5" fill="none" />
                <circle cx="506" cy="80" r="6" fill="#FFEAA7" />
                <circle cx="522" cy="80.5" r="6" fill="#FFC312" />
                <circle cx="538" cy="86" r="6" fill="#F79F1F" />
                <circle cx="548" cy="100" r="6" fill="#EA2027" />
              </motion.svg>
              <FadeIn delay={0.4} direction="up" className="relative z-10 w-full max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[580px]">
                <p className="text-[15px] uppercase font-medium leading-[1.6] text-[#fef5e4] text-left tracking-tight font-serif pb-1">
                  {t("hero.tagline1")}
                  <br />
                  {t("hero.tagline2")}
                  <br />
                  {t("hero.tagline3")}
                </p>
                <Link href="/#showreel" className="flex w-fit items-center gap-3 group mt-5 ml-12 border border-black/30 rounded-md p-1 pr-6 hover:bg-black/10 transition-colors">
                  <div className="w-10 h-10 bg-[#ff6b35] rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0">
                    <Play className="text-[#fef5e4] fill-current ml-1" size={18} />
                  </div>
                  <span className="font-display font-normal uppercase tracking-wider text-[12px] sm:text-[14px] md:text-[16px]">{t("hero.watchShowreel")}</span>
                </Link>
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={0.6} direction="right" className="absolute right-4 md:right-32 top-1/2 -translate-y-1/2">
            <p className="text-sm font-bold uppercase tracking-widest opacity-80">{t("hero.showreelCaption")}</p>
          </FadeIn>
        </main>

        <FadeIn delay={0.5} direction="up" className="mt-auto flex flex-col items-center pb-4">
          <div className="w-full flex justify-center items-center mb-4 relative">
            <h3 className="text-xl font-display font-bold uppercase tracking-widest absolute -top-8">{t("hero.partnerLogos")}</h3>
          </div>
          <div className="flex items-center justify-center gap-8 w-full">
            <div className="flex-shrink-0 hidden md:block">
              <h3 className="text-xl md:text-3xl font-display font-bold uppercase tracking-widest border-r-2 border-[#fef5e4]/50 pr-6 py-2">{t("hero.trustedBy")}</h3>
            </div>
            <div className="w-full max-w-[280px] sm:max-w-[420px] md:max-w-[576px] overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-brand-red to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-brand-red to-transparent z-10 pointer-events-none" />
              <div className="flex gap-3 w-max animate-marquee" style={{ animation: "marquee 15s linear infinite" }}>
                {Array.from({ length: 14 }).map((_, index) => (
                  <div key={index} className="w-[72px] h-[72px] bg-[#89c4f4] relative flex flex-col items-center justify-between p-1.5 shrink-0 border border-transparent hover:border-black/20 cursor-pointer">
                    <span className="text-[10px] sm:text-[9px] md:text-[7px] text-gray-700 opacity-50 uppercase font-bold text-center leading-tight">Thêm văn bản</span>
                    {index % 7 === 1 && <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /></div>}
                    <span className="text-[8px] sm:text-[6px] md:text-[5px] text-gray-700 opacity-50 uppercase font-bold text-center">Phát đó</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={1} direction="none" className="absolute left-8 bottom-24 z-10">
          <ScrollIndicator />
        </FadeIn>
      </div>
    </section>
  );
}
