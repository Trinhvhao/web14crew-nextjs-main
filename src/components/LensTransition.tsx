"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

function CameraOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
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
              animate={{ r: [0, "15vw", "150vw"] }}
              transition={{ duration: 1.8, times: [0, 0.4, 1], ease: ["easeOut", "easeIn"] }}
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#0a0a0a" mask="url(#lens-mask)" />
      </motion.svg>

      <motion.div
        className="absolute inset-0 pointer-events-none flex flex-col justify-between p-12 text-red-500 font-mono text-sm"
        initial={{ opacity: 1, scale: 0.95 }}
        animate={{ opacity: [1, 1, 0], scale: [0.95, 1, 1.1] }}
        transition={{ duration: 1.8, times: [0, 0.4, 1], ease: "easeInOut" }}
      >
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
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
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          id="lens-wrapper"
          initial={{ filter: "blur(15px)", scale: 1.05 }}
          animate={{ filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
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
