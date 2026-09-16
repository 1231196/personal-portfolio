export const profile = {
  name: 'Rodrigo Faria',
  user: 'rodrigo',
  host: 'archfolio',
  os: 'RodrigoOS (Arch-based)',
  role: 'AI / Software Engineer',
  location: 'Terceira, Azores',
  stack: 'Python · C# · .NET · TypeScript',
  focus: 'LLMs · RAG · Agents',
  status: 'available for work',
  whoami:
    "Rodrigo Faria — AI / Software Engineer. I build backend systems and AI-powered applications with Python, C#, .NET and REST APIs, with hands-on experience in LLMs, Retrieval-Augmented Generation, vector search, semantic retrieval and tool-calling agents. Computer Engineering graduate (B.Sc., ISEP — Porto) who cares about clean architecture, API-first design and shipping production-ready systems, not just prototypes. Right now that means Aegis (an agentic AI platform built to act as an autonomous Support Engineer) and Rarvis (an AI-powered learning platform) on the side, alongside freelance web, mobile and security work.",
}

export const bootLines = [
  { label: 'Loaded about.md' },
  { label: 'Started aegis.service', detail: 'Agentic AI platform' },
  { label: 'Started rarvis.service', detail: 'AI learning platform' },
  { label: 'Started personal-portfolio.service', detail: 'this site' },
]

export const aboutFacts = [
  ['education', 'B.Sc. Computer Engineering — ISEP, Porto (2023 – 2026)'],
  ['certs', 'Cisco — Introduction to Cybersecurity (2025)'],
  ['languages', 'Portuguese (Native) · English (Advanced)'],
]

export const projects = [
  {
    title: 'Aegis',
    description: 'Agentic AI platform built to act as an autonomous Support Engineer — RAG-based retrieval, experimentation across LLMs and prompts, and tool-calling agents that take real actions in connected apps via MCP.',
    tags: ['Python', 'FastAPI', 'RAG', 'MCP', 'Qdrant', 'Redis'],
    github: 'https://github.com/1231196/AegisAI',
  },
  {
    title: 'Rarvis',
    description: 'AI-powered learning platform — a mix of NotebookLM, TryHackMe and Duolingo — that turns any subject into summaries, quizzes and interactive learning games.',
    tags: ['TypeScript', 'AI', 'Learning'],
    github: 'https://github.com/1231196/Rarvis',
  },
  {
    title: 'Personal Portfolio',
    description: 'This website — a fake terminal built with React and Vite, boots like a shell and answers real commands about me.',
    tags: ['React', 'Vite', 'GSAP'],
    github: 'https://github.com/1231196/personal-portfolio',
  },
  {
    title: 'AI Legal Assistant',
    description: 'End-to-end RAG application answering domain-specific questions over internal documentation, with ingestion, chunking, embedding and semantic retrieval pipelines.',
    tags: ['Python', 'FastAPI', 'RAG', 'Qdrant', 'Redis', 'Docker'],
    private: true,
  },
  {
    title: 'Maritime Port Management System',
    description: 'Full-stack management system for a maritime shipping port — backend business logic and REST APIs in C#/.NET, plus a frontend for managing port operations.',
    tags: ['C#', '.NET', 'REST APIs'],
    github: 'https://github.com/Departamento-de-Engenharia-Informatica/LEI-SEM5-PI-2025-26-3DE-02',
  },
  {
    title: 'Alani E-Commerce Platform',
    description: 'Full-stack e-commerce platform with customizable products, shopping cart, order processing and Stripe payment integration.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe'],
    private: true,
  },
]

export const experience = [
  {
    year: 'Feb 2026 — Jun 2026',
    role: 'AI Engineer Intern',
    company: "It's Possible Tech",
    details: 'Built AI-powered backend services (Python, FastAPI) integrating LLMs, RAG, vector search and external APIs. Designed end-to-end document pipelines — parsing, chunking, embeddings, indexing and semantic retrieval. Integrated Qdrant, Redis and MongoDB, and built automation workflows connecting LLMs to real business operations.',
  },
  {
    year: 'Jul 2025 — Feb 2026',
    role: 'Full Stack Developer',
    company: 'Pentabay Softwares',
    details: 'Built full-stack applications for enterprise clients with React, Node.js, Express and MongoDB. Designed REST APIs for a Flight Ticket Management platform using a microservices architecture, and used PM2 for process management and log monitoring in production.',
  },
]

export const skillGroups = [
  {
    title: 'AI & LLMs',
    skills: [
      ['LLMs & RAG', 82],
      ['AI Agents & MCP', 76],
      ['Vector Search / Embeddings', 78],
      ['Prompt & Context Engineering', 74],
      ['Tool / Function Calling', 77],
      ['AI Automation', 75],
    ],
  },
  {
    title: 'Backend & Languages',
    skills: [
      ['C# / .NET / ASP.NET Core', 85],
      ['Python / FastAPI', 80],
      ['TypeScript / JavaScript', 78],
      ['Node.js / Express', 74],
      ['Java / SQL', 68],
      ['REST APIs / Microservices', 82],
    ],
  },
  {
    title: 'Databases & Cloud',
    skills: [
      ['PostgreSQL / MongoDB', 78],
      ['Redis / Qdrant', 76],
      ['Docker / CI-CD', 72],
      ['AWS / Linux', 68],
      ['PM2', 70],
    ],
  },
  {
    title: 'Engineering Practices',
    skills: [
      ['OOP / SOLID Principles', 82],
      ['Design Patterns', 76],
      ['Clean Architecture', 80],
      ['API & Software Design', 78],
      ['Testing & Code Review', 74],
      ['Git / Agile Development', 85],
    ],
  },
  {
    title: 'Frontend',
    skills: [
      ['React / TypeScript', 76],
      ['HTML / CSS', 74],
    ],
  },
]

export const contact = {
  email: 'rodrigopaimfaria@gmail.com',
  phone: '+351 913 598 018',
  phoneHref: '+351913598018',
  location: 'Terceira, Azores',
  linkedin: 'https://www.linkedin.com/in/rodrigo-faria05/',
  github: 'https://github.com/1231196',
}
