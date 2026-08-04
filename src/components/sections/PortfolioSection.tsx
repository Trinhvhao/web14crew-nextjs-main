"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import FadeIn from "@/components/FadeIn";
import ScrollIndicator from "@/components/shared/ScrollIndicator";
import { useTranslations } from "@/i18n/useTranslations";
import type { PortfolioItem } from "@/data";

interface PortfolioSectionProps {
  id: string;
  number: string;
  label: string;
  title: string;
  image: string;
  items: PortfolioItem[];
  routeBase: string;
  autoRotate?: boolean;
  rotateInterval?: number;
}

export default function PortfolioSection({
  id,
  number,
  label,
  title,
  image,
  items,
  routeBase,
  autoRotate = false,
  rotateInterval = 5000,
}: PortfolioSectionProps) {
  const { t } = useTranslations();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!autoRotate || items.length <= 1 || hovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, rotateInterval);
    return () => clearInterval(timer);
  }, [autoRotate, items.length, rotateInterval, hovered]);

  const featured = autoRotate ? items[activeIndex] : null;
  const mainImage = featured ? featured.img : image;
  const mainTitle = featured ? featured.name : title;
  const mainHref = featured ? `/${routeBase}/${featured.slug}` : null;

  return (
    <section data-scroll-id={id} className="relative flex flex-col pt-16 md:pt-8 pb-3 px-4 md:px-8 z-10 w-full bg-[#f4efe6] text-black h-screen md:h-screen font-sans overflow-hidden shrink-0">
      <div className="absolute top-8 right-12 text-[#791220] text-3xl font-display font-medium">{number}</div>
      <ScrollIndicator tone="dark" className="absolute left-8 bottom-24" />

      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 flex flex-col h-full">
        <FadeIn direction="down" delay={0.1} className="flex justify-between items-end mb-4 flex-shrink-0">
          <div className="flex items-end gap-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-display font-normal text-[#791220] uppercase tracking-tighter leading-[0.75] transform scale-y-[1.3] scale-x-95 origin-bottom mr-1">{t("portfolio.onAir")}</h2>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-sans font-light text-black leading-[0.75] transform scale-y-[1.1] scale-x-75 origin-bottom mx-1 -mb-1">/</span>
            <div className="flex flex-col pl-1 mb-1">
              <h3 className="text-[1.5rem] font-sans font-bold uppercase tracking-tight border-b-[3px] border-black pb-0 leading-none">{label}</h3>
              <div className="flex gap-2 justify-center mt-2" aria-hidden="true">
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-pink-100 to-pink-300" />
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-pink-300 to-orange-400" />
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-purple-400 to-blue-500" />
              </div>
            </div>
          </div>

          <div className="flex flex-col text-[#791220] font-display leading-[1] tracking-tight pb-3 uppercase text-right justify-end">
            <span className="font-normal text-base sm:text-lg md:text-xl lg:text-[1.8rem] opacity-90">{label}</span>
            {mainHref ? (
              <Link href={mainHref} className="font-bold text-lg sm:text-xl md:text-2xl lg:text-[2.2rem] hover:text-black transition-colors">
                {mainTitle}
              </Link>
            ) : (
              <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-[2.2rem]">{mainTitle}</span>
            )}
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.3} className="relative w-full shadow-lg bg-white p-2 pb-0 flex-1 min-h-0 group">
          {mainHref ? (
            <Link
              href={mainHref}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              data-cursor-text="OPEN"
              className="absolute inset-2 block cursor-pointer"
              aria-label={`${mainTitle} - ${label}`}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 will-change-[opacity]"
                >
                  <Image src={mainImage} alt={mainTitle} fill sizes="(max-width: 768px) 100vw, 1200px" className="object-cover object-center" />
                </motion.div>
              </AnimatePresence>
              {!hovered && (
                <motion.div
                  key={`progress-${activeIndex}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: rotateInterval / 1000, ease: "linear" }}
                  style={{ willChange: "transform" }}
                  className="absolute top-0 left-0 right-0 h-1 bg-[#e74c3c] origin-left z-10"
                />
              )}
            </Link>
          ) : (
            <Image src={mainImage} alt={mainTitle} fill sizes="(max-width: 768px) 100vw, 1200px" className="object-cover object-center" />
          )}
        </FadeIn>

          <FadeIn direction="up" delay={0.5} className="mt-4 md:mt-8 overflow-hidden w-full pb-2 flex-shrink-0 h-[80px] sm:h-[100px] md:h-[120px]">
          <div className="animate-marquee gap-5 h-full">
            {[...items, ...items].map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5% 0px -5% 0px" }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + (index % items.length) * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative w-[220px] h-full flex-shrink-0 group cursor-pointer overflow-hidden bg-gray-900 border border-transparent hover:border-brand-yellow transition-all"
              >
                <Image src={item.img} fill sizes="220px" className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" alt={item.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-2 left-0 w-full text-center text-[#f4efe6] font-display text-[1.2rem] font-bold tracking-wider z-10 leading-tight uppercase px-4 drop-shadow-md">{item.name}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.7} className="flex justify-center mt-4 flex-shrink-0">
          <button type="button" className="flex items-center gap-2 border-[1px] border-black/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-[#e74c3c] flex items-center justify-center">
              <Play size={8} className="fill-current text-white ml-[1px]" />
            </div>
            {t("portfolio.watchAll")}
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
