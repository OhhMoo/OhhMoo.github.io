"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Base size — faces are authored at 68px, scaled via perspective
const S = 68;
const H = S / 2;

const FACES = [
  { id: "front",  t: `translateZ(${H}px)`,                       bg: "#1a1a1a", bd: "#2e2e2e", label: "↕" },
  { id: "back",   t: `rotateY(180deg) translateZ(${H}px)`,       bg: "#141414", bd: "#282828", label: ""  },
  { id: "right",  t: `rotateY(90deg) translateZ(${H}px)`,        bg: "#181818", bd: "#2a2a2a", label: ""  },
  { id: "left",   t: `rotateY(-90deg) translateZ(${H}px)`,       bg: "#181818", bd: "#2a2a2a", label: ""  },
  { id: "top",    t: `rotateX(90deg) translateZ(${H}px)`,        bg: "#111111", bd: "#252525", label: ""  },
  { id: "bottom", t: `rotateX(-90deg) translateZ(${H}px)`,       bg: "#111111", bd: "#252525", label: ""  },
];

type Props = {
  onNavigate?: () => void;
  columnWidth?: number;
  onWidthChange?: (w: number) => void;
  minWidth?: number;
  maxWidth?: number;
};

export function RotatingCube({
  onNavigate,
  columnWidth = 580,
  onWidthChange,
  minWidth = 300,
  maxWidth = 880,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Track drag state in a ref to avoid stale closures
  const dragRef = useRef<{
    startX: number;
    startWidth: number;
    hasMoved: boolean;
  } | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragRef.current = {
        startX: e.clientX,
        startWidth: columnWidth,
        hasMoved: false,
      };
      setIsDragging(true);
    },
    [columnWidth]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0]!;
      dragRef.current = {
        startX: touch.clientX,
        startWidth: columnWidth,
        hasMoved: false,
      };
      setIsDragging(true);
    },
    [columnWidth]
  );

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return;
      const clientX =
        "touches" in e ? e.touches[0]!.clientX : (e as MouseEvent).clientX;
      const delta = clientX - dragRef.current.startX;
      if (Math.abs(delta) > 3) dragRef.current.hasMoved = true;
      const newWidth = Math.max(
        minWidth,
        Math.min(maxWidth, dragRef.current.startWidth + delta)
      );
      onWidthChange?.(newWidth);
    };

    const onUp = (e: MouseEvent | TouchEvent) => {
      if (dragRef.current && !dragRef.current.hasMoved) {
        // true click — no drag
        onNavigate?.();
      }
      dragRef.current = null;
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, onNavigate, onWidthChange, minWidth, maxWidth]);

  // Derive animation speed from drag velocity (faster drag = faster spin)
  const spinDuration = isDragging ? "4s" : hovered ? "18s" : "7s";

  return (
    <>
      <style>{`
        @keyframes cube-rotate {
          from { transform: rotateX(-18deg) rotateY(0deg); }
          to   { transform: rotateX(-18deg) rotateY(360deg); }
        }
      `}</style>

      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title="drag to resize · click for about"
        style={{
          width: S,
          height: S,
          perspective: `${S * 3.5}px`,
          cursor: "none",
          position: "relative",
          userSelect: "none",
        }}
      >
        {/* Cube */}
        <div
          style={{
            width: S,
            height: S,
            position: "relative",
            transformStyle: "preserve-3d",
            animation: `cube-rotate ${spinDuration} linear infinite`,
            transition: "animation-duration 0.3s",
          }}
        >
          {FACES.map((f) => (
            <div
              key={f.id}
              style={{
                position: "absolute",
                width: S,
                height: S,
                transform: f.t,
                backgroundColor: f.bg,
                border: `1px solid ${isDragging ? "#1a56db99" : f.bd}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
            >
              {f.label && (
                <span
                  style={{
                    fontSize: "16px",
                    color: "#555555",
                    fontFamily: "var(--font-body)",
                    userSelect: "none",
                  }}
                >
                  {f.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Hover label */}
        <div
          style={{
            position: "absolute",
            bottom: `calc(100% + 8px)`,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "#c8c3bc",
            whiteSpace: "nowrap",
            backgroundColor: "#1a1a1a",
            border: "1px solid #333",
            padding: "3px 8px",
            borderRadius: "4px",
            pointerEvents: "none",
            opacity: hovered && !isDragging ? 1 : 0,
            transition: "opacity 0.15s ease",
          }}
        >
          drag ↔ resize · click ↓ about
        </div>
      </div>
    </>
  );
}
