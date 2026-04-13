"use client";

import { useEffect, useState } from "react";

// ── Edit these labels to whatever you want ──────────────────────────────────
export const TIMELINE_SECTIONS = [
  { id: "top",          label: "Intro"        },
  { id: "about",        label: "About"        },
  { id: "projects",     label: "Projects"     },
  { id: "publications", label: "Research"     },
  { id: "contact",      label: "Contact"      },
];
// ────────────────────────────────────────────────────────────────────────────

const DOT_R = 4;          // dot radius px
const DOT_ACTIVE = 5;     // active dot radius px
const SPACING = 52;       // px between dots
const TOTAL_H = (TIMELINE_SECTIONS.length - 1) * SPACING;

export function SideTimeline() {
  const [active, setActive] = useState("top");
  const [scrollPct, setScrollPct] = useState(0);

  // IntersectionObserver — track which section is in view
  useEffect(() => {
    const ids = TIMELINE_SECTIONS.map((s) => s.id);
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // Scroll percentage for the progress fill
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIdx = TIMELINE_SECTIONS.findIndex((s) => s.id === active);
  const fillY = scrollPct * TOTAL_H;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        // sits further left of the 1100px content column
        left: "max(8px, calc(50vw - 700px))",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        // hide below 1180px — not enough room
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 0,
        opacity: 1,
        // CSS media query via inline style isn't possible — use a wrapper trick
      }}
    >
      <style>{`
        .side-timeline-root {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        @media (max-width: 1280px) {
          .side-timeline-root { display: none !important; }
        }
      `}</style>

      <div className="side-timeline-root" style={{ position: "relative" }}>

        {/* Background track */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: "1px",
            height: TOTAL_H,
            backgroundColor: "#e2ddd6",
            transform: "translateX(-50%)",
          }}
        />

        {/* Filled progress track */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: "1px",
            height: fillY,
            backgroundColor: "#1a56db",
            transform: "translateX(-50%)",
            transition: "height 0.12s linear",
          }}
        />

        {/* Dots + labels */}
        {TIMELINE_SECTIONS.map((section, i) => {
          const isActive = section.id === active;
          const isPast = i < activeIdx;
          const dotSize = isActive ? DOT_ACTIVE * 2 : DOT_R * 2;

          return (
            <div
              key={section.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                height: i < TIMELINE_SECTIONS.length - 1 ? SPACING : "auto",
                alignSelf: "flex-end",
              }}
            >
              {/* Label */}
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: isActive ? "#1a1a1a" : "#b0aba4",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  fontWeight: isActive ? 600 : 400,
                  transition: "color 0.2s",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#1a1a1a")}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = isActive ? "#1a1a1a" : "#b0aba4")
                }
              >
                {section.label}
              </a>

              {/* Dot */}
              <div
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: "50%",
                  backgroundColor: isActive ? "#1a56db" : isPast ? "#1a56db" : "transparent",
                  border: `1.5px solid ${isActive || isPast ? "#1a56db" : "#c8c3bc"}`,
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
