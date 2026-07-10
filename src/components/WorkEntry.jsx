export default function WorkEntry({ title, stack, problem, built, result }) {
  return (
    <article className="work-entry">
      <h3>{title}</h3>
      <div className="stack">{stack}</div>
      <dl>
        <div>
          <dt>Problem</dt>
          <dd>{problem}</dd>
        </div>
        <div>
          <dt>What I built</dt>
          <dd>{built}</dd>
        </div>
        <div>
          <dt>Result</dt>
          <dd>{result}</dd>
        </div>
      </dl>
    </article>
  );
}
