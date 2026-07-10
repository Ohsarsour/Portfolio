import { useState } from "react";
import { MATCHER_PROMPT, FIT_INTRO } from "../data/resume";

export default function FitCheck() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async () => {
    if (!jd.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: MATCHER_PROMPT,
          messages: [{ role: "user", content: `Analyze this job description:\n\n${jd}` }],
        }),
      });
      const data = await res.json();
      const raw = data.content?.map((b) => b.text || "").join("") || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch {
      setError("The analysis did not come back as valid data. Try again, or trim the job description.");
    }
    setLoading(false);
  };

  if (!result) {
    return (
      <div className="fit">
        <p className="section-note">{FIT_INTRO}</p>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the full job description here"
          aria-label="Job description"
        />
        <button className="btn" onClick={analyze} disabled={loading || !jd.trim()}>
          {loading ? "Analyzing…" : "Run fit check"}
        </button>
        {error && <p className="fit-error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="fit-result">
      <div className="scoreline">
        <span className="score">
          {result.matchPercentage}
          <small> / 100</small>
        </span>
      </div>
      <p className="summary">{result.summary}</p>

      {result.strongPoints?.length > 0 && (
        <ul className="strong-points">
          {result.strongPoints.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}

      <div className="fit-cols">
        <div className="fit-col matched">
          <h4>Matched</h4>
          <ul>
            {result.matchedSkills?.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="fit-col gaps">
          <h4>Gaps</h4>
          <ul>
            {result.missingSkills?.length > 0 ? (
              result.missingSkills.map((s) => <li key={s}>{s}</li>)
            ) : (
              <li>None identified</li>
            )}
          </ul>
        </div>
      </div>

      <button
        className="btn secondary"
        onClick={() => {
          setResult(null);
          setJd("");
        }}
      >
        Run another
      </button>
    </div>
  );
}
