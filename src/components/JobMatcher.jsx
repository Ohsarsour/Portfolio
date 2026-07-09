import { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import { MATCHER_PROMPT } from "../data/resume";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const body = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

export default function JobMatcher() {
  const isMobile = useIsMobile();
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async () => {
    if (!jd.trim() || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: MATCHER_PROMPT,
          messages: [{ role: "user", content: `Analyze this job description:\n\n${jd}` }]
        })
      });
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("") || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch {
      setError("Couldn't analyze — try again or check the job description.");
    }
    setLoading(false);
  };

  const pct = result?.matchPercentage || 0;
  const pctColor = pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f87171";

  if (!result) {
    return (
      <div>
        <p style={{ ...body, fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 20, lineHeight: 1.7 }}>
          Hiring for a role? Paste the job description and my AI will give you an honest analysis of how well I match — including the gaps.
        </p>
        <textarea value={jd} onChange={e => setJd(e.target.value)} placeholder="Paste the full job description here..."
          rows={8} style={{
            width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14, padding: 16, color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.6,
            ...body, outline: "none", resize: "vertical", marginBottom: 16
          }} />
        <button onClick={analyze} disabled={loading || !jd.trim()} style={{
          ...body, padding: "13px 30px", borderRadius: 12, border: "none",
          cursor: jd.trim() && !loading ? "pointer" : "default",
          background: jd.trim() && !loading ? "linear-gradient(135deg, #a78bfa, #60a5fa)" : "rgba(255,255,255,0.05)",
          color: "#fff", fontWeight: 700, fontSize: 14, transition: "all 0.2s",
          boxShadow: jd.trim() && !loading ? "0 4px 16px rgba(167,139,250,0.25)" : "none"
        }}>
          {loading ? "Analyzing..." : "✨ Analyze Match"}
        </button>
        {error && <p style={{ ...body, color: "#f87171", fontSize: 13, marginTop: 12 }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 36, flexWrap: "wrap" }}>
        <div style={{ position: "relative", width: 110, height: 110 }}>
          <svg width="110" height="110" viewBox="0 0 110 110">
            <circle cx="55" cy="55" r="48" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
            <circle cx="55" cy="55" r="48" fill="none" stroke={pctColor} strokeWidth="8"
              strokeDasharray={`${pct * 3.01} 999`} strokeLinecap="round"
              transform="rotate(-90 55 55)" style={{ transition: "stroke-dasharray 1s ease" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <span style={{ ...mono, fontSize: 28, fontWeight: 800, color: pctColor }}>{pct}%</span>
            <span style={{ ...mono, fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>MATCH</span>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <p style={{ ...body, fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{result.summary}</p>
        </div>
      </div>

      {result.strongPoints?.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ ...mono, fontSize: 11, fontWeight: 700, color: "#34d399", letterSpacing: 1, marginBottom: 10 }}>STRONG POINTS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {result.strongPoints.map((s, i) => (
              <div key={i} style={{ ...body, fontSize: 13, color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ color: "#34d399", fontSize: 14 }}>✓</span> {s}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 28 }}>
        <div style={{ background: "rgba(52,211,153,0.04)", border: "1px solid rgba(52,211,153,0.1)", borderRadius: 14, padding: 18 }}>
          <div style={{ ...mono, fontSize: 11, fontWeight: 700, color: "#34d399", letterSpacing: 1, marginBottom: 10 }}>MATCHED SKILLS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {result.matchedSkills?.map(s => (
              <span key={s} style={{ ...mono, padding: "3px 10px", borderRadius: 6, fontSize: 11, background: "rgba(52,211,153,0.08)", color: "#34d399", border: "1px solid rgba(52,211,153,0.15)" }}>{s}</span>
            ))}
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: 18 }}>
          <div style={{ ...mono, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginBottom: 10 }}>GAPS</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {result.missingSkills?.length > 0 ? result.missingSkills.map(s => (
              <span key={s} style={{ ...mono, padding: "3px 10px", borderRadius: 6, fontSize: 11, background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.06)" }}>{s}</span>
            )) : <span style={{ ...body, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>None identified</span>}
          </div>
        </div>
      </div>

      <button onClick={() => { setResult(null); setJd(""); }} style={{
        ...body, padding: "10px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.5)", fontSize: 13,
        cursor: "pointer", fontWeight: 600
      }}>← Try another job description</button>
    </div>
  );
}
