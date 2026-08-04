"use client";

import Link from "next/link";
import { ArrowDown, ArrowLeft } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { corpData } from "../data";
import CustomCursor from "./CustomCursor";
import FloatingContact from "./FloatingContact";

export default function CorpDetailPage({ slug }: { slug: string }) {
  const mainItem = corpData.find((item) => item.slug === slug) ?? corpData[0];
  const remainingItems = corpData.filter((item) => item.slug !== mainItem.slug);

  while (remainingItems.length < 9) {
    remainingItems.push(remainingItems[0]);
  }

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const btsImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400&h=300",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400&h=300",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400&h=300",
  ];

  const gridImages = [
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1506744626753-eda818311449?auto=format&fit=crop&q=80&w=400&h=250",
    "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=400&h=250",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col pt-8 pb-3 px-4 md:px-8 z-10 w-full h-screen font-sans overflow-hidden shrink-0 bg-[#791220] text-[#f4efe6]"
    >
      <CustomCursor />
      <FloatingContact />

      {/* Section number top right */}
      <div className="absolute top-8 right-12 text-3xl font-display font-medium text-[#f4efe6]">
        03-A
      </div>

      {/* Scroll indicator bottom left */}
      <div className="absolute left-8 bottom-24 flex flex-col items-center gap-[6px]">
        <span
          className="text-[13px] font-bold uppercase tracking-[0.15em] font-sans text-[#F2C94C] mb-[8px]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          SCROLL
        </span>
        <div className="w-[2px] h-[60px] bg-[#F2C94C]" />
        <ArrowDown size={16} className="text-[#F2C94C] stroke-[3] -mt-[2px]" />
      </div>

      {/* Back button and breadcrumb */}
      <div className="absolute top-8 left-12 z-50 flex items-center gap-4">
        <Link
          href="/#corp"
          className="flex items-center justify-center w-10 h-10 bg-transparent text-[#f4efe6] border border-[#f4efe6] rounded-full hover:bg-[#f4efe6] hover:text-[#791220] transition-all group shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        </Link>
        <div className="font-sans font-bold text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 text-[#f4efe6]">
          <Link href="/" className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">HOME</Link>
          <span className="opacity-50">/</span>
          <Link href="/#corp" className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">CORPORATION</Link>
          <span className="opacity-50">/</span>
          <span className="opacity-100">{mainItem.name}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 flex flex-col md:flex-row h-full gap-6 md:gap-12 pt-8 md:pt-14">
        {/* Left Column - 35% */}
        <div className="w-full md:w-[35%] flex flex-col h-full shrink-0">
          {/* Produced by section */}
          <div>
            <h2 className="text-base sm:text-xl md:text-[2rem] font-bold uppercase tracking-tight border-b-[3px] border-[#f4efe6] inline-block pb-1 mb-2 w-fit leading-none">
              PRODUCED BY 14CREW
            </h2>
            <p className="text-sm md:text-[1.1rem] leading-snug opacity-90 mb-2 max-w-[95%] font-medium">
              Thông tin crew : Sản xuất bao nhiêu ngày, thiết bị gì, những kỹ xảo nào...
            </p>
          </div>

          {/* Corporation Film title with scroll animation */}
          <div className="mb-auto mt-8">
            <div className="flex items-center w-full whitespace-nowrap">
              <motion.h1
                style={{ y: titleY }}
                className="text-xl sm:text-2xl md:text-[3.5rem] font-display font-normal uppercase tracking-tighter leading-[0.8] transform scale-y-[1.3] scale-x-[0.95] origin-left"
              >
                CORPORATION FILM...
              </motion.h1>
              <div className="flex-grow h-[2px] bg-[#f4efe6] relative ml-2 -mt-4 opacity-80 min-w-[50px]">
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#f4efe6]" />
              </div>
            </div>
          </div>

          {/* 3x3 Grid with arrow line above */}
          <div className="grid grid-cols-3 gap-3 w-full mb-4 relative">
            {/* Arrow line above grid */}
            <div className="absolute -top-6 left-0 right-0 flex items-center justify-between">
              <div className="w-full h-[2px] bg-[#f4efe6] relative">
                <div className="absolute -left-1 -top-[4px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[8px] border-r-[#f4efe6]" />
                <div className="absolute -right-1 -top-[4px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-[#f4efe6]" />
              </div>
            </div>
            {gridImages.map((src, i) => (
              <div
                key={i}
                className="aspect-video bg-[#9ccc65] relative overflow-hidden cursor-pointer group shadow-md"
              >
                <img
                  src={src}
                  alt={`Grid thumbnail ${i + 1}`}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - 65% */}
        <div className="w-full md:w-[65%] flex flex-col h-full md:border-l-[1px] md:border-[#f4efe6]/30 md:pl-12 py-2">
          {/* 3 small BTS images */}
          <div className="flex justify-center gap-2 md:gap-6 mb-4 flex-wrap">
            {btsImages.map((src, i) => (
              <div
                key={i}
                className="relative w-[100px] sm:w-[140px] md:w-[180px] aspect-[16/9] bg-gray-800 overflow-hidden shadow-lg border-[1px] border-white/10"
              >
                <img src={src} alt={`BTS ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Main Clip */}
          <div
            data-cursor-text="PLAY"
            className="relative w-full aspect-[21/9] bg-gray-900 mb-4 shadow-2xl overflow-hidden border-[1px] border-white/10 group cursor-pointer"
          >
            <img
              src={mainItem.img}
              alt={mainItem.name}
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Bottom section - Clip BTS */}
          <div className="flex gap-12 items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="relative w-[280px] aspect-[16/9] bg-gray-800 overflow-hidden mb-3 shadow-lg border-[1px] border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600&h=337"
                  alt="Clip BTS"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-medium tracking-wide">Clip BTS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
