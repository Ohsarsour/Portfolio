export default function SectionLabel({ tag, title, accent }) {
  return (
    <>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: 3, color: "#a78bfa", textTransform: "uppercase", marginBottom: 10 }}>
        {tag}
      </div>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 34, fontWeight: 800, color: "#fff", marginBottom: 40 }}>
        {title}{" "}
        <span style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {accent}
        </span>
      </h2>
    </>
  );
}
