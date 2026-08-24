"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedCounter({ value, duration = 2, suffix = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "-100px" });
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => `${Math.floor(current)}${suffix}`);

  useEffect(() => {
    spring.set(inView ? value : 0);
  }, [inView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}
