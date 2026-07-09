import { useState, useRef, useEffect, useCallback } from "react";
import AnsiText from "./AnsiText";
import { RESUME_CONTEXT, TERMINAL_COMMANDS } from "../data/resume";

export default function Terminal() {
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
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 600,
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

    const handler = TERMINAL_COMMANDS[trimmed];
    if (handler) {
      setLines(l => [...l, ...newLines, ...handler().map(t => ({ text: t, type: "output" }))]);
    } else {
      setLines(l => [...l, ...newLines, { text: `command not found: ${trimmed}. Type \x1b[36mhelp\x1b[0m`, type: "output" }]);
    }
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter") { exec(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) { const ni = Math.min(histIdx + 1, history.length - 1); setHistIdx(ni); setInput(history[ni]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) { setHistIdx(histIdx - 1); setInput(history[histIdx - 1]); }
      else { setHistIdx(-1); setInput(""); }
    }
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
