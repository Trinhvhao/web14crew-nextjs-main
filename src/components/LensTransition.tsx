"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

function CameraOverlay() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <motion.svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="lens-mask">
            <rect width="100%" height="100%" fill="white" />
            <motion.circle
              cx="50%"
              cy="50%"
              fill="black"
              initial={{ r: 0 }}
              animate={{ r: [0, "8vw", "8vw", "170vmax"] }}
              transition={{ duration: 0.85, times: [0, 0.28, 0.44, 1], ease: ["easeOut", "linear", "easeIn"] }}
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#0a0a0a" mask="url(#lens-mask)" />
      </motion.svg>

      <motion.div
        className="absolute top-1/2 left-1/2 w-28 h-28 md:w-40 md:h-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-500/70 shadow-[0_0_45px_rgba(239,68,68,0.35)] will-change-transform"
        initial={{ opacity: 0, scale: 0.12 }}
        animate={{ opacity: [0, 0.9, 0.9, 0], scale: [0.12, 1, 1, 18] }}
        transition={{ duration: 0.85, times: [0, 0.28, 0.44, 1], ease: ["easeOut", "linear", "easeIn"] }}
      >
        <div className="absolute inset-2 rounded-full border border-red-500/35" />
        <div className="absolute inset-5 rounded-full border-[6px] border-red-500/20" />
        <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/60" />
        <div className="absolute top-[-5px] left-1/2 w-px h-2 -translate-x-1/2 bg-red-500" />
        <div className="absolute right-[-5px] top-1/2 h-px w-2 -translate-y-1/2 bg-red-500" />
        <div className="absolute bottom-[-5px] left-1/2 w-px h-2 -translate-x-1/2 bg-red-500" />
        <div className="absolute left-[-5px] top-1/2 h-px w-2 -translate-y-1/2 bg-red-500" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 text-red-500 font-mono text-sm will-change-[opacity,transform]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.98, 1, 1, 1.02] }}
        transition={{ duration: 0.85, times: [0, 0.18, 0.44, 1], ease: "easeInOut" }}
      >
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>REC</span>
          </div>
          <span>00:00:00:00</span>
        </div>
        <div className="flex justify-center items-center flex-1">
          <div className="w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] border border-red-500/30 rounded-full flex items-center justify-center relative">
            <div className="w-4 h-full border-t border-b border-red-500/50 absolute" />
            <div className="h-4 w-full border-l border-r border-red-500/50 absolute" />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <span>F/2.8</span>
          <span>ISO 800</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function LensTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative w-full h-full min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          id="lens-wrapper"
          initial={{ opacity: 0.92 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <CameraOverlay key={`overlay-${pathname}`} />
      </AnimatePresence>
    </div>
  );
}
