"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useScrollAnimation";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

function PACMCDiagram() {
  return (
    <svg viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", padding: "16px" }}>
      <defs>
        <marker id="arrowP" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#9a9a9a" />
        </marker>
      </defs>
      <rect x="75" y="72" width="70" height="36" rx="6" fill="#1a56db11" stroke="#1a56db" strokeWidth="1.2" />
      <text x="110" y="87" textAnchor="middle" fill="#1a56db" fontSize="8" fontFamily="monospace" fontWeight="600">CMC</text>
      <text x="110" y="99" textAnchor="middle" fill="#1a56db" fontSize="8" fontFamily="monospace">Agent</text>
      <rect x="6" y="80" width="54" height="22" rx="4" fill="#f2efe9" stroke="#e2ddd6" strokeWidth="1" />
      <text x="33" y="89" textAnchor="middle" fill="#5e5e5e" fontSize="7" fontFamily="monospace">CMC Change</text>
      <text x="33" y="99" textAnchor="middle" fill="#5e5e5e" fontSize="7" fontFamily="monospace">Request</text>
      <line x1="60" y1="91" x2="75" y2="91" stroke="#9a9a9a" strokeWidth="1" markerEnd="url(#arrowP)" />
      <rect x="82" y="16" width="56" height="22" rx="4" fill="#f2efe9" stroke="#e2ddd6" strokeWidth="1" />
      <text x="110" y="28" textAnchor="middle" fill="#5e5e5e" fontSize="7.5" fontFamily="monospace">FDA</text>
      <text x="110" y="34" textAnchor="middle" fill="#9a9a9a" fontSize="6" fontFamily="monospace">SUPAC · NDA</text>
      <line x1="110" y1="38" x2="110" y2="72" stroke="#9a9a9a" strokeWidth="0.8" strokeDasharray="3,2" />
      <rect x="158" y="56" width="56" height="22" rx="4" fill="#f2efe9" stroke="#e2ddd6" strokeWidth="1" />
      <text x="186" y="68" textAnchor="middle" fill="#5e5e5e" fontSize="7.5" fontFamily="monospace">EMA</text>
      <text x="186" y="74" textAnchor="middle" fill="#9a9a9a" fontSize="6" fontFamily="monospace">Type I / II</text>
      <line x1="158" y1="67" x2="145" y2="85" stroke="#9a9a9a" strokeWidth="0.8" strokeDasharray="3,2" />
      <rect x="158" y="110" width="56" height="22" rx="4" fill="#f2efe9" stroke="#e2ddd6" strokeWidth="1" />
      <text x="186" y="122" textAnchor="middle" fill="#5e5e5e" fontSize="7.5" fontFamily="monospace">PMDA</text>
      <text x="186" y="128" textAnchor="middle" fill="#9a9a9a" fontSize="6" fontFamily="monospace">一部変更</text>
      <line x1="158" y1="121" x2="145" y2="102" stroke="#9a9a9a" strokeWidth="0.8" strokeDasharray="3,2" />
      <rect x="6" y="126" width="54" height="28" rx="4" fill="#1a56db08" stroke="#1a56db44" strokeWidth="1" />
      <text x="33" y="138" textAnchor="middle" fill="#1a56db" fontSize="7" fontFamily="monospace">Filing</text>
      <text x="33" y="148" textAnchor="middle" fill="#1a56db" fontSize="7" fontFamily="monospace">Decision</text>
      <line x1="75" y1="100" x2="60" y2="130" stroke="#1a56db55" strokeWidth="1" />
    </svg>
  );
}

function WaterClusteringDiagram() {
  // 4-stage horizontal pipeline: MD Sim → Order Params → Clustering → Structure Factor
  const W = 260; const H = 200;
  const stages = [
    { x: 10,  label: "MD Simulation", sub: "OpenMM NVT",     color: "#1a56db" },
    { x: 75,  label: "Order Params",  sub: "q, Q₆, LSI, ζ",  color: "#1a56db" },
    { x: 140, label: "Clustering",    sub: "UMAP→HDBSCAN→GMM",color: "#1a56db" },
    { x: 205, label: "S(k, ζ)",       sub: "Structure Factor", color: "#1a56db" },
  ];
  const bW = 50; const bH = 38; const bY = 70;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", padding: "12px" }}>
      <defs>
        <marker id="arrowW" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill="#9a9a9a" />
        </marker>
      </defs>

      {/* Title */}
      <text x={W/2} y="16" textAnchor="middle" fill="#1a1a1a" fontSize="8.5"
        fontFamily="monospace" fontWeight="600" letterSpacing="0.5">
        ANALYSIS PIPELINE
      </text>

      {/* Stage boxes + labels */}
      {stages.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={bY} width={bW} height={bH} rx="4"
            fill="#1a56db08" stroke="#1a56db55" strokeWidth="1" />
          <text x={s.x + bW/2} y={bY + 13} textAnchor="middle"
            fill="#1a56db" fontSize="6.5" fontFamily="monospace" fontWeight="600">
            {s.label.split(" ")[0]}
          </text>
          <text x={s.x + bW/2} y={bY + 22} textAnchor="middle"
            fill="#1a56db" fontSize="6.5" fontFamily="monospace">
            {s.label.split(" ").slice(1).join(" ")}
          </text>
          {/* Sub-label */}
          <text x={s.x + bW/2} y={bY + bH + 11} textAnchor="middle"
            fill="#9a9a9a" fontSize="5.5" fontFamily="monospace">
            {s.sub}
          </text>
          {/* Arrow to next */}
          {i < stages.length - 1 && (
            <line
              x1={s.x + bW + 1} y1={bY + bH/2}
              x2={stages[i+1].x - 2} y2={bY + bH/2}
              stroke="#c8c3bc" strokeWidth="1"
              markerEnd="url(#arrowW)"
            />
          )}
        </g>
      ))}

      {/* Output labels */}
      <text x={W/2} y={bY + bH + 32} textAnchor="middle"
        fill="#5e5e5e" fontSize="6" fontFamily="monospace">
        LFTS / DNLS classification · TIP4P/2005 · TIP5P
      </text>

      {/* Two-state framework citation */}
      <text x={W/2} y={bY + bH + 44} textAnchor="middle"
        fill="#b0aba4" fontSize="5.5" fontFamily="monospace">
        Shi &amp; Tanaka, JACS 2020
      </text>
    </svg>
  );
}

function FeaturedPanel({ project }: { project: (typeof projects)[0] }) {
  const IMAGE_WIDTH = "42%";
  const hasIframes = project.iframes && project.iframes.length > 0;

  return (
    <div style={{ width: "100%" }}>
      {/* Top row: description + tags + links | image or diagram */}
      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start", width: "100%" }}>
        {/* Left: description + tags + links */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.75",
              color: "#1a1a1a",
              fontFamily: "var(--font-body)",
              marginBottom: "14px",
            }}
          >
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "#1a1a1a",
                  backgroundColor: "#e8e3dc",
                  border: "1px solid #d8d3cc",
                  borderRadius: "4px",
                  padding: "2px 7px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "#1a56db",
                  textDecoration: "none",
                  padding: "4px 14px",
                  border: "1px solid #1a56db55",
                  borderRadius: "20px",
                }}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Right: image or SVG diagram — shown when project has an image (even alongside iframes) */}
        {(project.image || !hasIframes) && (
          <div
            style={{
              width: IMAGE_WIDTH,
              flexShrink: 0,
              aspectRatio: project.imageAspect ? `1 / ${project.imageAspect}` : "1 / 0.82",
              backgroundColor: project.image ? "#faf8f5" : "#f2efe9",
              border: "1px solid #e2ddd6",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {project.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: project.imageFit ?? "contain",
                  objectPosition: "center",
                  padding: (project.imageFit ?? "contain") === "cover" ? 0 : "20px 24px",
                }}
              />
            ) : (
              <PACMCDiagram />
            )}
          </div>
        )}
      </div>

      {/* Interactive Plotly iframes — rendered below when present */}
      {hasIframes && (
        <div style={{ marginTop: "28px" }}>
          {/* Section label row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
          }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "#b0aba4",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              Interactive · drag to pan · scroll to zoom
            </span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#e2ddd6" }} />
          </div>

          {/* Iframe grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: project.iframes!.length > 1 ? "1fr 1fr" : "1fr",
            gap: "14px",
          }}>
            {project.iframes!.map((iframe) => (
              <div key={iframe.src}>
                {/* Label above */}
                {iframe.label && (
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "#5e5e5e",
                    letterSpacing: "0.04em",
                    marginBottom: "6px",
                    textAlign: "center",
                    fontWeight: 500,
                  }}>
                    {iframe.label}
                  </p>
                )}
                {/* Media: gif → <img>, html → <iframe> */}
                <div style={{
                  border: "1px solid #e2ddd6",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: iframe.src.endsWith(".gif") ? "#0d1117" : "#faf8f5",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                }}>
                  {iframe.src.endsWith(".gif") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={iframe.src}
                      alt={iframe.label ?? project.title}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        maxHeight: "460px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <iframe
                      src={iframe.src}
                      style={{
                        width: "100%",
                        height: "420px",
                        border: "none",
                        display: "block",
                      }}
                      title={iframe.label ?? project.title}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((gsap) => {
    if (!sectionRef.current) return;
    sectionRef.current.querySelectorAll(".fade-in").forEach((el) => {
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

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ maxWidth: "1100px", margin: "0 auto", padding: "72px 48px" }}
    >
      {/* Section heading */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
          marginBottom: "40px",
          maxWidth: "680px",
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
          Projects
        </h2>
      </div>

      {/* Featured projects */}
      <p
        className="fade-in"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "#9a9a9a",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "24px",
        }}
      >
        Featured
      </p>

      {featured.map((project) => (
        <div
          key={project.id}
          className="project-panel fade-in"
          style={{
            maxWidth: "840px",
            marginBottom: "48px",
            paddingBottom: "48px",
            borderBottom: "1px solid #e2ddd6",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "26px",
                fontWeight: 600,
                color: "#1a1a1a",
                letterSpacing: "-0.02em",
                marginBottom: "4px",
              }}
            >
              {project.title}
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#5e5e5e" }}>
              {project.tagline}
            </p>
          </div>

          <FeaturedPanel project={project} />
        </div>
      ))}

      {/* Other projects */}
      <p
        className="fade-in"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "#9a9a9a",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "20px",
          marginTop: "8px",
        }}
      >
        Other Projects
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gridAutoRows: "1fr",
          gap: "16px",
          maxWidth: "840px",
        }}
      >
        {rest.map((project) => (
          <div key={project.id} className="project-panel fade-in" style={{ display: "flex" }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "64px",
          height: "1px",
          backgroundColor: "#e2ddd6",
          maxWidth: "680px",
        }}
      />
    </section>
  );
}
