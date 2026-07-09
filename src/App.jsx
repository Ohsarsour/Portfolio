import { useState, useEffect, useRef, useCallback } from "react";

const RESUME_CONTEXT = `You are an AI assistant on Obaidullah Sarsour's portfolio. Answer ONLY from this info. Be concise and professional.
- Full-Stack Software Engineer at Spectrum (Charter Communications), Charlotte NC, since May 2023
- Owns a fullstack internal operations platform: React frontend, C#/.NET and Python backends, integrating 12+ enterprise systems across 67 automation workflows
- MS Computer Science at Georgia Tech (Aug 2024 - Dec 2026): AI/ML, AI Ethics, Game AI
- BS Computer Science from UNC Charlotte, Dec 2023, Cum Laude, 3.69 GPA
- U.S. Citizen, willing to relocate, seeking Software Engineer, Full-Stack, and AI Engineering roles
- Skills: Python, C#/.NET, TypeScript, JavaScript, React, Go, FastAPI, REST APIs, AWS, Docker, Kubernetes, Terraform, GitLab CI, PostgreSQL, MongoDB, pgvector, OAuth2/JWT, RAG pipelines, Azure OpenAI, prompt engineering, LLM integration
- Achievements: audit system processing 200+ audits/month (85% error reduction, 40% faster), 80% deploy time reduction, 25s PostgreSQL failover zero data loss, 99.9%+ uptime, incident response 30min to <5min
- AI work: Built RAG-based AI system (Azure OpenAI GPT-4, pgvector embeddings, FastAPI) for incident debugging and automated runbook generation; AI-assisted development with Claude and MCP integrations
- Projects: RAG AI Platform, Enterprise SSO (OAuth2/OIDC/JWT), Audit Workflow Platform (full-stack), PostgreSQL HA, Mobile Fitness UI (Top Project Georgia Tech Fall 2024)
- Contact: Obaidullahsarsour@gmail.com | 919-561-0545 | github.com/Ohsarsour | linkedin.com/in/obaidullah-sarsour`;

// ═══════════ TERMINAL COMMANDS (easter egg section) ═══════════
const COMMANDS = {
  help: () => [
    "Available commands:",
    "",
    "  \x1b[36mwhoami\x1b[0m       Quick intro",
    "  \x1b[36mskills\x1b[0m       Technical skills",
    "  \x1b[36mprojects\x1b[0m     Featured projects",
    "  \x1b[36mcontact\x1b[0m      Get in touch",
    "  \x1b[36mchat <msg>\x1b[0m   Ask my AI assistant anything",
    "  \x1b[36msudo hire-obaid\x1b[0m   😏",
    "  \x1b[36mclear\x1b[0m        Clear terminal",
    "",
    "  psst — try the Konami code anywhere on this site: ↑↑↓↓←→←→BA",
  ],
  whoami: () => [
    "Obaidullah Sarsour — Full-Stack Software Engineer",
    "React · C#/.NET · Python · AI/LLM integration",
    "Georgia Tech MS CS. Building products that think.",
  ],
  skills: () => [
    "\x1b[36mFrontend:\x1b[0m  React, TypeScript, JavaScript",
    "\x1b[36mBackend:\x1b[0m   C#/.NET Core, Python, FastAPI, Go, REST APIs",
    "\x1b[36mAI:\x1b[0m        RAG pipelines, Azure OpenAI, pgvector, prompt engineering",
    "\x1b[36mData:\x1b[0m      PostgreSQL, MongoDB, pgvector, SQL",
    "\x1b[36mCloud:\x1b[0m     AWS, Docker, Kubernetes, Terraform, CI/CD",
  ],
  projects: () => [
    "\x1b[36m[1]\x1b[0m RAG AI Platform — Azure OpenAI + pgvector + FastAPI",
    "\x1b[36m[2]\x1b[0m Enterprise Operations Platform — React + .NET + Python",
    "\x1b[36m[3]\x1b[0m Enterprise SSO — OAuth2/OIDC/JWT + RBAC",
    "\x1b[36m[4]\x1b[0m Audit Workflow System — 200+ audits/month automated",
    "\x1b[36m[5]\x1b[0m This website — React + Claude API (yes, really)",
  ],
  contact: () => [
    "\x1b[36m✉\x1b[0m  Obaidullahsarsour@gmail.com",
    "\x1b[36m💻\x1b[0m  github.com/Ohsarsour",
    "\x1b[36m🔗\x1b[0m  linkedin.com/in/obaidullah-sarsour",
  ],
  "sudo hire-obaid": () => [
    "",
    "  \x1b[32m✓ Password accepted\x1b[0m",
    "  \x1b[32m✓ Verifying qualifications... PASSED\x1b[0m",
    "  \x1b[32m✓ Checking availability... AVAILABLE\x1b[0m",
    "  \x1b[32m✓ Evaluating culture fit... EXCELLENT\x1b[0m",
    "",
    "  🎉 HIRE SUCCESSFUL",
    "  Next step: Obaidullahsarsour@gmail.com",
    "",
  ],
};

// ─── ANSI parser ───
function AnsiText({ text }) {
  const parts = text.split(/\x1b\[(\d+)m/);
  let color = null;
  const spans = [];
  const colorMap = { "36": "#a78bfa", "32": "#34d399", "0": null };
  parts.forEach((p, i) => {
    if (i % 2 === 1) { color = colorMap[p] || null; }
    else if (p) { spans.push(<span key={i} style={{ color: color || "inherit" }}>{p}</span>); }
  });
  return <>{spans}</>;
}

// ─── Typing Rotation ───
function TypeWriter() {
  const roles = ["Full-Stack Engineer", "AI Builder", "React + .NET + Python", "LLM Integrator", "Product Engineer"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = roles[roleIdx];
    let t;
    if (!deleting && text === current) t = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && text === "") { setDeleting(false); setRoleIdx((roleIdx + 1) % roles.length); }
    else if (deleting) t = setTimeout(() => setText(text.slice(0, -1)), 35);
    else t = setTimeout(() => setText(current.slice(0, text.length + 1)), 75);
    return () => clearTimeout(t);
  }, [text, deleting, roleIdx]);
  return <span style={{ color: "#a78bfa", borderRight: "2px solid #a78bfa", paddingRight: 3, animation: "blink 1s step-end infinite" }}>{text}</span>;
}

// ─── Matrix Rain (Konami) ───
function MatrixRain({ onDone }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    c.width = window.innerWidth; c.height = window.innerHeight;
    const cols = Math.floor(c.width / 16);
    const drops = Array(cols).fill(1);
    const chars = "アカサタナハマヤラワ0123456789ABCDEFOBAID";
    let frame = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(9,9,17,0.06)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = "14px 'JetBrains Mono', monospace";
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.95 ? "#a78bfa" : "#34d399";
        ctx.fillText(ch, i * 16, y * 16);
        if (y * 16 > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      frame++;
      if (frame < 180) requestAnimationFrame(draw);
      else onDone();
    };
    draw();
  }, [onDone]);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }} />;
}

// ─── Aurora background ───
function Aurora() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", top: "-20%", left: "-10%", width: "60%", height: "60%",
        background: "radial-gradient(ellipse, rgba(167,139,250,0.09), transparent 65%)",
        animation: "drift1 24s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", bottom: "-20%", right: "-10%", width: "65%", height: "65%",
        background: "radial-gradient(ellipse, rgba(52,211,153,0.06), transparent 65%)",
        animation: "drift2 30s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", top: "35%", left: "45%", width: "45%", height: "45%",
        background: "radial-gradient(ellipse, rgba(96,165,250,0.05), transparent 65%)",
        animation: "drift1 36s ease-in-out infinite reverse"
      }} />
    </div>
  );
}

// ─── Interactive RAG Architecture Diagram ───
function RagArchitecture() {
  const [active, setActive] = useState(null);
  const nodes = [
    { id: "ui", label: "React UI", icon: "🖥️", x: 0, detail: "Standalone chat interface built in React. Streams responses, handles conversation state, and surfaces source citations from retrieved documents." },
    { id: "api", label: "FastAPI", icon: "⚡", x: 1, detail: "Python API layer orchestrating the pipeline: receives queries, coordinates embedding + retrieval + generation, returns structured responses with sources." },
    { id: "embed", label: "Embeddings", icon: "🧬", x: 2, detail: "Documents and queries converted to vector embeddings via Azure OpenAI. Chunking strategy tuned for token limits — a silent chunker bug taught me to always verify what the model actually receives." },
    { id: "vector", label: "pgvector", icon: "🗄️", x: 3, detail: "PostgreSQL with pgvector extension for similarity search. Chose it over dedicated vector DBs to keep the stack simple — one database, standard SQL, HNSW indexing for speed." },
    { id: "llm", label: "GPT-4", icon: "🧠", x: 4, detail: "Retrieved context injected into prompts for grounded generation. Prompt engineering to enforce citation of sources and reduce hallucination on operational runbooks." },
  ];
  const activeNode = nodes.find(n => n.id === active);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
        {nodes.map((n, i) => (
          <div key={n.id} style={{ display: "flex", alignItems: "center", flex: i < nodes.length - 1 ? 1 : "none" }}>
            <div onMouseEnter={() => setActive(n.id)} onClick={() => setActive(n.id)} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "18px 20px",
              borderRadius: 14, cursor: "pointer", minWidth: 100,
              background: active === n.id ? "rgba(167,139,250,0.08)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${active === n.id ? "rgba(167,139,250,0.35)" : "rgba(255,255,255,0.06)"}`,
              transform: active === n.id ? "translateY(-4px)" : "none",
              transition: "all 0.25s ease",
              boxShadow: active === n.id ? "0 8px 24px rgba(167,139,250,0.12)" : "none"
            }}>
              <span style={{ fontSize: 24 }}>{n.icon}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, fontWeight: 600, color: active === n.id ? "#a78bfa" : "rgba(255,255,255,0.55)" }}>{n.label}</span>
            </div>
            {i < nodes.length - 1 && (
              <div style={{ flex: 1, height: 1.5, minWidth: 12, margin: "0 4px", background: "linear-gradient(90deg, rgba(167,139,250,0.3), rgba(167,139,250,0.08))", position: "relative" }}>
                <div style={{ position: "absolute", right: -1, top: -3, width: 0, height: 0, borderLeft: "6px solid rgba(167,139,250,0.35)", borderTop: "3.5px solid transparent", borderBottom: "3.5px solid transparent" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 20, padding: "20px 24px", borderRadius: 14, minHeight: 92,
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
        transition: "all 0.3s"
      }}>
        {activeNode ? (
          <>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: "#a78bfa", marginBottom: 8 }}>{activeNode.icon} {activeNode.label}</div>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{activeNode.detail}</p>
          </>
        ) : (
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13.5, color: "rgba(255,255,255,0.3)", margin: 0, lineHeight: 1.7 }}>
            👆 Hover or tap each component to see how I built it. This is the actual architecture of the RAG system I developed — the same pattern powering the AI features on this site.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Floating AI Chat ───
function AiChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "assistant", content: "Hey! Ask me anything about Obaid's experience, skills, or projects." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const next = [...msgs, { role: "user", content: userMsg }];
    setMsgs(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 600,
          system: RESUME_CONTEXT,
          messages: next.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Sorry, couldn't process that.";
      setMsgs(p => [...p, { role: "assistant", content: reply }]);
    } catch { setMsgs(p => [...p, { role: "assistant", content: "Connection error — try again." }]); }
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} aria-label="Chat" style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 1000, width: 56, height: 56,
        borderRadius: "50%", border: "none", cursor: "pointer",
        background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
        boxShadow: "0 4px 20px rgba(167,139,250,0.35)", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "transform 0.2s", transform: open ? "rotate(45deg) scale(0.9)" : "none"
      }}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.03 2 11c0 2.76 1.36 5.22 3.5 6.87V22l3.73-2.05c.88.25 1.81.38 2.77.38 5.52 0 10-4.03 10-9S17.52 2 12 2z" fill="#fff"/><circle cx="8" cy="11" r="1.2" fill="#7c5ce0"/><circle cx="12" cy="11" r="1.2" fill="#7c5ce0"/><circle cx="16" cy="11" r="1.2" fill="#7c5ce0"/></svg>
      </button>
      {open && (
        <div style={{
          position: "fixed", bottom: 92, right: 24, zIndex: 999, width: 360, maxHeight: 480,
          borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column",
          background: "rgba(13,13,24,0.95)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(167,139,250,0.15)", boxShadow: "0 12px 48px rgba(0,0,0,0.6)",
          animation: "chatPop 0.25s ease"
        }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(167,139,250,0.05)" }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#a78bfa", fontSize: 14 }}>Ask Obaid's AI</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Powered by Claude AI</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 8, maxHeight: 320 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "80%",
                padding: "9px 13px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: m.role === "user" ? "linear-gradient(135deg, #a78bfa, #60a5fa)" : "rgba(255,255,255,0.05)",
                color: "#fff", fontSize: 13, lineHeight: 1.55, fontFamily: "'Plus Jakarta Sans', sans-serif",
                border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.05)"
              }}>{m.content}</div>
            ))}
            {loading && <div style={{ alignSelf: "flex-start", padding: "9px 13px", borderRadius: "14px 14px 14px 4px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Thinking...</div>}
            <div ref={endRef} />
          </div>
          <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about skills, projects..." style={{
                flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10, padding: "9px 12px", color: "#fff", fontSize: 13, outline: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }} />
            <button onClick={send} disabled={loading} style={{
              background: "linear-gradient(135deg, #a78bfa, #60a5fa)", border: "none", borderRadius: 10,
              padding: "0 14px", cursor: "pointer", color: "#fff", fontWeight: 700, fontSize: 12
            }}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Job Description Matcher ───
const MATCHER_PROMPT = `You are analyzing a job description against Obaidullah Sarsour's profile. Return ONLY valid JSON, no markdown, no backticks, no preamble.

Obaid's skills and experience:
- 3+ years Full-Stack Software Engineer at Spectrum: React frontend, C#/.NET + Python backends, 12+ enterprise system integrations, 67 automation workflows
- Languages: Python, C#/.NET Core (ASP.NET), TypeScript/JavaScript, Go, Bash, React
- AI/ML: RAG pipelines (Azure OpenAI GPT-4, pgvector, FastAPI), embeddings, prompt engineering, LLM integration, AI-assisted development (Claude, MCP)
- Backend: REST APIs, microservices, FastAPI, workflow orchestration, OAuth2/JWT/OIDC, RBAC
- Data: PostgreSQL (HA, Patroni, replication, tuning), MongoDB, pgvector, SQL
- Cloud: AWS (EC2, EKS, RDS, S3, IAM, CloudWatch), Docker, Kubernetes, Terraform, GitLab CI, CI/CD
- Education: MS CS Georgia Tech (in progress, AI/ML focus), BS CS UNC Charlotte (Cum Laude, 3.69)
- Achievements: 200+ audits/month system (85% error reduction), 80% faster deployments, 99.9%+ uptime, RAG AI system for incident debugging

Analyze the job description and return this exact JSON structure:
{"matchPercentage": <number 0-100>, "matchedSkills": ["skill1", "skill2"], "missingSkills": ["skill1"], "strongPoints": ["point1", "point2"], "summary": "2-3 sentence assessment"}

Be honest about gaps. matchPercentage should reflect real alignment.`;

function JobMatcher() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async () => {
    if (!jd.trim() || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: MATCHER_PROMPT,
          messages: [{ role: "user", content: `Analyze this job description:\n\n${jd}` }]
        })
      });
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("") || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch (e) {
      setError("Couldn't analyze — try again or check the job description.");
    }
    setLoading(false);
  };

  const mono = { fontFamily: "'JetBrains Mono', monospace" };
  const body = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
  const pct = result?.matchPercentage || 0;
  const pctColor = pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f87171";

  return (
    <div>
      {!result ? (
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
            ...body, padding: "13px 30px", borderRadius: 12, border: "none", cursor: jd.trim() && !loading ? "pointer" : "default",
            background: jd.trim() && !loading ? "linear-gradient(135deg, #a78bfa, #60a5fa)" : "rgba(255,255,255,0.05)",
            color: "#fff", fontWeight: 700, fontSize: 14, transition: "all 0.2s",
            boxShadow: jd.trim() && !loading ? "0 4px 16px rgba(167,139,250,0.25)" : "none"
          }}>
            {loading ? "Analyzing..." : "✨ Analyze Match"}
          </button>
          {error && <p style={{ ...body, color: "#f87171", fontSize: 13, marginTop: 12 }}>{error}</p>}
        </div>
      ) : (
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
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
      )}
    </div>
  );
}

// ─── Terminal (easter egg) ───
function Terminal() {
  const [lines, setLines] = useState([
    { text: "You found the terminal 👀 — type \x1b[36mhelp\x1b[0m to explore", type: "output" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [chatLoading, setChatLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [lines]);

  const exec = useCallback(async (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    setHistory(h => [trimmed, ...h]);
    setHistIdx(-1);
    const newLines = [{ text: `\x1b[32m❯\x1b[0m ${trimmed}`, type: "input" }];
    if (trimmed === "clear") { setLines([]); return; }
    if (trimmed.startsWith("chat ")) {
      const q = trimmed.slice(5).trim();
      if (!q) { setLines(l => [...l, ...newLines, { text: "Usage: chat <your question>", type: "output" }]); return; }
      setLines(l => [...l, ...newLines, { text: "\x1b[36m⟳ Thinking...\x1b[0m", type: "output" }]);
      setChatLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-6", max_tokens: 600,
            system: RESUME_CONTEXT,
            messages: [{ role: "user", content: q }]
          })
        });
        const data = await res.json();
        const reply = data.content?.map(b => b.text || "").join("") || "No response.";
        setLines(l => [...l.slice(0, -1), ...reply.split("\n").map(t => ({ text: t, type: "output" }))]);
      } catch {
        setLines(l => [...l.slice(0, -1), { text: "Connection error. Try again.", type: "output" }]);
      }
      setChatLoading(false);
      return;
    }
    const handler = COMMANDS[trimmed];
    if (handler) setLines(l => [...l, ...newLines, ...handler().map(t => ({ text: t, type: "output" }))]);
    else setLines(l => [...l, ...newLines, { text: `command not found: ${trimmed}. Type \x1b[36mhelp\x1b[0m`, type: "output" }]);
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter") { exec(input); setInput(""); }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (history.length > 0) { const ni = Math.min(histIdx + 1, history.length - 1); setHistIdx(ni); setInput(history[ni]); } }
    else if (e.key === "ArrowDown") { e.preventDefault(); if (histIdx > 0) { setHistIdx(histIdx - 1); setInput(history[histIdx - 1]); } else { setHistIdx(-1); setInput(""); } }
  };

  return (
    <div onClick={() => inputRef.current?.focus()} style={{
      background: "rgba(10,10,19,0.9)", border: "1px solid rgba(167,139,250,0.1)", borderRadius: 16,
      fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.7,
      color: "rgba(255,255,255,0.7)", overflow: "hidden", cursor: "text",
      boxShadow: "0 8px 40px rgba(0,0,0,0.4)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ marginLeft: 12, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>obaid@portfolio:~</span>
      </div>
      <div style={{ padding: "12px 16px 8px", maxHeight: 300, overflowY: "auto" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ minHeight: 20, whiteSpace: "pre-wrap" }}><AnsiText text={l.text} /></div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 24 }}>
          <span style={{ color: "#34d399" }}>❯</span>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
            disabled={chatLoading} spellCheck={false}
            style={{ background: "transparent", border: "none", outline: "none", color: "rgba(255,255,255,0.85)", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, flex: 1, caretColor: "#a78bfa" }} />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}

// ─── Project Card ───
function ProjectCard({ title, desc, tags, icon, featured }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? "rgba(167,139,250,0.05)" : "rgba(255,255,255,0.02)",
      border: `1px solid ${h ? "rgba(167,139,250,0.25)" : featured ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.05)"}`,
      borderRadius: 16, padding: 26, transition: "all 0.3s ease",
      transform: h ? "translateY(-3px)" : "none",
      boxShadow: h ? "0 8px 32px rgba(0,0,0,0.25)" : "none",
      gridColumn: featured ? "span 2" : "auto"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 26 }}>{icon}</span>
        {featured && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, color: "#a78bfa", background: "rgba(167,139,250,0.1)", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(167,139,250,0.2)" }}>FEATURED</span>}
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

// ─── Section Label ───
function SectionLabel({ tag, title, accent }) {
  return (
    <>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: 3, color: "#a78bfa", textTransform: "uppercase", marginBottom: 10 }}>{tag}</div>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 34, fontWeight: 800, color: "#fff", marginBottom: 40 }}>
        {title} <span style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{accent}</span>
      </h2>
    </>
  );
}

// ─── Tech Stack Grid ───
function StackGrid() {
  const layers = [
    { name: "Frontend", color: "#60a5fa", items: ["React", "TypeScript", "JavaScript", "Responsive UI"] },
    { name: "Backend", color: "#a78bfa", items: ["C#/.NET Core", "Python", "FastAPI", "Go", "REST APIs", "Microservices"] },
    { name: "AI / LLM", color: "#f472b6", items: ["RAG Pipelines", "Azure OpenAI", "pgvector", "Embeddings", "Prompt Engineering", "Claude + MCP"] },
    { name: "Data", color: "#34d399", items: ["PostgreSQL", "MongoDB", "SQL", "pgvector", "Data Modeling"] },
    { name: "Cloud & Delivery", color: "#fbbf24", items: ["AWS", "Docker", "Kubernetes", "Terraform", "GitLab CI/CD"] },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {layers.map((l, i) => (
        <div key={l.name} style={{
          display: "flex", alignItems: "center", gap: 20, padding: "18px 24px",
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 14, borderLeft: `3px solid ${l.color}`,
          animation: `fadeUp 0.5s ease ${i * 0.08}s both`
        }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: l.color, minWidth: 130 }}>{l.name}</div>
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

// ═══════════ MAIN ═══════════
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [matrix, setMatrix] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    const seq = [38,38,40,40,37,39,37,39,66,65];
    let pos = 0;
    const handler = (e) => {
      if (e.keyCode === seq[pos]) { pos++; if (pos === seq.length) { setMatrix(true); pos = 0; } }
      else pos = 0;
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navLinks = ["About", "Projects", "Match", "Stack", "Journey", "Contact"];
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: "#090911", minHeight: "100vh", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes chatPop { from { opacity:0; transform:translateY(12px) scale(0.96) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes blink { 50% { border-color: transparent } }
        @keyframes drift1 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(60px, 40px) } }
        @keyframes drift2 { 0%,100% { transform: translate(0,0) } 50% { transform: translate(-50px, -30px) } }
        * { box-sizing:border-box; margin:0; padding:0 }
        html { scroll-behavior:smooth }
        ::-webkit-scrollbar { width:5px }
        ::-webkit-scrollbar-track { background:transparent }
        ::-webkit-scrollbar-thumb { background:rgba(167,139,250,0.15); border-radius:3px }
      `}</style>

      <Aurora />
      <AiChat />
      {matrix && <MatrixRain onDone={() => setMatrix(false)} />}

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 28px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(9,9,17,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(167,139,250,0.06)" : "none",
        transition: "all 0.3s"
      }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          obaidsarsour<span style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.dev</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {navLinks.map(l => (
            <span key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)",
              fontWeight: 600, transition: "color 0.2s", cursor: "pointer"
            }} onMouseEnter={e => e.target.style.color = "#a78bfa"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>{l}</span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center", padding: "100px 24px 60px", position: "relative", zIndex: 1
      }}>
        <div style={{ animation: "fadeUp 0.7s ease 0.1s both", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 18 }}>
          <span style={{ color: "#34d399" }}>●</span>&nbsp; Open to new opportunities
        </div>

        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(40px, 6.5vw, 76px)", fontWeight: 800,
          lineHeight: 1.05, margin: "0 0 20px", animation: "fadeUp 0.7s ease 0.2s both",
          background: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.6))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>
          I build software<br />that <span style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>thinks</span>.
        </h1>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: "rgba(255,255,255,0.5)", animation: "fadeUp 0.7s ease 0.3s both", minHeight: 24 }}>
          Obaidullah Sarsour — <TypeWriter />
        </div>

        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.4)",
          maxWidth: 540, lineHeight: 1.75, marginTop: 24, animation: "fadeUp 0.7s ease 0.4s both"
        }}>
          Full-stack engineer shipping React frontends, C#/.NET and Python backends, and the AI that makes them smarter. This site has a live AI assistant I built — go ahead, ask it about me.
        </p>

        <div style={{ display: "flex", gap: 14, marginTop: 40, animation: "fadeUp 0.7s ease 0.5s both" }}>
          <button onClick={() => scrollTo("match")} style={{
            padding: "13px 30px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
            background: "linear-gradient(135deg, #a78bfa, #60a5fa)", color: "#fff",
            fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: "0 4px 20px rgba(167,139,250,0.25)"
          }}>✨ Try the AI Job Matcher</button>
          <a href="https://github.com/Ohsarsour" target="_blank" rel="noopener noreferrer" style={{
            padding: "13px 30px", borderRadius: 12, textDecoration: "none", fontWeight: 600, fontSize: 14,
            background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}>GitHub →</a>
        </div>

        <div style={{
          display: "flex", gap: 44, marginTop: 68, padding: "26px 44px", borderRadius: 16,
          background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)",
          animation: "fadeUp 0.7s ease 0.65s both", flexWrap: "wrap", justifyContent: "center"
        }}>
          {[["3+", "YEARS SHIPPING"], ["12+", "SYSTEMS INTEGRATED"], ["67", "WORKFLOWS AUTOMATED"], ["200+", "AUDITS/MO PROCESSED"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{v}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 4, letterSpacing: 1.5 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <SectionLabel tag="01 — about" title="Full-stack builder," accent="AI-native." />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
              At Spectrum, I own a full-stack internal operations platform end to end — a React frontend, C#/.NET and Python backends, and integrations with 12+ enterprise systems across 67 automation workflows. I design the APIs, model the data, build the UI, and ship it all to production on AWS.
            </p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
              I'm also deep in the AI side: I built a production-pattern RAG system with Azure OpenAI and pgvector, and I'm pursuing an MS in Computer Science at Georgia Tech focused on AI/ML. Every AI feature on this site — the chatbot, the job matcher — I built with the same patterns I use at work.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED: RAG ARCHITECTURE */}
      <section id="architecture" style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <SectionLabel tag="02 — deep dive" title="How I build" accent="AI systems." />
          <RagArchitecture />
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <SectionLabel tag="03 — projects" title="Things I've" accent="shipped." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            <ProjectCard featured icon="🧠" title="RAG AI Platform" desc="Retrieval-augmented generation system built with Azure OpenAI GPT-4, pgvector embeddings, and FastAPI. Grounds LLM responses in real operational documents to accelerate incident debugging and auto-generate runbooks — the same architecture powering this site's AI features." tags={["Azure OpenAI", "pgvector", "FastAPI", "Python", "Embeddings"]} />
            <ProjectCard icon="🏗️" title="Enterprise Operations Platform" desc="Full-stack platform I own end-to-end: React frontend, C#/.NET + Python backends, 12+ enterprise integrations, 67 automation workflows." tags={["React", "C#/.NET", "Python", "REST APIs"]} />
            <ProjectCard icon="📊" title="Audit Workflow System" desc="Database-driven full-stack system processing 200+ audits monthly. Designed architecture, data model, and validation logic. 85% fewer errors, 40% faster." tags={["C#/.NET", "PostgreSQL", "React"]} />
            <ProjectCard icon="🔐" title="Enterprise SSO" desc="OAuth2/OIDC/JWT single sign-on with federated identity and role-based access control across multiple internal applications." tags={["OAuth2", "OIDC", "JWT"]} />
            <ProjectCard icon="🐘" title="PostgreSQL HA" desc="Production high-availability database clusters with streaming replication, automated 25-second failover, and zero data loss." tags={["PostgreSQL", "Patroni", "Kubernetes"]} />
            <ProjectCard icon="🌐" title="This Website" desc="React SPA with live Claude API integration — AI chatbot, job description matcher, interactive terminal. Deployed on Vercel with serverless functions." tags={["React", "Claude API", "Vercel"]} />
          </div>
        </div>
      </section>

      {/* JOB MATCH */}
      <section id="match" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <SectionLabel tag="04 — ai-powered" title="Job Description" accent="Matcher." />
          <JobMatcher />
        </div>
      </section>

      {/* STACK */}
      <section id="stack" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <SectionLabel tag="05 — stack" title="Tools I" accent="think in." />
          <StackGrid />
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <SectionLabel tag="06 — journey" title="Experience &" accent="education." />
          <div style={{ display: "flex", flexDirection: "column", gap: 32, borderLeft: "2px solid rgba(167,139,250,0.12)", paddingLeft: 24 }}>
            {[
              { y: "AUG 2024 – PRESENT", t: "M.S. Computer Science", o: "Georgia Institute of Technology", d: "AI/ML, AI Ethics & Society, Game AI. Expected Dec 2026." },
              { y: "MAY 2023 – PRESENT", t: "Software Engineer / Platform Engineer", o: "Spectrum (Charter Communications)", d: "Full-stack internal operations platform: React + C#/.NET + Python, 12+ enterprise integrations, RAG AI system, and production infrastructure on AWS." },
              { y: "DEC 2023", t: "B.S. Computer Science", o: "UNC Charlotte", d: "Cum Laude, 3.69 GPA." },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ minWidth: 12, height: 12, borderRadius: "50%", marginTop: 5, background: "linear-gradient(135deg, #a78bfa, #60a5fa)", border: "3px solid #090911", boxShadow: "0 0 10px rgba(167,139,250,0.25)" }} />
                <div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#a78bfa", fontWeight: 600, letterSpacing: 1 }}>{e.y}</span>
                  <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", margin: "4px 0 2px" }}>{e.t}</h4>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>{e.o}</div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{e.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TERMINAL EASTER EGG */}
      <section id="terminal" style={{ padding: "80px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <SectionLabel tag="07 — for the curious" title="A little" accent="playground." />
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: -28, marginBottom: 24 }}>
            Because every engineer's site needs at least one easter egg. Type <span style={{ color: "#a78bfa", fontFamily: "'JetBrains Mono', monospace" }}>help</span> — or ask the AI directly with <span style={{ color: "#a78bfa", fontFamily: "'JetBrains Mono', monospace" }}>chat &lt;question&gt;</span>.
          </p>
          <Terminal />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 24px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel tag="08 — connect" title="Let's build" accent="together." />
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: -28, marginBottom: 32, lineHeight: 1.7 }}>
            Seeking software engineering, full-stack, and AI engineering roles. Open to relocation.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {[
              { l: "Email", h: "mailto:Obaidullahsarsour@gmail.com", i: "✉️" },
              { l: "GitHub", h: "https://github.com/Ohsarsour", i: "💻" },
              { l: "LinkedIn", h: "https://linkedin.com/in/obaidullah-sarsour", i: "🔗" },
              { l: "919-561-0545", h: "tel:919-561-0545", i: "📱" },
            ].map(c => (
              <a key={c.l} href={c.h} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: 7, padding: "11px 22px",
                borderRadius: 12, textDecoration: "none", fontWeight: 600, fontSize: 13,
                background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}>{c.i} {c.l}</a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "24px", borderTop: "1px solid rgba(255,255,255,0.03)",
        textAlign: "center", position: "relative", zIndex: 1
      }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.15)" }}>
          © 2026 Obaidullah Sarsour · Built with React · Powered by Claude AI
        </span>
      </footer>
    </div>
  );
}