"use client";

import { useRef } from "react";
import { RotatingCube } from "@/components/RotatingCube";
import { useColumnWidth, COLUMN_MIN, COLUMN_MAX } from "@/contexts/ColumnWidthContext";
import { useTextScramble } from "@/hooks/useTextScramble";

const CUBE_SIZE = 68;

export function PageHeader() {
  const { columnWidth, setColumnWidth } = useColumnWidth();
  const sliderPct = ((columnWidth - COLUMN_MIN) / (COLUMN_MAX - COLUMN_MIN)) * 100;
  const displayName = useTextScramble("Michael Yao", { duration: 1400, delay: 200 });

  return (
    <section
      id="top"
      style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 48px 72px" }}
    >
      {/* Slider styles */}
      <style>{`
        .pretext-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 2px;
          background: linear-gradient(to right, #1a56db ${sliderPct}%, #e2ddd6 ${sliderPct}%);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
          width: 100%;
        }
        .pretext-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #1a56db;
          cursor: pointer;
          box-shadow: 0 0 0 3px rgba(26,86,219,0.15);
          transition: box-shadow 0.15s;
        }
        .pretext-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 5px rgba(26,86,219,0.2);
        }
        .pretext-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #1a56db;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 3px rgba(26,86,219,0.15);
        }
      `}</style>

      {/* Name */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(52px, 7vw, 80px)",
          fontWeight: 700,
          color: "#1a1a1a",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          marginBottom: "12px",
          whiteSpace: "nowrap",
        }}
      >
        {displayName}
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "20px",
          lineHeight: "28px",
          color: "#5e5e5e",
          marginBottom: "36px",
          maxWidth: "520px",
        }}
      >
        Computational chemist · Machine Learning Engineer
      </p>

      {/* Intro text + cube */}
      <div
        style={{
          position: "relative",
          maxWidth: `${columnWidth}px`,
        }}
      >
        {/* Rotating cube — top-right decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: CUBE_SIZE,
            height: CUBE_SIZE,
          }}
        >
          <RotatingCube
            onNavigate={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
            columnWidth={columnWidth}
            onWidthChange={setColumnWidth}
            minWidth={COLUMN_MIN}
            maxWidth={COLUMN_MAX}
          />
        </div>

        {/* Intro paragraphs */}
        <p
          style={{
            fontSize: "20px",
            lineHeight: "1.6",
            color: "#1a1a1a",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            marginBottom: "16px",
            paddingRight: `${CUBE_SIZE + 20}px`,
          }}
        >
          Hey, I&apos;m Michael.
        </p>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.75",
            color: "#1a1a1a",
            fontFamily: "var(--font-body)",
            marginBottom: "16px",
            paddingRight: `${CUBE_SIZE + 20}px`,
          }}
        >
          I&apos;m a student at Harvey Mudd working at the intersection of
          computational chemistry and machine learning. I build tools that help
          scientists move faster (agentic spectroscopy and GNN-powered mass spec
          predictors).
        </p>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.75",
            color: "#5e5e5e",
            fontFamily: "var(--font-body)",
          }}
        >
          When I&apos;m not building software and models, I&apos;m researching
          why water is weird and trying to peek inside the &ldquo;black
          box&rdquo; of reinforcement learning.
        </p>
      </div>

      {/* Width slider */}
      <div
        style={{
          marginTop: "32px",
          width: "75vw",
          maxWidth: "880px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "#9a9a9a",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          column width
        </span>
        <input
          type="range"
          className="pretext-slider"
          min={COLUMN_MIN}
          max={COLUMN_MAX}
          value={columnWidth}
          onChange={(e) => setColumnWidth(Number(e.target.value))}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "#1a56db",
            whiteSpace: "nowrap",
            flexShrink: 0,
            minWidth: "38px",
            textAlign: "right",
          }}
        >
          {columnWidth}px
        </span>
      </div>

      {/* Thin divider */}
      <div
        style={{
          marginTop: "56px",
          height: "1px",
          backgroundColor: "#e2ddd6",
          maxWidth: "680px",
        }}
      />
    </section>
  );
}
