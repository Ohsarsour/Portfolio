import { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";

export default function ProjectCard({ title, desc, tags, icon, featured }) {
  const isMobile = useIsMobile();
  const [h, setH] = useState(false);

  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? "rgba(167,139,250,0.05)" : "rgba(255,255,255,0.02)",
      border: `1px solid ${h ? "rgba(167,139,250,0.25)" : featured ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.05)"}`,
      borderRadius: 16, padding: 26, transition: "all 0.3s ease",
      transform: h ? "translateY(-3px)" : "none",
      boxShadow: h ? "0 8px 32px rgba(0,0,0,0.25)" : "none",
      gridColumn: featured && !isMobile ? "span 2" : "auto"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 26 }}>{icon}</span>
        {featured && (
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, color: "#a78bfa", background: "rgba(167,139,250,0.1)", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(167,139,250,0.2)" }}>
            FEATURED
          </span>
        )}
      </div>
      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", margin: "12px 0 8px" }}>{title}</h3>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: "0 0 14px" }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {tags.map(t => (
          <span key={t} style={{
            padding: "3px 10px", borderRadius: 6, fontSize: 10.5, fontWeight: 600,
            background: "rgba(167,139,250,0.06)", color: "#a78bfa",
            border: "1px solid rgba(167,139,250,0.1)", fontFamily: "'JetBrains Mono', monospace"
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
