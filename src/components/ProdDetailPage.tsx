"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, Play } from "lucide-react";
import { prodData } from "@/data";
import CustomCursor from "@/components/CustomCursor";
import FadeIn from "@/components/FadeIn";
import FloatingContact from "@/components/FloatingContact";

export default function ProdDetailPage({ id }: { id: string }) {
  const activeId = Number.parseInt(id, 10);
  const mainItem = prodData.find((item) => item.id === activeId) ?? prodData[0];

  return (
    <section
      className="relative flex flex-col pt-8 pb-3 px-8 z-10 w-full h-screen font-sans overflow-hidden shrink-0"
      style={{ backgroundColor: "#f4efe6", color: "#791220" }}
    >
      <CustomCursor />
      <FloatingContact />

      {/* Absolute "04-A" */}
      <div className="absolute top-8 right-12 text-3xl font-display font-medium" style={{ color: "#791220" }}>
        04-A
      </div>

      {/* Scroll Indicator - bên trái */}
      <div className="absolute left-8 bottom-24 flex flex-col items-center gap-[6px]">
        <span className="text-[13px] font-bold uppercase tracking-[0.15em] font-sans mb-[8px]" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "#791220" }}>
          SCROLL
        </span>
        <div className="w-[2px] h-[60px] bg-[#F2C94C]" />
        <ArrowDown size={16} className="text-[#F2C94C] stroke-[3] -mt-[2px]" />
      </div>

      {/* Breadcrumb - bên trái trên */}
      <div className="absolute top-8 left-12 z-50 flex items-center gap-4">
        <Link
          href="/#prod"
          className="flex items-center justify-center w-10 h-10 bg-transparent border rounded-full transition-all group shadow-sm hover:shadow-md"
          style={{ color: "#791220", borderColor: "#791220" }}
          aria-label="Back to Prod"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        </Link>
        <div className="font-sans font-bold text-[11px] uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: "#791220" }}>
          <Link href="/" className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">HOME</Link>
          <span className="opacity-50">/</span>
          <Link href="/#prod" className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">PROD</Link>
          <span className="opacity-50">/</span>
          <span className="opacity-100">{mainItem.name}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-24 flex flex-col h-full">

        {/* Header */}
        <FadeIn direction="down" delay={0.1} className="flex justify-between items-end mb-4 flex-shrink-0">
          {/* Left Title */}
          <div className="flex items-end gap-1">
            <h2 className="text-[3.5rem] font-display font-normal uppercase tracking-tighter leading-[0.75] transform scale-y-[1.3] scale-x-95 origin-bottom mr-1" style={{ color: "#791220" }}>
              ON AIR
            </h2>
            <span className="text-[3.5rem] font-sans font-light leading-[0.75] transform scale-y-[1.1] scale-x-75 origin-bottom mx-1 -mb-1 text-black">/</span>
            <div className="flex flex-col pl-1 mb-1">
              <h3 className="text-[1.5rem] font-sans font-bold uppercase tracking-tight border-b-[3px] border-black pb-0 leading-none text-black">
                TESTIMONIAL
              </h3>
              <div className="flex gap-2 justify-center mt-2">
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-pink-100 to-pink-300" />
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-pink-300 to-orange-400" />
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-purple-400 to-blue-500" />
              </div>
            </div>
          </div>

          {/* Right Title */}
          <div className="flex flex-col font-display leading-[1] tracking-tight pb-3 uppercase text-right justify-end" style={{ color: "#791220" }}>
            <span className="font-normal text-[1.8rem] opacity-90">PROJECT BRAND</span>
            <span className="font-bold text-[2.2rem]">THÔNG ĐIỆP BRAND</span>
          </div>
        </FadeIn>

        {/* Main Image */}
        <FadeIn direction="up" delay={0.3} className="relative w-full shadow-lg bg-white p-2 pb-0 flex-1 min-h-0 overflow-hidden">
          <div className="w-full h-full relative">
            <Image
              src={mainItem.img}
              alt={mainItem.name}
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-center"
            />
          </div>
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
            <div className="w-16 h-16 bg-[#F2C94C] rounded-full flex items-center justify-center shadow-lg cursor-pointer">
              <Play size={24} className="fill-current text-[#791220] ml-1" />
            </div>
          </div>
        </FadeIn>

        {/* Thumbnails row - marquee */}
        <FadeIn direction="left" delay={0.5} className="mt-8 overflow-hidden w-full pb-2 flex-shrink-0 h-[120px]">
          <div className="animate-marquee gap-5 h-full" style={{ animation: "marquee 20s linear infinite" }}>
            {[...prodData, ...prodData].map((t, idx) => (
              <Link
                key={`${t.id}-${idx}`}
                href={`/prod/${t.id}`}
                className="relative w-[220px] h-full flex-shrink-0 group cursor-pointer overflow-hidden border border-transparent hover:border-[#F2C94C] transition-all"
              >
                <Image
                  src={t.img}
                  alt={t.name}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-2 left-0 w-full text-center font-display text-[1.2rem] font-bold tracking-wider z-10 leading-tight uppercase px-4 drop-shadow-md text-[#f4efe6]">
                  {t.name}
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>

        {/* Action Button */}
        <FadeIn direction="up" delay={0.7} className="flex justify-center mt-4 flex-shrink-0">
          <button className="flex items-center gap-2 border-[1px] border-black/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
            <div className="w-4 h-4 rounded-full bg-[#e74c3c] flex items-center justify-center">
              <Play size={8} className="fill-current text-white ml-[1px]" />
            </div>
            WATCH ALL ON YOUTUBE
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
