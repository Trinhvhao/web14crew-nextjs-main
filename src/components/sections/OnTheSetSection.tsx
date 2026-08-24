"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const btsImages = [
  "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1518131672697-613becd4fab5?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1527555611100-3fb1c9dcb9ea?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1579623261984-41f9a81d4044?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1521406859897-f58c707567ae?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1535016120720-40c746a51d8c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1524275804141-5582f342dbf3?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?auto=format&fit=crop&q=80&w=800",
];

const col1 = [btsImages[0], btsImages[3], btsImages[6], btsImages[9], btsImages[12], btsImages[15], btsImages[2]];
const col2 = [btsImages[1], btsImages[4], btsImages[7], btsImages[10], btsImages[13], btsImages[1]];
const col3 = [btsImages[2], btsImages[5], btsImages[8], btsImages[11], btsImages[14], btsImages[0], btsImages[4]];

export default function OnTheSetSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-150, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  return (
    <section ref={containerRef} className="relative w-full bg-[#791220] text-[#f4efe6] pt-24 pb-0 flex flex-col items-center">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 w-full flex flex-col z-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 flex-shrink-0 z-30 relative gap-4">
          {/* Left: ON THE SET / BEHIND THE SCENES + dots, all in one row */}
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-display font-normal text-[#f4efe6] uppercase tracking-tighter leading-[0.75] scale-y-[1.3] scale-x-95 drop-shadow-sm shrink-0">
              ON THE SET
            </h2>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-sans font-light text-[#f4efe6] leading-[0.75] scale-y-[1.1] scale-x-75 shrink-0">/</span>
            <div className="flex flex-col items-center">
              <h3 className="text-[1.5rem] font-sans font-bold uppercase tracking-tight border-b-[3px] border-[#f4efe6] text-[#f4efe6] leading-none drop-shadow-sm">
                BEHIND THE SCENES
              </h3>
              <div className="flex gap-2 justify-center mt-2">
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-pink-100 to-pink-300" />
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-pink-300 to-orange-400" />
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-purple-400 to-blue-500" />
              </div>
            </div>
          </div>

          {/* Right: UNFILTERED MOMENTS */}
          <div className="flex flex-col text-[#f4efe6] font-display leading-[1] tracking-tight uppercase text-right justify-center shrink-0 drop-shadow-sm">
            <span className="font-normal text-sm sm:text-base md:text-lg lg:text-[1.8rem] opacity-90">UNFILTERED</span>
            <span className="font-bold text-base sm:text-lg md:text-xl lg:text-[2.2rem]">MOMENTS</span>
          </div>
        </div>

        {/* Masonry Grid — CSS hover effects only, no JS-driven parallax */}
        <div className="relative w-full pb-0">
          <div className="w-full relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {([col1, col2, col3] as string[][]).map((col, colIdx) => {
              const columnY = [y1, y2, y3][colIdx];

              return <motion.div
                key={colIdx}
                style={{ y: columnY }}
                className={`flex flex-col gap-6 will-change-transform ${colIdx === 0 || colIdx === 2 ? "pt-12" : ""}`}
              >
                {col.map((src, i) => (
                  <div key={`${src}-${i}`} className="group relative w-full overflow-hidden shadow-xl aspect-video">
                    <Image
                      src={src}
                      alt="Behind the scenes"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={65}
                      className="w-full h-full object-cover grayscale transition-[filter,transform] duration-700 ease-out will-change-transform group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </div>
                ))}
              </motion.div>
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
