"use client";

import Image from "next/image";
import { Camera, MessageSquare, MonitorPlay, Radio, Users, Volume2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import ScrollIndicator from "@/components/shared/ScrollIndicator";
import { useTranslations } from "@/i18n/useTranslations";

const serviceIcons = [
  { key: "tvc", icon: MonitorPlay },
  { key: "commercial", icon: Volume2 },
  { key: "keyVisual", icon: Camera },
  { key: "livestream", icon: Radio },
] as const;

const subServiceIcons = [
  { key: "testimonial", icon: MessageSquare },
  { key: "productionTeam", icon: Users },
  { key: "productionTeam", icon: Users },
] as const;

const statKeys = [
  { key: "shootingYear", value: 10, suffix: "" },
  { key: "projectCompleted", value: 200, suffix: "+" },
  { key: "clientBrand", value: 100, suffix: "+" },
] as const;

export default function ServicesSection() {
  const { t } = useTranslations();

  return (
    <section className="relative flex flex-col pt-12 pb-8 px-4 md:px-8 z-10 w-full bg-[#791220] text-[#f4efe6] font-sans overflow-hidden shrink-0">
      {/* Background with CSS parallax — no JS needed, doesn't fight Lenis */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=70&w=600&h=450"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
          style={{ transform: "scale(1.1)" }}
        />
      </div>
      <div className="absolute top-8 right-12 text-[#f4efe6] text-3xl font-display font-medium z-10">05</div>
      <ScrollIndicator className="absolute left-8 bottom-24 z-10" />

      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 flex flex-col min-h-screen z-10">
        <FadeIn direction="down" delay={0.2}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[6rem] font-display font-normal uppercase tracking-tighter leading-[0.8] scale-y-[1.3] scale-x-[0.95] origin-left mb-6 md:mb-12 text-[#f4efe6]">
            {t("services.allIn")}
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.05} className="flex flex-col gap-3 mb-auto">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {serviceIcons.map(({ key, icon: Icon }) => (
              <div key={key} className="w-[120px] md:w-[150px] h-[85px] bg-[#1a1a1a] flex flex-col items-center justify-center text-center p-3 hover:bg-[#222] transition-colors cursor-pointer shadow-lg shrink-0">
                <Icon size={20} className="mb-2 stroke-[1.5]" />
                <h3 className="text-[10px] md:text-[8px] font-bold tracking-widest uppercase">{t(`services.items.${key}`)}</h3>
              </div>
            ))}
          </div>
          <div className="flex gap-3 pl-[60px] md:pl-[81px] overflow-x-auto pb-2">
            {subServiceIcons.map(({ key, icon: Icon }, index) => {
              const titleKey = key === "testimonial" ? "services.subItems.testimonial" : "services.subItems.productionTeam";
              const title = t(titleKey);
              const desc = key === "productionTeam" ? t("services.subItems.productionDesc") : "";
              return (
                <div key={`${key}-${index}`} className="w-[120px] md:w-[150px] h-[85px] bg-[#1a1a1a] flex flex-col items-center justify-center text-center p-2 hover:bg-[#222] transition-colors cursor-pointer shadow-lg shrink-0">
                  <Icon size={20} className="mb-2 stroke-[1.5]" />
                  <h3 className="text-[10px] md:text-[8px] font-bold tracking-widest uppercase mb-1">{title}</h3>
                  {desc && <p className="text-[7px] md:text-[6px] text-gray-400 leading-tight px-1 font-sans">{desc}</p>}
                </div>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 px-6 md:px-12 mb-6 md:mb-10 mt-4 md:mt-8 w-full relative z-10">
          {statKeys.map((stat) => (
            <div key={stat.key} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[6rem] font-display font-normal leading-[0.7] text-[#f4efe6] tracking-tighter scale-y-[1.2] drop-shadow-lg mb-2 tabular-nums">
                {stat.value}{stat.suffix}
              </span>
              <span className="text-sm sm:text-base md:text-xl lg:text-[1.4rem] xl:text-[1.8rem] font-display font-normal uppercase tracking-tight leading-none text-[#f4efe6] scale-y-[1.3] mt-4 md:mt-8 drop-shadow-md">
                {t(`services.stats.${stat.key}`)}
              </span>
            </div>
          ))}
        </FadeIn>

        <FadeIn direction="up" delay={0.15} className="flex justify-between items-end pb-4 font-sans font-medium text-[1.1rem] tracking-wide text-[#f4efe6]">
          <div className="flex flex-col">
            <span>{t("services.contact.email")}</span>
            <span>{t("services.contact.phone")}</span>
          </div>
          <div className="text-[1.3rem] tracking-wider mb-2 pr-32">{t("services.contact.website")}</div>
        </FadeIn>
      </div>
    </section>
  );
}
