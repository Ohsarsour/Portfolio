import { useRef, useEffect } from "react";

const CHARS = "アカサタナハマヤラワ0123456789ABCDEFOBAID";

export default function MatrixRain({ onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const cols = Math.floor(c.width / 16);
    const drops = Array(cols).fill(1);
    let frame = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(9,9,17,0.06)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = "14px 'JetBrains Mono', monospace";
      drops.forEach((y, i) => {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
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
