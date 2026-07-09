export const RESUME_CONTEXT = `You are an AI assistant on Obaidullah Sarsour's portfolio. Answer ONLY from this info. Be concise and professional.
- Full-Stack Software Engineer at Spectrum (Charter Communications), Charlotte NC, since May 2023
- Owns a fullstack internal operations platform: React frontend, C#/.NET and Python backends, integrating 12+ enterprise systems across 67 automation workflows
- MS Computer Science at Georgia Tech (Aug 2024 - Dec 2026): AI/ML, AI Ethics, Game AI
- BS Computer Science from UNC Charlotte, Dec 2023, Cum Laude, 3.69 GPA
- U.S. Citizen, willing to relocate, seeking Software Engineer, Full-Stack, and AI Engineering roles
- Skills: Python, C#/.NET, TypeScript, JavaScript, React, Go, FastAPI, REST APIs, AWS, Docker, Kubernetes, Terraform, GitLab CI, PostgreSQL, MongoDB, pgvector, OAuth2/JWT, RAG pipelines, Ollama/Llama 3, MiniLM embeddings, prompt engineering, LLM integration
- Achievements: audit system processing 200+ audits/month (85% error reduction, 40% faster), 80% deploy time reduction, 25s PostgreSQL failover zero data loss, 99.9%+ uptime, incident response 30min to <5min
- AI work: Built a self-hosted RAG system (Python/FastAPI, pgvector with HNSW indexing, local MiniLM embeddings, Ollama serving Llama 3, Docker Compose); AI-assisted development daily with Claude Code, Cursor, GitHub Copilot, and custom MCP server integrations
- Projects: RAG AI Platform, Enterprise SSO (OAuth2/OIDC/JWT), Audit Workflow Platform (full-stack), PostgreSQL HA, Mobile Fitness UI (Top Project Georgia Tech Fall 2024)
- Contact: Obaidullahsarsour@gmail.com | 919-561-0545 | github.com/Ohsarsour | linkedin.com/in/obaidullah-sarsour`;

export const MATCHER_PROMPT = `You are analyzing a job description against Obaidullah Sarsour's profile. Return ONLY valid JSON, no markdown, no backticks, no preamble.

Obaid's skills and experience:
- 3+ years Full-Stack Software Engineer at Spectrum: React frontend, C#/.NET + Python backends, 12+ enterprise system integrations, 67 automation workflows
- Languages: Python, C#/.NET Core (ASP.NET), TypeScript/JavaScript, Go, Bash, React
- AI/ML: RAG pipelines (self-hosted: Python/FastAPI, pgvector with HNSW, local MiniLM embeddings, Ollama/Llama 3), prompt engineering, LLM integration, AI-assisted development (Claude Code, Cursor, GitHub Copilot, MCP)
- Backend: REST APIs, microservices, FastAPI, workflow orchestration, OAuth2/JWT/OIDC, RBAC
- Data: PostgreSQL (HA, Patroni, replication, tuning), MongoDB, pgvector, SQL
- Cloud: AWS (EC2, EKS, RDS, S3, IAM, CloudWatch), Docker, Kubernetes, Terraform, GitLab CI, CI/CD
- Education: MS CS Georgia Tech (in progress, AI/ML focus), BS CS UNC Charlotte (Cum Laude, 3.69)
- Achievements: 200+ audits/month system (85% error reduction), 80% faster deployments, 99.9%+ uptime, RAG AI system for incident debugging

Analyze the job description and return this exact JSON structure:
{"matchPercentage": <number 0-100>, "matchedSkills": ["skill1", "skill2"], "missingSkills": ["skill1"], "strongPoints": ["point1", "point2"], "summary": "2-3 sentence assessment"}

Be honest about gaps. matchPercentage should reflect real alignment.`;

export const TERMINAL_COMMANDS = {
  help: () => [
    "Available commands:",
    "",
    "  \x1b[36mwhoami\x1b[0m       Quick intro",
    "  \x1b[36mskills\x1b[0m       Technical skills",
    "  \x1b[36mprojects\x1b[0m     Featured projects",
    "  \x1b[36mcontact\x1b[0m      Get in touch",
    "  \x1b[36mchat <msg>\x1b[0m   Ask my AI assistant anything",
    "  \x1b[36msudo hire-obaid\x1b[0m   😏",
    "  \x1b[36mclear\x1b[0m        Clear terminal",
    "",
    "  psst — try the Konami code anywhere on this site: ↑↑↓↓←→←→BA",
  ],
  whoami: () => [
    "Obaidullah Sarsour — Full-Stack Software Engineer",
    "React · C#/.NET · Python · AI/LLM integration",
    "Georgia Tech MS CS. Building products that think.",
  ],
  skills: () => [
    "\x1b[36mFrontend:\x1b[0m  React, TypeScript, JavaScript",
    "\x1b[36mBackend:\x1b[0m   C#/.NET Core, Python, FastAPI, Go, REST APIs",
    "\x1b[36mAI:\x1b[0m        RAG pipelines, Ollama/Llama 3, pgvector, MiniLM embeddings",
    "\x1b[36mData:\x1b[0m      PostgreSQL, MongoDB, pgvector, SQL",
    "\x1b[36mCloud:\x1b[0m     AWS, Docker, Kubernetes, Terraform, CI/CD",
  ],
  projects: () => [
    "\x1b[36m[1]\x1b[0m Self-Hosted RAG Platform — FastAPI + pgvector + Ollama/Llama 3",
    "\x1b[36m[2]\x1b[0m Enterprise Operations Platform — React + .NET + Python",
    "\x1b[36m[3]\x1b[0m Enterprise SSO — OAuth2/OIDC/JWT + RBAC",
    "\x1b[36m[4]\x1b[0m Audit Workflow System — 200+ audits/month automated",
    "\x1b[36m[5]\x1b[0m This website — React + Claude API (yes, really)",
  ],
  contact: () => [
    "\x1b[36m✉\x1b[0m  Obaidullahsarsour@gmail.com",
    "\x1b[36m💻\x1b[0m  github.com/Ohsarsour",
    "\x1b[36m🔗\x1b[0m  linkedin.com/in/obaidullah-sarsour",
  ],
  "sudo hire-obaid": () => [
    "",
    "  \x1b[32m✓ Password accepted\x1b[0m",
    "  \x1b[32m✓ Verifying qualifications... PASSED\x1b[0m",
    "  \x1b[32m✓ Checking availability... AVAILABLE\x1b[0m",
    "  \x1b[32m✓ Evaluating culture fit... EXCELLENT\x1b[0m",
    "",
    "  🎉 HIRE SUCCESSFUL",
    "  Next step: Obaidullahsarsour@gmail.com",
    "",
  ],
};

export const NAV_LINKS = ["About", "Projects", "Match", "Stack", "Journey", "Contact"];

export const JOURNEY = [
  { y: "AUG 2024 – PRESENT", t: "M.S. Computer Science", o: "Georgia Institute of Technology", d: "AI/ML, AI Ethics & Society, Game AI. Expected Dec 2026." },
  { y: "MAY 2023 – PRESENT", t: "Software Engineer / Platform Engineer", o: "Spectrum (Charter Communications)", d: "Full-stack internal operations platform: React + C#/.NET + Python, 12+ enterprise integrations, RAG AI system, and production infrastructure on AWS." },
  { y: "DEC 2023", t: "B.S. Computer Science", o: "UNC Charlotte", d: "Cum Laude, 3.69 GPA." },
];

export const PROJECTS = [
  { featured: true, icon: "🧠", title: "Self-Hosted RAG Platform", desc: "Self-hosted retrieval-augmented generation service in Python and FastAPI, with pgvector on PostgreSQL (HNSW indexing), local MiniLM embeddings, and Ollama serving Llama 3 — all orchestrated in Docker Compose. Grounds LLM responses in real documents so answers stay accurate and cite their sources.", tags: ["FastAPI", "pgvector", "Ollama / Llama 3", "MiniLM", "Docker"] },
  { icon: "🏗️", title: "Enterprise Operations Platform", desc: "Full-stack platform I own end-to-end: React frontend, C#/.NET + Python backends, 12+ enterprise integrations, 67 automation workflows.", tags: ["React", "C#/.NET", "Python", "REST APIs"] },
  { icon: "📊", title: "Audit Workflow System", desc: "Database-driven full-stack system processing 200+ audits monthly. Designed architecture, data model, and validation logic. 85% fewer errors, 40% faster.", tags: ["C#/.NET", "PostgreSQL", "React"] },
  { icon: "🔐", title: "Enterprise SSO", desc: "OAuth2/OIDC/JWT single sign-on with federated identity and role-based access control across multiple internal applications.", tags: ["OAuth2", "OIDC", "JWT"] },
  { icon: "🐘", title: "PostgreSQL HA", desc: "Production high-availability database clusters with streaming replication, automated 25-second failover, and zero data loss.", tags: ["PostgreSQL", "Patroni", "Kubernetes"] },
  { icon: "🌐", title: "This Website", desc: "React SPA with live Claude API integration — AI chatbot, job description matcher, interactive terminal. Deployed on Vercel with serverless functions.", tags: ["React", "Claude API", "Vercel"] },
];

export const STACK_LAYERS = [
  { name: "Frontend", color: "#60a5fa", items: ["React", "TypeScript", "JavaScript", "Responsive UI"] },
  { name: "Backend", color: "#a78bfa", items: ["C#/.NET Core", "Python", "FastAPI", "Go", "REST APIs", "Microservices"] },
  { name: "AI / LLM", color: "#f472b6", items: ["RAG Pipelines", "Ollama / Llama 3", "pgvector", "MiniLM Embeddings", "Prompt Engineering", "Claude + MCP"] },
  { name: "Data", color: "#34d399", items: ["PostgreSQL", "MongoDB", "SQL", "pgvector", "Data Modeling"] },
  { name: "Cloud & Delivery", color: "#fbbf24", items: ["AWS", "Docker", "Kubernetes", "Terraform", "GitLab CI/CD"] },
];

export const STATS = [
  ["3+", "YEARS SHIPPING"],
  ["12+", "SYSTEMS INTEGRATED"],
  ["67", "WORKFLOWS AUTOMATED"],
  ["200+", "AUDITS/MO PROCESSED"],
];

export const CONTACT_LINKS = [
  { l: "Email", h: "mailto:Obaidullahsarsour@gmail.com", i: "✉️" },
  { l: "GitHub", h: "https://github.com/Ohsarsour", i: "💻" },
  { l: "LinkedIn", h: "https://linkedin.com/in/obaidullah-sarsour", i: "🔗" },
  { l: "919-561-0545", h: "tel:919-561-0545", i: "📱" },
];
