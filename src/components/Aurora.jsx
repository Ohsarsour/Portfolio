export default function Aurora() {
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
