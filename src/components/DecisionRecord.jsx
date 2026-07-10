export default function DecisionRecord({ id, title, context, decision, tradeoff }) {
  return (
    <article className="adr">
      <div className="adr-head">
        <span className="adr-id">{id}</span>
        <span className="adr-status">ACCEPTED</span>
      </div>
      <h3>{title}</h3>
      <div className="field">
        <b>Context</b>
        <p>{context}</p>
      </div>
      <div className="field">
        <b>Decision</b>
        <p>{decision}</p>
      </div>
      <div className="field tradeoff">
        <b>Trade-off</b>
        <p>{tradeoff}</p>
      </div>
    </article>
  );
}
