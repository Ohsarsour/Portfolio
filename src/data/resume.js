// All site content lives here. Edit this file, not the components.

export const MATCHER_PROMPT = `You are analyzing a job description against Obaidullah Sarsour's profile. Return ONLY valid JSON, no markdown, no backticks, no preamble.

Obaid's skills and experience:
- 3+ years Full-Stack Software Engineer at Spectrum: React frontend, C#/.NET + Python backends, 12+ enterprise system integrations, 67 automation workflows
- Languages: Python, C#/.NET Core (ASP.NET), TypeScript/JavaScript, Go, Bash, React
- AI/ML: RAG pipelines (self-hosted: Python/FastAPI, pgvector with HNSW, local MiniLM embeddings, Ollama/Llama 3), prompt engineering, LLM integration, AI-assisted development (Claude Code, Cursor, GitHub Copilot, MCP)
- Backend: REST APIs, microservices, FastAPI, workflow orchestration, OAuth2/JWT/OIDC, RBAC
- Data: PostgreSQL (HA, Patroni, replication, tuning), MongoDB, pgvector, SQL
- Cloud: AWS (EC2, EKS, RDS, S3, IAM, CloudWatch), Docker, Kubernetes, Terraform, GitLab CI, CI/CD
- Education: MS CS Georgia Tech (in progress, AI/ML focus), BS CS UNC Charlotte (Cum Laude, 3.69)
- Achievements: 200+ audits/month system (85% error reduction), 80% faster deployments, 99.9%+ uptime, self-hosted RAG system

Analyze the job description and return this exact JSON structure:
{"matchPercentage": <number 0-100>, "matchedSkills": ["skill1", "skill2"], "missingSkills": ["skill1"], "strongPoints": ["point1", "point2"], "summary": "2-3 sentence assessment"}

Be honest about gaps. matchPercentage should reflect real alignment. Do not inflate.`;

export const META = {
  name: "Obaidullah Sarsour",
  role: "Software Engineer, Spectrum",
  location: "Charlotte, NC",
  status: "Open to SWE and AI engineering roles",
  education: "MS CS, Georgia Tech (Dec 2026)",
};

export const NAV_LINKS = [
  { label: "Work", id: "work" },
  { label: "Decisions", id: "decisions" },
  { label: "Postmortem", id: "postmortem" },
  { label: "Fit check", id: "fit" },
  { label: "Site notes", id: "notes" },
  { label: "Contact", id: "contact" },
];

export const INTRO = [
  `I'm a full-stack engineer at Spectrum in Charlotte. I own an internal operations platform end to end: a React frontend, C#/.NET and Python services, and integrations with more than 12 enterprise systems across 67 automation workflows. I design the APIs, model the data, build the UI, and run it in production.`,
  `Outside of work I built a self-hosted RAG system from scratch, and I'm finishing an MS in Computer Science at Georgia Tech with a focus on AI/ML. Most of what I know about LLM systems came from debugging that RAG pipeline, not from a tutorial. The postmortem below is the honest version of that story.`,
];

export const WORK = [
  {
    title: "Self-hosted RAG system",
    stack: "Python · FastAPI · pgvector (HNSW) · sentence-transformers MiniLM · Ollama / Llama 3 · Docker Compose",
    problem:
      "Operational knowledge lived in scattered documents. Finding the right runbook during an incident meant grepping wikis while the clock ran.",
    built:
      "A retrieval-augmented generation service, built from scratch rather than assembled from a framework. Documents are chunked with a tokenizer-aware chunker I wrote after a framework-style approach silently failed (see the postmortem), embedded locally with MiniLM, stored in PostgreSQL with pgvector and HNSW indexing, and served through FastAPI. Llama 3 runs locally through Ollama, with retrieved context injected into the prompt and citations enforced.",
    result:
      "Grounded answers with sources on internal operational questions, running entirely on our own hardware at zero marginal cost per query. Every architecture choice is written up as a decision record below.",
  },
  {
    title: "Enterprise operations platform",
    stack: "React · C#/.NET Core · Python · PostgreSQL · REST · AWS EKS",
    problem:
      "Cross-team operational work at Spectrum ran on manual handoffs between more than a dozen systems: Smartsheet, Jira, Webex, monitoring tools, and internal databases.",
    built:
      "The internal platform that connects them. I own it end to end: the React frontend, the .NET and Python service layer, the data model, and 67 automation workflows that move work between 12+ enterprise systems. Includes SSO with OAuth2/OIDC and role-based access control.",
    result:
      "Teams stopped copying data between systems by hand. One example workflow, the audit system below, is broken out because the numbers are concrete.",
  },
  {
    title: "Audit workflow system",
    stack: "C#/.NET · PostgreSQL · React",
    problem:
      "Compliance audits were tracked manually. Volume was around 200 per month, and manual entry meant errors that had to be caught and reworked downstream.",
    built:
      "A database-driven workflow system. I designed the architecture, the data model, and the validation logic that catches malformed entries at the point of entry instead of during review.",
    result:
      "Errors down 85%, processing time down 40%, at a sustained 200+ audits per month. Still in production.",
  },
];

export const WORK_ALSO = [
  { title: "PostgreSQL HA clusters", note: "Patroni and Spilo on Kubernetes, streaming replication, WAL-G archiving. Measured failover: 25 seconds, zero data loss." },
  { title: "Enterprise SSO", note: "OAuth2/OIDC/JWT single sign-on with federated identity and RBAC across multiple internal applications." },
  { title: "This website", note: "React on Vercel. The fit-check tool below calls the Anthropic API through a serverless proxy. Details in site notes." },
];

export const DECISIONS = [
  {
    id: "ADR-001",
    title: "pgvector inside PostgreSQL, not a dedicated vector database",
    context:
      "The RAG system needs similarity search. Dedicated vector databases (Pinecone, Weaviate, Qdrant) are built for this. We already run PostgreSQL everywhere.",
    decision:
      "pgvector extension with HNSW indexing, inside the existing PostgreSQL.",
    tradeoff:
      "Gave up managed recall tuning and a higher scale ceiling. Kept one database, one backup story, one auth model, and standard SQL. At this corpus size, operational simplicity wins.",
  },
  {
    id: "ADR-002",
    title: "Local MiniLM embeddings, not a hosted embedding API",
    context:
      "The corpus includes internal operational documents. Hosted embedding APIs charge per call and require sending document text off-network.",
    decision:
      "sentence-transformers MiniLM (384-dim) running locally.",
    tradeoff:
      "Lower embedding quality than large hosted models, and a hard 256-token input cap that later caused a real incident (see postmortem). In exchange, data never leaves the network and marginal cost per document is zero.",
  },
  {
    id: "ADR-003",
    title: "Hand-rolled tokenizer-aware chunker, not a framework text splitter",
    context:
      "After the truncation incident, chunk sizes had to be measured in the embedding model's own tokens, not characters, and failures had to be loud.",
    decision:
      "Wrote the chunker. It uses the model's own tokenizer and asserts every chunk fits before embedding.",
    tradeoff:
      "More code to own instead of a one-line framework import. The most failure-prone step in the pipeline is now fully observable, which is what it needed to be.",
  },
  {
    id: "ADR-004",
    title: "Llama 3 through Ollama, not a hosted frontier model",
    context:
      "The system had a self-hosted requirement, and the generation step is grounded by retrieval anyway.",
    decision:
      "Ollama serving Llama 3 locally.",
    tradeoff:
      "Weaker raw reasoning than frontier hosted models. Acceptable because answers are constrained to retrieved context, with citations enforced in the prompt. When grounding does the heavy lifting, the model can be smaller.",
  },
  {
    id: "ADR-005",
    title: "Keep the platform in .NET, run AI as Python services",
    context:
      "The operations platform is C#/.NET. The AI ecosystem, from sentence-transformers to Ollama clients, is Python-first.",
    decision:
      "AI capabilities live in separate FastAPI services behind HTTP. The .NET platform calls them like any other dependency.",
    tradeoff:
      "One more service boundary to deploy and monitor, in exchange for using each ecosystem where it is strongest and never fighting a port of a Python-native library.",
  },
  {
    id: "ADR-006",
    title: "Serverless proxy and a prepaid cap for this site's AI features",
    context:
      "Browser code cannot hold an API key, and a public endpoint that spends money needs a bounded worst case.",
    decision:
      "A Vercel serverless function proxies the Anthropic API. The account runs on prepaid credits with auto-reload off.",
    tradeoff:
      "Cold starts add a little latency, and if the balance runs out the feature goes dark until I top up. Worst-case spend is exactly the balance already purchased, which is the point.",
  },
];

export const POSTMORTEM = {
  id: "PM-001",
  severity: "SEV-3",
  title: "The chunker that silently threw away 60% of my corpus",
  summary:
    "Retrieval quality in my RAG system was mediocre and I could not explain why. The root cause was silent truncation at the embedding step: about 60% of chunks were embedded from partial text, and nothing in the pipeline reported it.",
  sections: [
    {
      heading: "Impact",
      body:
        "Answers routinely missed facts I knew were in the source documents. Roughly 60% of chunks exceeded the embedding model's input limit and were embedded from truncated text, so their vectors did not represent their content. Retrieval returned plausible but wrong neighbors.",
    },
    {
      heading: "Detection",
      body:
        "No error, no warning, no crash. The signal was softer: answers kept missing things. I stopped trusting the pipeline and logged the exact strings the embedding model received, then compared token counts against chunk sizes. The mismatch was immediate and large.",
    },
    {
      heading: "Root cause",
      body:
        "The chunker measured size in characters. MiniLM caps input at 256 tokens. Those are different units, and for technical text with long identifiers the ratio is unforgiving. sentence-transformers truncates over-length input silently by default. So every oversized chunk was quietly cut at 256 tokens and embedded anyway.",
    },
    {
      heading: "Fix",
      body:
        "Rewrote chunking to be tokenizer-aware, using the model's own tokenizer to measure size. Added an assertion that every chunk fits before embedding, so this class of failure is now loud. Built a small eval set of question-answer pairs so retrieval quality is a number I can watch instead of a feeling.",
    },
    {
      heading: "Lessons",
      body:
        "Instrument the boundary between your code and the model; log what the model actually receives, not what you think you sent. Silent truncation is a library default, not an edge case. And an eval set is what turns 'it seems better' into evidence.",
    },
  ],
};

export const FIT_INTRO =
  "Hiring for a role? Paste the job description. Claude compares it against my actual experience and returns a score, the overlaps, and the gaps. The prompt instructs it not to inflate: a 60% match will say 60%. How this works is documented in site notes.";

export const SITE_NOTES = [
  {
    heading: "What this site is",
    body:
      "A React single-page app on Vercel, written by hand with AI assistance and reviewed line by line. No UI framework, no component library. The fit-check tool is the only dynamic feature.",
  },
  {
    heading: "How the fit check works",
    body:
      "The browser never touches an API key. It POSTs the job description to a Vercel serverless function, which forwards it to the Anthropic API with a system prompt describing my real experience. The prompt demands strict JSON and honesty about gaps; the client parses defensively and shows an error rather than a hallucinated result if parsing fails.",
  },
  {
    heading: "Cost control",
    body:
      "The Anthropic account runs on prepaid credits with auto-reload off. If the balance is spent, the feature stops working and the rest of the site does not care. Worst-case cost is bounded by design, the same principle as ADR-006.",
  },
];

export const CONTACT_LINKS = [
  { label: "Email", href: "mailto:Obaidullahsarsour@gmail.com", display: "Obaidullahsarsour@gmail.com" },
  { label: "GitHub", href: "https://github.com/Ohsarsour", display: "github.com/Ohsarsour" },
  { label: "LinkedIn", href: "https://linkedin.com/in/obaidullah-sarsour", display: "linkedin.com/in/obaidullah-sarsour" },
  { label: "Phone", href: "tel:919-561-0545", display: "919-561-0545" },
];

export const JOURNEY = [
  { period: "Aug 2024 – present", title: "MS Computer Science", org: "Georgia Institute of Technology", note: "AI/ML focus. Expected Dec 2026." },
  { period: "May 2023 – present", title: "Software Engineer / Platform Engineer", org: "Spectrum (Charter Communications)", note: "The platform, audit system, and infrastructure described above." },
  { period: "Dec 2023", title: "BS Computer Science", org: "UNC Charlotte", note: "Cum Laude, 3.69 GPA." },
];
