"use client";

import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="project-panel"
      style={{
        backgroundColor: "#f2efe9",
        border: "1px solid #e2ddd6",
        borderRadius: "10px",
        overflow: "hidden",
        transition: "box-shadow 0.2s ease",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        padding: "20px 24px 24px",
        height: "100%",
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 20px rgba(26,86,219,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Title + links row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "8px",
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              fontWeight: 600,
              color: "#1a1a1a",
              marginBottom: "2px",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "#1a56db",
            }}
          >
            {project.tagline}
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "#1a56db",
                padding: "3px 10px",
                border: "1px solid #1a56db44",
                borderRadius: "20px",
                textDecoration: "none",
              }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          lineHeight: "1.65",
          color: "#5e5e5e",
          marginBottom: "12px",
        }}
      >
        {project.description}
      </p>

      {/* Tech badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
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
    </div>
  );
}
