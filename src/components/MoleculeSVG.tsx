export function MoleculeSVG({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: "molecule-spin 60s linear infinite",
        opacity: 0.55,
      }}
    >
      <style>{`
        @keyframes molecule-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes molecule-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Outer hexagon bonds */}
      <line x1="60" y1="10" x2="97" y2="32" stroke="#1a56db" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="97" y1="32" x2="97" y2="76" stroke="#1a56db" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="97" y1="76" x2="60" y2="98" stroke="#1a56db" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="60" y1="98" x2="23" y2="76" stroke="#1a56db" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="23" y1="76" x2="23" y2="32" stroke="#1a56db" strokeWidth="1.2" strokeOpacity="0.4" />
      <line x1="23" y1="32" x2="60" y2="10" stroke="#1a56db" strokeWidth="1.2" strokeOpacity="0.4" />

      {/* Spokes to center */}
      <line x1="60" y1="10" x2="60" y2="54" stroke="#9a9a9a" strokeWidth="0.8" strokeOpacity="0.35" />
      <line x1="97" y1="76" x2="60" y2="54" stroke="#9a9a9a" strokeWidth="0.8" strokeOpacity="0.35" />
      <line x1="23" y1="76" x2="60" y2="54" stroke="#9a9a9a" strokeWidth="0.8" strokeOpacity="0.35" />

      {/* Center node */}
      <circle cx="60" cy="54" r="5" fill="#1a56db" fillOpacity="0.7" />

      {/* Outer atom nodes */}
      <circle cx="60" cy="10" r="4" fill="#1a1a1a" fillOpacity="0.65" />
      <circle cx="97" cy="32" r="3.5" fill="#5e5e5e" fillOpacity="0.5" />
      <circle cx="97" cy="76" r="4" fill="#1a1a1a" fillOpacity="0.65" />
      <circle cx="60" cy="98" r="3.5" fill="#5e5e5e" fillOpacity="0.5" />
      <circle cx="23" cy="76" r="4" fill="#1a1a1a" fillOpacity="0.65" />
      <circle cx="23" cy="32" r="3.5" fill="#5e5e5e" fillOpacity="0.5" />

      {/* Outer decorative ring */}
      <circle
        cx="60"
        cy="54"
        r="46"
        stroke="#1a56db"
        strokeWidth="0.6"
        strokeOpacity="0.12"
        strokeDasharray="4 3"
      />
    </svg>
  );
}
