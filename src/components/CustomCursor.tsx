"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let mouseX = -20;
    let mouseY = -20;
    let visible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
      }
    };

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
      }
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "#1a1a1a",
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
        opacity: 0,
      }}
    />
  );
}
