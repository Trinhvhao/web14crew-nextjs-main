"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  /** Distance beyond viewport edge (in px) at which the animation should start. */
  marginPx?: number;
}

function getInitial(direction: FadeInProps["direction"]) {
  switch (direction) {
    case "up": return { opacity: 0, y: 24 };
    case "down": return { opacity: 0, y: -24 };
    case "left": return { opacity: 0, x: 32 };
    case "right": return { opacity: 0, x: -32 };
    case "none": return { opacity: 0 };
  }
}

function getAnimate() {
  return { opacity: 1, y: 0, x: 0 };
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  marginPx = 120,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // useInView chạy qua IntersectionObserver kèm margin dương → trigger sớm.
  // mount: true đảm bảo nếu element đã trong viewport lúc render đầu, vẫn tính là in-view.
  const inView = useInView(ref, { once: true, margin: `0px 0px ${marginPx}px 0px` });

  const target = inView ? getAnimate() : getInitial(direction);

  return (
    <motion.div
      ref={ref}
      initial={getInitial(direction)}
      animate={target}
      onAnimationComplete={() => ref.current?.style.removeProperty("will-change")}
      style={inView ? undefined : { willChange: "opacity, transform" }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
