"use client";

import { useEffect, useState } from "react";

const sections = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = sections.map((s) => s.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(250,248,245,0.92)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid #e2ddd6",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 48px",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="logo" style={{ width: "48px", height: "48px", borderRadius: "4px" }} />
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 600,
            color: "#1a1a1a",
            letterSpacing: "-0.01em",
          }}>
            Michael Yao
          </span>
        </a>

        {/* Links */}
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: active === s.href.slice(1) ? "#1a1a1a" : "#9a9a9a",
                textDecoration: "none",
                transition: "color 0.15s",
                fontWeight: active === s.href.slice(1) ? 500 : 400,
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "#1a1a1a")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color =
                  active === s.href.slice(1) ? "#1a1a1a" : "#9a9a9a")
              }
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

    </nav>
  );
}
