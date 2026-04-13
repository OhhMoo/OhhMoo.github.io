"use client";

import { useRef } from "react";
import { ParticleCanvasDynamic } from "@/components/ParticleCanvasDynamic";
import { useGSAP } from "@/hooks/useScrollAnimation";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((gsap) => {
    if (!sectionRef.current) return;

    // Fade + lift text as user scrolls
    gsap.to(sectionRef.current.querySelector(".hero-text"), {
      opacity: 0,
      y: -30,
      ease: "power1.in",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "45% top",
        scrub: true,
      },
    });

    // Fade scroll cue immediately
    gsap.to(sectionRef.current.querySelector(".scroll-cue"), {
      opacity: 0,
      ease: "power1.in",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "15% top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* Three.js canvas */}
      <div className="absolute inset-0">
        <ParticleCanvasDynamic mode="hero" className="w-full h-full" />
      </div>

      {/* Text overlay */}
      <div className="hero-text relative z-10 flex flex-col items-center justify-center h-full px-6 text-center pointer-events-none">
        <h1
          className="font-display font-bold leading-tight"
          style={{
            fontSize: "clamp(40px, 6vw, 64px)",
            color: "#e8e8ed",
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.02em",
          }}
        >
          OhhMoo
        </h1>
        <p
          className="mt-4"
          style={{
            fontSize: "20px",
            lineHeight: "28px",
            color: "#8888a0",
            fontFamily: "var(--font-body)",
          }}
        >
          Computational chemist. Software builder.
        </p>
      </div>

      {/* Scroll cue */}
      <div
        className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 select-none"
        style={{
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "#8888a040",
          fontFamily: "var(--font-body)",
          textTransform: "uppercase",
        }}
      >
        scroll
      </div>
    </section>
  );
}
