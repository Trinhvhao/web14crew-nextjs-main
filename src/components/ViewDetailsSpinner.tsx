"use client";

import { motion } from "motion/react";

interface ViewDetailsSpinnerProps {
  curveId: string;
  isVisible: boolean;
}

export function ViewDetailsSpinner({ curveId, isVisible }: ViewDetailsSpinnerProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 size-12 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        initial={false}
        animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 24 }}
        className="relative flex size-full items-center justify-center rounded-full border border-white/15 bg-zinc-950/55 shadow-[0_5px_16px_rgba(0,0,0,0.22)] backdrop-blur-[3px]"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          className="size-full motion-reduce:animate-none animate-[spin_8s_linear_infinite]"
        >
          <defs>
            <path id={curveId} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <circle cx="50" cy="50" r="47" stroke="white" strokeOpacity="0.16" strokeWidth="1" />
          <circle cx="50" cy="50" r="41" stroke="white" strokeOpacity="0.08" strokeWidth="0.8" />
          <text fill="white" fontFamily="Inter, Arial, sans-serif" fontSize="8" fontWeight="700" letterSpacing="0.5">
            <textPath href={`#${curveId}`} startOffset="50%" textAnchor="middle">
              VIEW DETAILS • VIEW DETAILS • VIEW DETAILS •
            </textPath>
          </text>
        </svg>

        <div className="absolute flex size-5 items-center justify-center rounded-full border border-white/15 bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_7px_rgba(0,0,0,0.16)] backdrop-blur-sm">
          <svg viewBox="0 0 24 24" className="size-3" aria-hidden="true">
            <path
              d="M2 12C3.8 8.2 7.5 6 12 6s8.2 2.2 10 6c-1.8 3.8-5.5 6-10 6S3.8 15.8 2 12Z"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="2.5" fill="white" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
