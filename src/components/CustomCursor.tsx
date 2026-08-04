"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 700, mass: 0.5 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 700, mass: 0.5 });
  const dotXSpring = useSpring(cursorX, { damping: 40, stiffness: 1000 });
  const dotYSpring = useSpring(cursorY, { damping: 40, stiffness: 1000 });

  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (event: MouseEvent) => {
      cursorX.set(event.clientX - 16);
      cursorY.set(event.clientY - 16);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const interactiveTarget = target.closest("a, button, .cursor-pointer");
      setIsHovered(Boolean(interactiveTarget));
      setCursorText(interactiveTarget?.getAttribute("data-cursor-text") ?? "");
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="hidden md:flex fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-[#F2C94C] pointer-events-none z-[9999] items-center justify-center text-[10px] font-bold text-black whitespace-nowrap overflow-hidden shadow-sm"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          scale: isHovered ? (cursorText ? 2.5 : 1.5) : 1,
          backgroundColor: isHovered ? (cursorText ? "#F2C94C" : "rgba(242, 201, 76, 0.1)") : "rgba(0, 0, 0, 0)",
          borderColor: isHovered ? "transparent" : "#F2C94C",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <motion.span animate={{ opacity: cursorText ? 1 : 0, y: cursorText ? 0 : 10 }} className="uppercase tracking-wider">
          {cursorText}
        </motion.span>
      </motion.div>
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 bg-[#F2C94C] rounded-full pointer-events-none z-[10000]"
        style={{ x: dotXSpring, y: dotYSpring, translateX: 13, translateY: 13 }}
        animate={{ opacity: isHovered && cursorText ? 0 : 1, scale: isHovered && !cursorText ? 0 : 1 }}
      />
    </>
  );
}
