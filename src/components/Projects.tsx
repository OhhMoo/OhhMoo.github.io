"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useScrollAnimation";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

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

        {/* Right: image panel — only when project has an explicit image */}
        {project.image && (
          <div
            style={{
              width: IMAGE_WIDTH,
              flexShrink: 0,
              aspectRatio: project.imageAspect ? `1 / ${project.imageAspect}` : "1 / 0.82",
              backgroundColor: "#faf8f5",
              border: "1px solid #e2ddd6",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
          </div>
        )}
      </div>

      {/* Interactive Plotly iframes — rendered below when present */}
      {hasIframes && (
        <div style={{ marginTop: "28px" }}>
          {/* Section label row — only for interactive HTML embeds, not GIFs */}
          {project.iframes!.some((f) => !f.src.endsWith(".gif")) && (
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
          )}

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
                {/* Media: gif/mov → terminal window, html → <iframe> */}
                {(iframe.src.endsWith(".gif") || iframe.src.endsWith(".mov") || iframe.src.endsWith(".mp4") || iframe.src.endsWith(".webm")) ? (
                  <div style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
                    border: "1px solid #2a2a2a",
                  }}>
                    {/* Top bar */}
                    <div style={{
                      backgroundColor: "#1e1e1e",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      borderBottom: "1px solid #2a2a2a",
                    }}>
                      {/* Traffic lights */}
                      <div style={{ display: "flex", gap: "6px" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff5f57" }} />
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#febc2e" }} />
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#28c840" }} />
                      </div>
                      {/* Title */}
                      <span style={{
                        flex: 1,
                        textAlign: "center",
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        color: "#888",
                        marginRight: "42px",
                      }}>
                        speqtro
                      </span>
                    </div>
                    {/* Media */}
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
                          backgroundColor: "#0d1117",
                        }}
                      />
                    ) : (
                      <video
                        src={iframe.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          maxHeight: "460px",
                          objectFit: "contain",
                          backgroundColor: "#0d1117",
                        }}
                      />
                    )}
                    {/* Bottom bar */}
                    <div style={{
                      backgroundColor: "#1e1e1e",
                      padding: "7px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      borderTop: "1px solid #2a2a2a",
                    }}>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "#0d9488",
                        backgroundColor: "#0d948822",
                        padding: "1px 7px",
                        borderRadius: "3px",
                      }}>
                        v0.1.4
                      </span>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "#555",
                      }}>
                        21 tools loaded · /help for commands · Ctrl+C to exit
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    border: "1px solid #e2ddd6",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#faf8f5",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                  }}>
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
                  </div>
                )}
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
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 98%",
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
