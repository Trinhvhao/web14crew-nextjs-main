"use client";

import { useEffect, useState } from "react";
import type Lenis from "lenis";

declare global {
  interface Window {
    __customLenis?: Lenis;
  }
}

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lenis = window.__customLenis;
    if (!lenis) return;

    const handleScroll = () => {
      const fallbackLimit = document.documentElement.scrollHeight - window.innerHeight;
      const rawLimit = lenis.dimensions?.limit;
      const limit = typeof rawLimit === "number" && rawLimit > 0 ? rawLimit : Math.max(0, fallbackLimit);
      const scroll = typeof lenis.scroll === "number" ? lenis.scroll : 0;
      const value = limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0;
      setProgress(value);
    };

    lenis.on("scroll", handleScroll);
    handleScroll();

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[200] h-[2px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full origin-left bg-[#F2C94C] will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}