const COLOR_MAP = { "36": "#a78bfa", "32": "#34d399", "0": null };

export default function AnsiText({ text }) {
  const parts = text.split(/\x1b\[(\d+)m/);
  let color = null;
  const spans = [];

  parts.forEach((p, i) => {
    if (i % 2 === 1) {
      color = COLOR_MAP[p] || null;
    } else if (p) {
      spans.push(<span key={i} style={{ color: color || "inherit" }}>{p}</span>);
    }
  });

  return <>{spans}</>;
}
