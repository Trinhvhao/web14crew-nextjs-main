"use client";

import { useEffect, useId, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ViewDetailsSpinner } from "@/components/ViewDetailsSpinner";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 700, mass: 0.5 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 700, mass: 0.5 });
  const dotXSpring = useSpring(cursorX, { damping: 40, stiffness: 1000 });
  const dotYSpring = useSpring(cursorY, { damping: 40, stiffness: 1000 });
  const curveId = `view-details-${useId().replace(/:/g, "")}`;
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const hasCursorText = Boolean(cursorText);

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

    const resetCursor = () => {
      setIsHovered(false);
      setCursorText("");
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("blur", resetCursor);
    document.documentElement.addEventListener("mouseleave", resetCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("blur", resetCursor);
      document.documentElement.removeEventListener("mouseleave", resetCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="hidden md:flex fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-[#F2C94C] pointer-events-none z-[9999] items-center justify-center text-black shadow-sm"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          scale: isHovered ? (hasCursorText ? 1 : 1.5) : 1,
          backgroundColor: isHovered && !hasCursorText ? "rgba(242, 201, 76, 0.1)" : "rgba(0, 0, 0, 0)",
          borderColor: isHovered && hasCursorText ? "rgba(242, 201, 76, 0)" : "#F2C94C",
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <ViewDetailsSpinner curveId={curveId} isVisible={hasCursorText} />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 bg-[#F2C94C] rounded-full pointer-events-none z-[10000]"
        style={{ x: dotXSpring, y: dotYSpring, translateX: 13, translateY: 13 }}
        animate={{ opacity: isHovered && hasCursorText ? 0 : 1, scale: isHovered && !hasCursorText ? 0 : 1 }}
      />
    </>
  );
}
