"use client";

import { type ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    __customLenis?: Lenis;
  }
}

interface LenisProviderProps {
  children: ReactNode;
}

function getHeaderOffset(): number {
  const header = document.querySelector("header");
  return (header?.getBoundingClientRect().height ?? 64) + 16;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        window.__customLenis?.scrollTo(0, { immediate: false });
        return;
      }
      const target = document.querySelector(`[data-scroll-id="${CSS.escape(hash)}"]`);
      if (!target) return;
      window.__customLenis?.scrollTo(target as HTMLElement, {
        immediate: false,
        offset: -getHeaderOffset(),
      });
    };

    const handleAnchorClick = (event: globalThis.MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.origin !== window.location.origin) return;

      const url = new URL(anchor.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      event.preventDefault();
      window.history.pushState({}, "", `${url.pathname}${url.hash}`);
      requestAnimationFrame(() => requestAnimationFrame(scrollToHash));
    };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        window.__customLenis?.scrollTo(0, { immediate: false });
        return;
      }
      const target = document.querySelector(`[data-scroll-id="${CSS.escape(hash)}"]`);
      if (!target) return;
      window.__customLenis?.scrollTo(target as HTMLElement, {
        immediate: false,
        offset: -getHeaderOffset(),
      });
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    window.__customLenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      window.__customLenis = undefined;
      lenis.destroy();
    };
  }, []);

  return children;
}