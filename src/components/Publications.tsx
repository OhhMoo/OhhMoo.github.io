"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useScrollAnimation";
import { publications } from "@/data/publications";
import { useColumnWidth } from "@/contexts/ColumnWidthContext";

export function Publications() {
  const sectionRef = useRef<HTMLElement>(null);
  const { columnWidth } = useColumnWidth();

  useGSAP((gsap) => {
    if (!sectionRef.current) return;
    sectionRef.current.querySelectorAll(".fade-in").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <section
      id="publications"
      ref={sectionRef}
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "72px 48px",
      }}
    >
      <div style={{ maxWidth: `${columnWidth}px`, transition: "max-width 0.1s ease" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "36px",
              backgroundColor: "#1a56db",
              borderRadius: "2px",
              flexShrink: 0,
              marginTop: "4px",
            }}
          />
          <h2
            className="fade-in"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "32px",
              lineHeight: "40px",
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            Publications
          </h2>
        </div>

        {publications.length === 0 ? (
          <p
            className="fade-in"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              lineHeight: "1.7",
              color: "#5e5e5e",
              fontStyle: "italic",
            }}
          >
            Research in progress — computational chemistry, mass spectrometry,
            and machine learning for scientific discovery.
          </p>
        ) : (
          <div>
            {publications.map((pub, i) => (
              <div
                key={i}
                className="fade-in"
                style={{
                  padding: "18px 0",
                  borderBottom: "1px solid #e2ddd6",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#1a1a1a",
                    lineHeight: "1.5",
                  }}
                >
                  {pub.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "#9a9a9a",
                  }}
                >
                  {pub.authors} ·{" "}
                  <span style={{ color: "#1a56db" }}>{pub.journal}</span> ·{" "}
                  {pub.year}
                </p>
                <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                  {pub.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        color: "#1a56db",
                      }}
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: "64px",
            height: "1px",
            backgroundColor: "#e2ddd6",
            transition: "max-width 0.1s ease",
          }}
        />
      </div>
    </section>
  );
}
