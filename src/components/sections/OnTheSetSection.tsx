import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import FadeIn from "@/components/FadeIn";

// Images with diverse aspect ratios for bento masonry feel
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

// Distribute images to ensure side columns have more images
const col1 = [btsImages[0], btsImages[3], btsImages[6], btsImages[9], btsImages[12], btsImages[15], btsImages[2]];
const col2 = [btsImages[1], btsImages[4], btsImages[7], btsImages[10], btsImages[13], btsImages[1]];
const col3 = [btsImages[2], btsImages[5], btsImages[8], btsImages[11], btsImages[14], btsImages[0], btsImages[4]];

export default function OnTheSetSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Translate by fixed pixels to guarantee we can pad the container enough
  // Translate by fixed pixels to guarantee we can pad the container enough
  const y1 = useTransform(scrollYProgress, [0, 1], ["50px", "-150px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-150px", "50px"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["50px", "-150px"]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#791220] text-[#f4efe6] pt-24 pb-0 flex flex-col items-center">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 w-full flex flex-col z-20">
        {/* Header */}
        <FadeIn direction="down" delay={0.1} className="flex justify-between items-end mb-12 flex-shrink-0 z-30 relative">
          {/* Left Title */}
          <div className="flex items-end gap-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-display font-normal text-[#f4efe6] uppercase tracking-tighter leading-[0.75] transform scale-y-[1.3] scale-x-95 origin-bottom mr-1 drop-shadow-sm">
              ON THE SET
            </h2>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-sans font-light text-[#f4efe6] leading-[0.75] transform scale-y-[1.1] scale-x-75 origin-bottom mx-1 -mb-1 drop-shadow-sm">/</span>
            <div className="flex flex-col pl-1 mb-1">
              <h3 className="text-[1.5rem] font-sans font-bold uppercase tracking-tight border-b-[3px] border-[#f4efe6] text-[#f4efe6] pb-0 leading-none drop-shadow-sm">
                BEHIND THE SCENES
              </h3>
              <div className="flex gap-2 justify-center mt-2">
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-pink-100 to-pink-300"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-pink-300 to-orange-400"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-orange-400 to-red-500"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-purple-400 to-blue-500"></div>
              </div>
            </div>
          </div>

          {/* Right Title */}
          <div className="flex flex-col text-[#f4efe6] font-display leading-[1] tracking-tight pb-3 uppercase text-right justify-end drop-shadow-sm">
            <span className="font-normal text-sm sm:text-base md:text-lg lg:text-[1.8rem] opacity-90">UNFILTERED</span>
            <span className="font-bold text-base sm:text-lg md:text-xl lg:text-[2.2rem]">MOMENTS</span>
          </div>
        </FadeIn>

        {/* Masonry Grid Wrapper */}
        <div className="relative w-full mt-20 pb-0">
          <div className="w-full relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1 */}
            <motion.div style={{ y: y1 }} className="flex flex-col gap-6 will-change-transform pt-12">
              {col1.map((src, i) => (
                <div key={i} className="w-full overflow-hidden shadow-xl aspect-[16/9]">
                  <img src={src} alt="BTS" loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out will-change-transform" />
                </div>
              ))}
            </motion.div>

            {/* Column 2 */}
            <motion.div style={{ y: y2 }} className="flex flex-col gap-6 will-change-transform">
              {col2.map((src, i) => (
                <div key={i} className="w-full overflow-hidden shadow-xl aspect-[16/9]">
                  <img src={src} alt="BTS" loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out will-change-transform" />
                </div>
              ))}
            </motion.div>

            {/* Column 3 */}
            <motion.div style={{ y: y3 }} className="flex flex-col gap-6 will-change-transform pt-12">
              {col3.map((src, i) => (
                <div key={i} className="w-full overflow-hidden shadow-xl aspect-[16/9]">
                  <img src={src} alt="BTS" loading="lazy" decoding="async" className="w-full h-full object-cover filter grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out will-change-transform" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}