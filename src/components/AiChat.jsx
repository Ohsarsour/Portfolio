import { useState, useRef, useEffect } from "react";
import useIsMobile from "../hooks/useIsMobile";
import { RESUME_CONTEXT } from "../data/resume";

export default function AiChat() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "assistant", content: "Hey! Ask me anything about Obaid's experience, skills, or projects." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const next = [...msgs, { role: "user", content: userMsg }];
    setMsgs(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 600,
          system: RESUME_CONTEXT,
          messages: next.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Sorry, couldn't process that.";
      setMsgs(p => [...p, { role: "assistant", content: reply }]);
    } catch {
      setMsgs(p => [...p, { role: "assistant", content: "Connection error — try again." }]);
    }
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
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.03 2 11c0 2.76 1.36 5.22 3.5 6.87V22l3.73-2.05c.88.25 1.81.38 2.77.38 5.52 0 10-4.03 10-9S17.52 2 12 2z" fill="#fff"/>
          <circle cx="8" cy="11" r="1.2" fill="#7c5ce0"/><circle cx="12" cy="11" r="1.2" fill="#7c5ce0"/><circle cx="16" cy="11" r="1.2" fill="#7c5ce0"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: "fixed", bottom: 92, right: isMobile ? 16 : 24, left: isMobile ? 16 : "auto", zIndex: 999,
          width: isMobile ? "auto" : 360, maxHeight: "70vh",
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
            {loading && (
              <div style={{ alignSelf: "flex-start", padding: "9px 13px", borderRadius: "14px 14px 14px 4px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Thinking...
              </div>
            )}
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
