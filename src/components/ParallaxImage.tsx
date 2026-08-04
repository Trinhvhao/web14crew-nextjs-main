"use client";

import Image from "next/image";
import { type CSSProperties, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  offset?: number;
}

export default function ParallaxImage({ src, alt, className = "", style, offset = 150 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none mix-blend-soft-light opacity-[0.07]">
      <motion.div
        style={{ y, willChange: "transform", transform: "translateZ(0)" }}
        className="relative h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="800px"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiLz4="
          className={className}
          style={style}
        />
      </motion.div>
    </div>
  );
}
