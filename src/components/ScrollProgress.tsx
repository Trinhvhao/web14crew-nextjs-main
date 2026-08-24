"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const progress = (e as CustomEvent<number>).detail ?? 0;
      indicatorRef.current?.style.setProperty("transform", `scaleX(${progress})`);
    };

    window.addEventListener("__lenis_scroll", handleScroll as EventListener);

    return () => {
      window.removeEventListener("__lenis_scroll", handleScroll as EventListener);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[200] h-[2px] bg-transparent pointer-events-none"
    >
      <div
        ref={indicatorRef}
        className="h-full origin-left bg-[#F2C94C] will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
