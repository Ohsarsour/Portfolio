import { SITE_NOTES } from "../data/resume";

const DIAGRAM = `browser ──POST /api/chat──▶ vercel function ──x-api-key──▶ anthropic api
   ▲                              │
   └────────── strict JSON ◀──────┘        prepaid credits · auto-reload off
              (parse guard)                worst-case spend = current balance`;

export default function SiteNotes() {
  return (
    <div>
      <div className="notes-grid">
        {SITE_NOTES.map((n) => (
          <div className="note-row" key={n.heading}>
            <h3>{n.heading}</h3>
            <p>{n.body}</p>
          </div>
        ))}
      </div>
      <div className="notes-diagram" aria-label="Architecture diagram of the fit check feature">
        {DIAGRAM}
      </div>
    </div>
  );
}
