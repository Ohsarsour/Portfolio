# obaid.dev — Personal Portfolio

Full-stack SWE portfolio with live AI features powered by Claude.

## Features

- **AI Chatbot** — floating assistant that answers questions about your background
- **AI Job Description Matcher** — recruiters paste a JD, get an honest match analysis
- **Interactive RAG Architecture Diagram** — hover each component of your real AI system
- **Hidden terminal easter egg** + Konami code (↑↑↓↓←→←→BA) Matrix rain
- Aurora gradient background, typing hero animation, modern dark design

## Deploy to Vercel — FREE (5 minutes)

Vercel's free Hobby tier covers hosting + serverless functions. The only cost
is Claude API usage (~$1-2/month at portfolio traffic — set a spend cap!).

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Ohsarsour/Portfolio.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to vercel.com, sign in with GitHub
2. "Add New Project" → import your repo (Vite auto-detected)
3. Add environment variable: `ANTHROPIC_API_KEY` = your key from console.anthropic.com
4. Deploy

### 3. Set a spend cap (recommended)

In console.anthropic.com → Settings → Limits, set a $5/month cap.
The AI features can never cost more than that.

## Local Development

```bash
npm install
npx vercel dev   # runs Vite + the serverless function together
```

Create a `.env` file with your `ANTHROPIC_API_KEY` first.

## Structure

```
├── api/chat.js       # Vercel serverless function (Claude API proxy)
├── src/App.jsx       # The entire portfolio
├── src/main.jsx
├── index.html
└── package.json
```

## Customization

- Resume data: edit `RESUME_CONTEXT` and `MATCHER_PROMPT` in src/App.jsx
- Colors: search `#a78bfa` (purple) and `#60a5fa` (blue) for the accent palette
- Terminal commands: add entries to the `COMMANDS` object

## Connecting obaidsarsour.dev (Cloudflare → Vercel)

After your first Vercel deploy:

1. **Vercel:** Project → Settings → Domains → add `obaidsarsour.dev` and `www.obaidsarsour.dev`
2. **Cloudflare:** dash.cloudflare.com → obaidsarsour.dev → DNS → Records, add:
   - Type `A`, Name `@`, Value `76.76.21.21` — set proxy status to **DNS only (grey cloud)**
   - Type `CNAME`, Name `www`, Value `cname.vercel-dns.com` — also **DNS only (grey cloud)**
3. Wait a few minutes. Vercel auto-issues the SSL certificate.

**IMPORTANT:** The grey cloud (DNS only) matters. If Cloudflare's orange proxy
is on, Vercel can't verify the domain and you'll get SSL errors. Vercel serves
over HTTPS anyway, so you lose nothing.

Note: `.dev` domains REQUIRE HTTPS by design — this works automatically with
Vercel's certificates, nothing extra needed.
