"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, Play } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { corpData, prodData, tvcData } from "../data";
import CustomCursor from "./CustomCursor";
import FadeIn from "./FadeIn";
import FloatingContact from "./FloatingContact";
import { useTranslations } from "@/i18n/useTranslations";

type ProjectItem = (typeof tvcData)[number];
type ProjectKind = "tvc" | "corp" | "prod";

const projectConfig: Record<ProjectKind, {
  data: ProjectItem[];
  backHash: string;
  sectionNameKey: string;
  eyebrowKey: string;
  pageNumber: string;
  titleKey: string;
  bg: string;
  fg: string;
  panel: string;
  gridImages?: string[];
  btsImages?: string[];
}> = {
  tvc: {
    data: tvcData,
    backHash: "showreel",
    sectionNameKey: "detail.tvc.sectionName",
    eyebrowKey: "detail.tvc.eyebrow",
    pageNumber: "02-A",
    titleKey: "detail.tvc.title",
    bg: "#f4efe6",
    fg: "#791220",
    panel: "#d31c36",
  },
  corp: {
    data: corpData,
    backHash: "corp",
    sectionNameKey: "detail.corp.sectionName",
    eyebrowKey: "detail.corp.eyebrow",
    pageNumber: "03-A",
    titleKey: "detail.corp.title",
    bg: "#791220",
    fg: "#f4efe6",
    panel: "#d31c36",
    gridImages: [
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1506744626753-eda818311449?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=400&h=250",
    ],
    btsImages: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400&h=300",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400&h=300",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400&h=300",
    ],
  },
  prod: {
    data: prodData,
    backHash: "prod",
    sectionNameKey: "detail.prod.sectionName",
    eyebrowKey: "detail.prod.eyebrow",
    pageNumber: "04-A",
    titleKey: "detail.prod.title",
    bg: "#791220",
    fg: "#f4efe6",
    panel: "#d31c36",
    gridImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1506744626753-eda818311449?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=400&h=250",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=250",
    ],
    btsImages: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400&h=300",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400&h=300",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400&h=300",
    ],
  },
};

function getProjectSet(kind: ProjectKind, slug: string) {
  const config = projectConfig[kind];
  const mainItem = config.data.find((item) => item.slug === slug) ?? config.data[0];
  const remainingItems = config.data.filter((item) => item.slug !== mainItem.slug);

  while (remainingItems.length < 9) {
    remainingItems.push(...remainingItems.slice(0, Math.max(1, 9 - remainingItems.length)));
  }

  return { config, mainItem, remainingItems: remainingItems.slice(0, 9) };
}

export default function ProjectDetailPage({ kind, slug }: { kind: ProjectKind; slug: string }) {
  const { config, mainItem, remainingItems } = getProjectSet(kind, slug);
  const { t } = useTranslations();
  const sectionName = t(config.sectionNameKey);
  const eyebrow = t(config.eyebrowKey);
  const title = t(config.titleKey);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const isTvc = kind === "tvc";

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col pt-8 pb-3 px-4 md:px-8 z-10 w-full h-screen font-sans overflow-hidden shrink-0"
      style={{ backgroundColor: config.bg, color: config.fg }}
    >
      <CustomCursor />
      <FloatingContact />

      <div className="absolute top-8 right-12 text-3xl font-display font-medium" style={{ color: config.fg }}>
        {config.pageNumber}
      </div>

      <div className="absolute left-10 bottom-12 flex items-end gap-[6px] h-[100px]">
        <span className="text-[13px] font-bold uppercase tracking-[0.15em] font-sans mb-[8px]" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: config.fg }}>
          {t("detail.common.scroll")}
        </span>
        <div className="flex flex-col items-center h-full">
          <div className="w-[2px] flex-1 bg-[#F2C94C]" />
          <ArrowDown size={16} className="text-[#F2C94C] stroke-[3] -mt-[2px]" />
        </div>
      </div>

      <div className="absolute top-8 left-12 z-50 flex items-center gap-4">
        <Link
          href={`/#${config.backHash}`}
          className="flex items-center justify-center w-10 h-10 bg-transparent border rounded-full transition-all group shadow-sm hover:shadow-md"
          style={{ color: config.fg, borderColor: config.fg }}
          aria-label={`Back to ${sectionName}`}
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        </Link>
        <div className="font-sans font-bold text-[11px] uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: config.fg }}>
          <Link href="/" className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">{t("detail.common.breadcrumbHome")}</Link>
          <span className="opacity-50">/</span>
          <Link href={`/#${config.backHash}`} className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">{sectionName}</Link>
          <span className="opacity-50">/</span>
          <span className="opacity-100">{mainItem.name}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 flex flex-col h-full">
        <FadeIn direction="down" delay={0.1} className="flex justify-center items-center mb-6 mt-2 flex-shrink-0 relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[5.5rem] font-display font-normal uppercase tracking-tighter leading-[0.75] transform scale-y-[1.3] scale-x-95 origin-bottom relative z-10 text-center mr-0 md:mr-8">
            {title}
          </h1>
        </FadeIn>

        <div className="flex w-full flex-grow gap-4 md:gap-8 mt-4 overflow-hidden mb-4 md:mb-8 flex-col md:flex-row">
          <FadeIn direction="right" delay={0.2} className="flex flex-col w-full md:w-[25%] h-full">
            <div className="w-full flex-grow p-5 flex flex-col relative overflow-hidden group shadow-md" style={{ backgroundColor: config.panel }}>
              <h2 className="text-white font-sans font-bold text-2xl uppercase tracking-tighter relative z-10 leading-none">{t("detail.common.verticalFrame")}<br />9/16</h2>
              <div className="absolute top-16 -left-8 -right-8 -bottom-16 flex items-start justify-center rotate-[-12deg] origin-top-left transition-transform duration-500 group-hover:rotate-0">
                <div className="relative w-[120%] max-w-none h-[120%] rounded shadow-xl overflow-hidden opacity-90">
                  <Image src={mainItem.img} alt={mainItem.name} fill sizes="360px" className="object-cover" />
                </div>
              </div>
            </div>
            <h3 className="font-sans font-bold text-2xl uppercase tracking-tighter mt-2">{t("detail.common.breakdown")}</h3>
          </FadeIn>

          <FadeIn direction="up" delay={0.3} className="flex flex-col w-full md:w-[50%] h-full items-center justify-start relative">
            <motion.h2 style={{ y: titleY }} className="font-sans font-bold text-[1.8rem] uppercase tracking-tighter mb-4 mt-[-10px]">{mainItem.name}</motion.h2>
            <div data-cursor-text="PLAY" className="w-full aspect-[21/9] bg-gray-900 overflow-hidden relative shadow-lg mb-6 group cursor-pointer">
              <Image src={mainItem.img} alt={mainItem.name} fill priority sizes="(max-width: 768px) 100vw, 720px" className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-[#F2C94C]/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 bg-[#F2C94C] rounded-full flex items-center justify-center text-[#791220] shadow-lg">
                  <Play size={22} className="fill-current ml-1" />
                </div>
              </div>
            </div>

            {isTvc ? (
              <div className="flex flex-col items-center gap-2">
                {[remainingItems.slice(0, 2), remainingItems.slice(2, 5), remainingItems.slice(5, 9)].map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-2">
                    {row.map((item) => (
                      <Link key={item.id} href={`/${kind}/${item.slug}`} className="cursor-pointer hover:scale-105 transition-all w-[120px] h-[65px] bg-[#9ccc65] relative overflow-hidden group shadow-sm hover:shadow-md hover:z-10 z-0">
                        <Image src={item.img} alt={item.name} fill sizes="120px" className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-3 w-full mb-4">
                  {(config.gridImages ?? remainingItems.map((item) => item.img)).map((src, index) => (
                    <div key={`${src}-${index}`} className="aspect-video bg-[#9ccc65] relative overflow-hidden cursor-pointer group shadow-md">
                      <Image src={src} alt={`${sectionName} thumbnail ${index + 1}`} fill sizes="180px" className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-auto">
                  {(config.btsImages ?? []).map((src, index) => (
                    <div key={src} className="w-[150px] aspect-[16/9] bg-gray-800 overflow-hidden shadow-lg border border-white/10">
                      <Image src={src} alt={`${sectionName} behind the scenes ${index + 1}`} fill sizes="150px" className="object-cover" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </FadeIn>

          <FadeIn direction="left" delay={0.4} className="flex flex-col w-full md:w-[25%] h-full">
            <h3 className="font-sans font-bold text-2xl uppercase tracking-tighter mb-2 text-left">{t("detail.common.producedBy")}</h3>
            <div className="w-full flex-grow p-5 flex flex-col justify-end relative overflow-hidden group shadow-md" style={{ backgroundColor: config.panel }}>
              <div className="absolute top-16 -left-4 -right-16 bottom-16 flex items-center justify-center rotate-[15deg] origin-bottom-right transition-transform duration-500 group-hover:rotate-0">
                <div className="relative w-[130%] max-w-none h-[130%] shadow-2xl drop-shadow-2xl overflow-hidden opacity-90">
                  <Image src={mainItem.img} alt={mainItem.name} fill sizes="360px" className="object-cover" />
                </div>
              </div>
              <h3 className="text-white font-sans font-bold text-2xl uppercase tracking-tighter relative z-10 leading-none text-left">{eyebrow}<br />MEDIA 14CREW</h3>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
