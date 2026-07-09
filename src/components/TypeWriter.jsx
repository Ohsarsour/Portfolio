import { useState, useEffect } from "react";

const ROLES = ["Full-Stack Engineer", "AI Builder", "React + .NET + Python", "LLM Integrator", "Product Engineer"];

export default function TypeWriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let t;
    if (!deleting && text === current) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text === "") {
      setDeleting(false);
      setRoleIdx((roleIdx + 1) % ROLES.length);
    } else if (deleting) {
      t = setTimeout(() => setText(text.slice(0, -1)), 35);
    } else {
      t = setTimeout(() => setText(current.slice(0, text.length + 1)), 75);
    }
    return () => clearTimeout(t);
  }, [text, deleting, roleIdx]);

  return (
    <span style={{ color: "#a78bfa", borderRight: "2px solid #a78bfa", paddingRight: 3, animation: "blink 1s step-end infinite" }}>
      {text}
    </span>
  );
}
