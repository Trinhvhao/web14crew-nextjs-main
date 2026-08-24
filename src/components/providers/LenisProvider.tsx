"use client";

import { type ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    __customLenis?: Lenis;
    __lenisRafId?: number;
  }
}

interface LenisProviderProps {
  children: ReactNode;
}

function getHeaderOffset(): number {
  const header = document.querySelector("header");
  return header?.getBoundingClientRect().height ?? 64;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname();

  // ── Hash + anchor scroll ──────────────────────────────────────────────────
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

  // ── Scroll to hash on route change ───────────────────────────────────────
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

  // ── Lenis instance ───────────────────────────────────────────────────────
  useEffect(() => {
    if (window.__lenisRafId) {
      cancelAnimationFrame(window.__lenisRafId);
    }

    // lerp là cơ chế mượt theo từng frame; duration là cơ chế Easing timing.
    // Lenis v1.x chỉ dùng một trong hai cùng lúc → ưu tiên lerp cho cảm giác scroll liên tục.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    window.__customLenis = lenis;

    lenis.on("scroll", ({ progress }: Lenis) => {
      window.dispatchEvent(new CustomEvent("__lenis_scroll", { detail: progress }));
    });

    const raf = (time: number) => {
      lenis.raf(time);
      window.__lenisRafId = requestAnimationFrame(raf);
    };
    window.__lenisRafId = requestAnimationFrame(raf);

    return () => {
      if (window.__lenisRafId) cancelAnimationFrame(window.__lenisRafId);
      window.__lenisRafId = undefined;
      window.__customLenis = undefined;
      lenis.destroy();
    };
  }, []);

  return children;
}
