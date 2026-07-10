import "./styles.css";
import {
  META,
  NAV_LINKS,
  INTRO,
  WORK,
  WORK_ALSO,
  DECISIONS,
  JOURNEY,
  CONTACT_LINKS,
} from "./data/resume";
import PenMark from "./components/PenMark";
import WorkEntry from "./components/WorkEntry";
import DecisionRecord from "./components/DecisionRecord";
import Postmortem from "./components/Postmortem";
import FitCheck from "./components/FitCheck";
import SiteNotes from "./components/SiteNotes";

export default function Portfolio() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <header className="site-header">
        <div className="inner">
          <a className="site-name" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            obaidsarsour.dev
          </a>
          <nav className="site-nav" aria-label="Sections">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}>
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <div className="wrap">
          <section className="hero" aria-label="Introduction">
            <h1>
              I build internal platforms,
              <br />
              and the <PenMark>AI systems</PenMark> behind them.
            </h1>
            <div className="meta-line">
              <span><b>{META.name}</b></span>
              <span>{META.role}</span>
              <span>{META.location}</span>
              <span>{META.education}</span>
              <span style={{ color: "var(--pen)" }}>{META.status}</span>
            </div>
            <div className="intro">
              {INTRO.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        </div>

        <div className="wrap-wide">
          <section id="work">
            <div className="eyebrow">Selected work</div>
            <h2>Built, shipped, still running.</h2>
            <p className="section-note">
              Three systems, each described the way I would describe them in a design review:
              the problem, what I built, and what changed. Stack lines are exact.
            </p>
            {WORK.map((w) => (
              <WorkEntry key={w.title} {...w} />
            ))}
            <div className="also-list">
              {WORK_ALSO.map((a) => (
                <div className="also-item" key={a.title}>
                  <span className="t">{a.title}</span>
                  <span className="n">{a.note}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="decisions">
            <div className="eyebrow">Decision records</div>
            <h2>Why it's built this way.</h2>
            <p className="section-note">
              Every choice below gave something up. These are written as architecture decision
              records because that is how I think about them: context, decision, and the
              trade-off accepted with eyes open.
            </p>
            <div className="adr-grid">
              {DECISIONS.map((d) => (
                <DecisionRecord key={d.id} {...d} />
              ))}
            </div>
          </section>

          <section id="postmortem">
            <div className="eyebrow">Postmortem</div>
            <h2>The bug that taught me the most.</h2>
            <p className="section-note">
              Written in the format I would use for a production incident, because that is what
              it was, just on my own system.
            </p>
            <Postmortem />
          </section>

          <section id="fit">
            <div className="eyebrow">Fit check</div>
            <h2>Paste a job description.</h2>
            <FitCheck />
          </section>

          <section id="notes">
            <div className="eyebrow">Site notes</div>
            <h2>How this site works.</h2>
            <SiteNotes />
          </section>

          <section id="journey">
            <div className="eyebrow">Record</div>
            <h2>Experience and education.</h2>
            <div className="journey">
              {JOURNEY.map((j) => (
                <div className="journey-row" key={j.title}>
                  <span className="p">{j.period}</span>
                  <span>
                    <span className="t">{j.title}</span>
                    <span className="o"> · {j.org}</span>
                    <div className="n">{j.note}</div>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section id="contact">
            <div className="eyebrow">Contact</div>
            <h2>Get in touch.</h2>
            <p className="section-note">
              Seeking software engineering, full-stack, and AI engineering roles. Open to relocation.
            </p>
            <div className="contact-list">
              {CONTACT_LINKS.map((c) => (
                <div className="contact-row" key={c.label}>
                  <span className="l">{c.label}</span>
                  <a href={c.href} target="_blank" rel="noopener noreferrer">
                    {c.display}
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="wrap-wide">
          <p>
            © 2026 Obaidullah Sarsour. Set in Fraunces, Public Sans, and IBM Plex Mono. Built by
            hand in React with AI assistance, reviewed line by line. The fit check runs on the
            Anthropic API through a serverless proxy.
          </p>
        </div>
      </footer>
    </>
  );
}
