"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useScrollAnimation";
import { useColumnWidth } from "@/contexts/ColumnWidthContext";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { columnWidth } = useColumnWidth();

  useGSAP((gsap) => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll(".fade-in");
    els.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "72px 48px",
      }}
    >
      <div style={{ maxWidth: `${columnWidth}px`, transition: "max-width 0.1s ease" }}>
        {/* Left accent + heading */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
            marginBottom: "32px",
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
            About
          </h2>
        </div>

        {/* Two-column: text left, photo right */}
        <div
          className="fade-in"
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "flex-start",
          }}
        >
          {/* Left: text content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.75",
                color: "#1a1a1a",
                fontFamily: "var(--font-body)",
                marginBottom: "20px",
              }}
            >
              I&apos;m a first-year student at Harvey Mudd College studying
              chemistry and computer science. Currently, I spend my time:
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ color: "#1a56db", fontFamily: "var(--font-mono)", fontSize: "14px", marginTop: "3px", flexShrink: 0 }}>→</span>
                <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#1a1a1a", fontFamily: "var(--font-body)", margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Engineering Agentic AI</strong> — building
                  SPEQTRO, an autonomous spectroscopy reasoning agent with CLI, GUI, and MCP
                  interfaces. Multi-format spectral parsers and ensemble ML scoring pipelines.
                </p>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ color: "#1a56db", fontFamily: "var(--font-mono)", fontSize: "14px", marginTop: "3px", flexShrink: 0 }}>→</span>
                <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#1a1a1a", fontFamily: "var(--font-body)", margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Researching Atoms</strong> — running
                  large-scale MD simulations under{" "}
                  <strong style={{ fontWeight: 600 }}>Prof. Bilin Zhuang</strong> at Harvey Mudd,
                  studying structural heterogeneity in supercooled water with UMAP, HDBSCAN, and GMM clustering.
                </p>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ color: "#1a56db", fontFamily: "var(--font-mono)", fontSize: "14px", marginTop: "3px", flexShrink: 0 }}>→</span>
                <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#1a1a1a", fontFamily: "var(--font-body)", margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Interpreting RL</strong> — researching
                  mechanistic interpretability of reinforcement learning at{" "}
                  <strong style={{ fontWeight: 600 }}>Algoverse</strong>, training Sparse
                  Autoencoders (SAELens, BatchTopK) and tracking representational drift across
                  PPO training checkpoints.
                </p>
              </li>
              <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ color: "#1a56db", fontFamily: "var(--font-mono)", fontSize: "14px", marginTop: "3px", flexShrink: 0 }}>→</span>
                <p style={{ fontSize: "17px", lineHeight: "1.7", color: "#1a1a1a", fontFamily: "var(--font-body)", margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Exploring GNNs</strong> — migrating
                  MS/MS fragmentation prediction models (ICEBERG) from DGL to PyTorch Geometric,
                  rewriting GGNN, PNA, and GINE layers across 8 model families.
                </p>
              </li>
            </ul>
          </div>

          {/* Right: profile photos stacked */}
          <div
            style={{
              flexShrink: 0,
              width: "200px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pfp.jpg"
              alt="Michael Yao"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: "8px",
                border: "1px solid #e2ddd6",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pfp2.jpg"
              alt="Michael Yao"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: "8px",
                border: "1px solid #e2ddd6",
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "64px",
          height: "1px",
          backgroundColor: "#e2ddd6",
          maxWidth: `${columnWidth}px`,
          transition: "max-width 0.1s ease",
        }}
      />
    </section>
  );
}
