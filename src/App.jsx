import { useState, useEffect } from "react";
import useIsMobile from "./hooks/useIsMobile";
import { NAV_LINKS, JOURNEY, PROJECTS, STATS, CONTACT_LINKS } from "./data/resume";
import Aurora from "./components/Aurora";
import AiChat from "./components/AiChat";
import MatrixRain from "./components/MatrixRain";
import TypeWriter from "./components/TypeWriter";
import SectionLabel from "./components/SectionLabel";
import RagArchitecture from "./components/RagArchitecture";
import ProjectCard from "./components/ProjectCard";
import JobMatcher from "./components/JobMatcher";
import StackGrid from "./components/StackGrid";
import Terminal from "./components/Terminal";

export default function Portfolio() {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [matrix, setMatrix] = useState(false);

  // Fix: force scroll to top on initial load/reload
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const seq = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let pos = 0;
    const handler = (e) => {
      if (e.keyCode === seq[pos]) {
        pos++;
        if (pos === seq.length) { setMatrix(true); pos = 0; }
      } else {
        pos = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? "0 16px" : "0 28px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(9,9,17,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(167,139,250,0.06)" : "none",
        transition: "all 0.3s"
      }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          obaidsarsour<span style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>.dev</span>
        </div>
        <div style={{ display: "flex", gap: isMobile ? 16 : 24, overflowX: isMobile ? "auto" : "visible", flexShrink: 1, whiteSpace: "nowrap", marginLeft: 12 }}>
          {NAV_LINKS.map(l => (
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

        <div style={{ display: "flex", gap: 14, marginTop: 40, animation: "fadeUp 0.7s ease 0.5s both", flexWrap: "wrap", justifyContent: "center" }}>
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
          display: "flex", gap: isMobile ? 24 : 44, marginTop: 68, padding: isMobile ? "22px 20px" : "26px 44px",
          borderRadius: 16, background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)",
          animation: "fadeUp 0.7s ease 0.65s both", flexWrap: "wrap", justifyContent: "center"
        }}>
          {STATS.map(([v, l]) => (
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
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 28 }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
              At Spectrum, I'm responsible for a full-stack internal operations platform. It's a React frontend backed by C#/.NET and Python services, and it ties together more than 12 enterprise systems across 67 automation workflows. My work spans the whole stack: designing the APIs, modeling the data, building the interface, and deploying to production on EKS clusters.
            </p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>
              A lot of my focus lately has been on AI. I've built a self-hosted RAG platform in Python and FastAPI, using pgvector for retrieval and a local Llama 3 model served through Ollama, and I'm working toward an MS in Computer Science at Georgia Tech with a concentration in AI/ML. The AI features on this site, like the chatbot and the job matcher, run on the Anthropic API and reflect the same patterns I work with day to day.
            </p>
          </div>
        </div>
      </section>

      {/* RAG ARCHITECTURE */}
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
            {PROJECTS.map(p => (
              <ProjectCard key={p.title} {...p} />
            ))}
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
            {JOURNEY.map((e, i) => (
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

      {/* TERMINAL */}
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
            {CONTACT_LINKS.map(c => (
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
