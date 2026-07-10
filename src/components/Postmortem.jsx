import { POSTMORTEM } from "../data/resume";

export default function Postmortem() {
  return (
    <article className="pm">
      <div className="pm-head">
        <span className="sev">{POSTMORTEM.severity}</span>
        <span>{POSTMORTEM.id}</span>
        <span>self-hosted RAG pipeline</span>
        <span>status: resolved</span>
      </div>
      <h2>{POSTMORTEM.title}</h2>
      <p className="pm-summary">{POSTMORTEM.summary}</p>
      {POSTMORTEM.sections.map((s) => (
        <div className="pm-section" key={s.heading}>
          <h4>{s.heading}</h4>
          <p>{s.body}</p>
        </div>
      ))}
    </article>
  );
}
