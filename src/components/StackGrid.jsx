import useIsMobile from "../hooks/useIsMobile";
import { STACK_LAYERS } from "../data/resume";

export default function StackGrid() {
  const isMobile = useIsMobile();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {STACK_LAYERS.map((l, i) => (
        <div key={l.name} style={{
          display: "flex", flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 12 : 20, padding: "18px 24px",
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 14, borderLeft: `3px solid ${l.color}`,
          animation: `fadeUp 0.5s ease ${i * 0.08}s both`
        }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: l.color, minWidth: isMobile ? "auto" : 130 }}>
            {l.name}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {l.items.map(s => (
              <span key={s} style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", padding: "4px 12px", borderRadius: 8,
                fontSize: 12.5, background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
