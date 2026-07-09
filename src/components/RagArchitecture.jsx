import { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";

const NODES = [
  { id: "ui", label: "React UI", icon: "🖥️", detail: "Standalone chat interface built in React. Streams responses, handles conversation state, and surfaces source citations from retrieved documents." },
  { id: "api", label: "FastAPI", icon: "⚡", detail: "Python API layer orchestrating the pipeline: receives queries, coordinates embedding + retrieval + generation, returns structured responses with sources." },
  { id: "embed", label: "MiniLM", icon: "🧬", detail: "Documents and queries converted to vector embeddings with a local MiniLM model. A silent chunker bug — character-based sizing overran MiniLM's 256-token cap and quietly truncated about 60% of chunks — taught me to always verify what the model actually receives. Fixed it by switching to tokenizer-aware chunking." },
  { id: "vector", label: "pgvector", icon: "🗄️", detail: "PostgreSQL with pgvector extension for similarity search. Chose it over dedicated vector DBs to keep the stack simple — one database, standard SQL, HNSW indexing for speed." },
  { id: "llm", label: "Llama 3", icon: "🧠", detail: "Llama 3 served locally through Ollama. Retrieved context is injected into prompts for grounded generation, with prompt engineering to enforce source citation and reduce hallucination." },
];

export default function RagArchitecture() {
  const [active, setActive] = useState(null);
  const isMobile = useIsMobile();
  const activeNode = NODES.find(n => n.id === active);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: isMobile ? "nowrap" : "wrap" }}>
        {NODES.map((n, i) => (
          <div key={n.id} style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", flex: !isMobile && i < NODES.length - 1 ? 1 : "none", width: isMobile ? "100%" : "auto" }}>
            <div onMouseEnter={() => setActive(n.id)} onClick={() => setActive(n.id)} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "18px 20px",
              borderRadius: 14, cursor: "pointer", minWidth: isMobile ? "auto" : 100, width: isMobile ? "100%" : "auto",
              background: active === n.id ? "rgba(167,139,250,0.08)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${active === n.id ? "rgba(167,139,250,0.35)" : "rgba(255,255,255,0.06)"}`,
              transform: active === n.id ? "translateY(-4px)" : "none",
              transition: "all 0.25s ease",
              boxShadow: active === n.id ? "0 8px 24px rgba(167,139,250,0.12)" : "none"
            }}>
              <span style={{ fontSize: 24 }}>{n.icon}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, fontWeight: 600, color: active === n.id ? "#a78bfa" : "rgba(255,255,255,0.55)" }}>{n.label}</span>
            </div>
            {i < NODES.length - 1 && (
              isMobile ? (
                <div style={{ width: 1.5, height: 16, margin: "4px 0", background: "linear-gradient(180deg, rgba(167,139,250,0.3), rgba(167,139,250,0.08))", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: -1, left: -3, width: 0, height: 0, borderTop: "6px solid rgba(167,139,250,0.35)", borderLeft: "3.5px solid transparent", borderRight: "3.5px solid transparent" }} />
                </div>
              ) : (
                <div style={{ flex: 1, height: 1.5, minWidth: 12, margin: "0 4px", background: "linear-gradient(90deg, rgba(167,139,250,0.3), rgba(167,139,250,0.08))", position: "relative" }}>
                  <div style={{ position: "absolute", right: -1, top: -3, width: 0, height: 0, borderLeft: "6px solid rgba(167,139,250,0.35)", borderTop: "3.5px solid transparent", borderBottom: "3.5px solid transparent" }} />
                </div>
              )
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
