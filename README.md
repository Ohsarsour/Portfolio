# obaidsarsour.dev v2

Editorial redesign. Engineering-document identity: work entries written like
design reviews, architecture decision records, a real postmortem, and a
fit-check tool for recruiters.

## Design system

- Paper #FCFCFA, ink #17191E, structural line #DADFE4
- One accent: red pen #C13B2A (links, labels, trade-offs, the underline mark)
- Fraunces (display) / Public Sans (body) / IBM Plex Mono (labels, metadata)
- 3px border radius, 1px borders, no gradients, no dark mode, no animation
  beyond smooth scroll (reduced motion respected)

## Structure

```
api/chat.js                    Anthropic API proxy (unchanged behavior)
src/data/resume.js             ALL content: work, ADRs, postmortem, prompts
src/components/PenMark.jsx     the red underline signature
src/components/WorkEntry.jsx   problem / built / result
src/components/DecisionRecord.jsx
src/components/Postmortem.jsx
src/components/FitCheck.jsx    the job matcher, restyled
src/components/SiteNotes.jsx   how the site works + proxy diagram
src/App.jsx
src/styles.css                 the whole design system
```

To update content, edit `src/data/resume.js` only.

## Deploy

Same as before: push to GitHub, Vercel auto-deploys. `ANTHROPIC_API_KEY`
env var must be set in Vercel. Domain and DNS unchanged.
