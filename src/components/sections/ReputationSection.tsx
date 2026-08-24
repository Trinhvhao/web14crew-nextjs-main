"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { useTranslations } from "@/i18n/useTranslations";

const logoRows = [0, 1, 2];
const logoCount = 10;

export default function ReputationSection() {
  const { t } = useTranslations();
  return (
    <section className="relative flex flex-col pt-8 pb-6 px-4 md:px-8 z-10 w-full bg-[#791220] text-[#f4efe6] h-screen font-sans overflow-hidden shrink-0">
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none flex items-center justify-center"><Image src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=70&w=600&h=450" alt="Background texture" fill sizes="100vw" loading="lazy" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiLz4=" className="object-cover filter blur-[2px] contrast-125" /></div>
      <div className="absolute top-8 right-12 text-3xl font-display font-medium z-10">06</div>
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 flex flex-col h-full z-10 relative">
        <FadeIn direction="down" delay={0.05}><h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] xl:text-[5rem] font-display font-normal uppercase tracking-tighter leading-[0.8] transform scale-y-[1.3] scale-x-[0.95] origin-left mb-4 md:mb-6 text-[#f4efe6] mt-4">{t("reputation.title")}</h2></FadeIn>
        <FadeIn direction="left" delay={0.1} className="flex w-full mb-auto mt-2">
          <div className="flex flex-col gap-2 flex-1">{logoRows.map((row) => <div key={row} className={`flex gap-2 ${row === 1 ? "ml-12" : row === 2 ? "ml-24" : ""}`}>{Array.from({ length: logoCount }).map((_, index) => <div key={`${row}-${index}`} className="w-[65px] h-[65px] bg-[#90CAF9] opacity-90 rounded-sm" aria-label="Partner logo placeholder" />)}</div>)}</div>
          <div className="flex flex-col justify-center ml-0 md:ml-8 text-[10px] sm:text-xs md:text-sm lg:text-[1.2rem] font-bold tracking-widest leading-tight uppercase mr-0 md:mr-32 mt-4"><span>LOGO</span><span>{t("reputation.logoPartnerLine2")}</span><span>{t("reputation.logoPartnerLine3")}</span></div>
        </FadeIn>
        <FadeIn direction="up" delay={0.15} className="flex flex-col mt-4 w-3/4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] xl:text-[5rem] font-display font-normal uppercase tracking-tighter leading-[0.8] transform scale-y-[1.3] scale-x-[0.95] origin-left mb-4 md:mb-6">{t("reputation.rolling")}</h3>
          <div className="flex flex-col md:flex-row gap-4 md:gap-24 text-[10px] sm:text-xs md:text-sm lg:text-[1.1rem] leading-relaxed font-medium uppercase tracking-wide"><div className="flex flex-col gap-2"><div className="flex flex-col"><span className="font-bold mb-1">{t("reputation.addressHeading")}</span><span>{t("reputation.addressLine1")}</span><span>{t("reputation.addressLine2")}</span></div><span className="font-bold mt-2">{t("reputation.mail")}</span><span className="font-bold">{t("reputation.phone")}</span></div><div className="flex flex-col gap-2"><span className="font-bold mb-1">{t("reputation.article")}</span><span>{t("reputation.productionHouse")}</span><span>{t("reputation.commercialFilm")}</span><span>{t("reputation.shootingTvc")}</span><span>{t("reputation.corporation")}</span></div></div>
        </FadeIn>
      </div>
    </section>
  );
}
