"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging spring effect for the outer ring
  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.classList.contains("cursor-pointer")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, hidden, mouseX, mouseY]);

  if (isMobile || hidden) return null;

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: hovered ? "var(--brand)" : "rgba(54, 191, 250, 0.4)",
          background: hovered ? "rgba(54, 191, 250, 0.05)" : "transparent",
          boxShadow: hovered ? "0 0 15px rgba(54, 191, 250, 0.2)" : "none",
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(135deg, var(--brand), var(--accent))",
          boxShadow: "0 0 10px rgba(54, 191, 250, 0.6)",
        }}
        animate={{
          scale: hovered ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      />
    </>
  );
}
