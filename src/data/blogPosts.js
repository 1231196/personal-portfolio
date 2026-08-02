const blogPosts = [
  {
    slug: 'freelancing',
    title: 'Freelancing on the Side: Websites, Apps, and AI Agents for Small Businesses',
    date: 'Ongoing · Part-time',
    tags: ['Freelance', 'Web', 'Mobile', 'AI Agents'],
    excerpt:
      "Alongside my studies and internships, I take on freelance work for small and medium businesses — building whatever they actually need, from a landing page to a full AI agent.",
    content: [
      {
        type: 'p',
        text: "Outside of my full-time studies and internships, I run a small part-time freelance practice. Most of my clients are small or medium businesses that need a solution, not a specific technology — so the work spans websites, mobile apps, and increasingly AI agents, depending on what the problem actually calls for.",
      },
      {
        type: 'h2',
        text: 'What I actually build',
      },
      {
        type: 'p',
        text: "There's no single stack here, because there's no single kind of client. A local business might need a fast, no-nonsense marketing website. A retailer might want a mobile app to manage orders. A team drowning in repetitive support questions might just need a well-scoped AI agent that can answer from their own documentation instead of another employee doing it manually.",
      },
      {
        type: 'ul',
        items: [
          'Websites — marketing sites, small e-commerce, internal tools, dashboards.',
          'Mobile apps — simple cross-platform apps for booking, ordering, or internal operations.',
          'AI agents — chat assistants and automations wired into a business\'s own data and workflows.',
        ],
      },
      {
        type: 'h2',
        text: 'Why I keep doing it',
      },
      {
        type: 'p',
        text: "It's the fastest feedback loop I have. In a classroom or a personal project, I decide what “done” means. With a client, the business decides — and that forces me to build things that are actually usable, explain trade-offs in plain language, and ship on a deadline that isn't self-imposed. It also means I regularly touch technologies outside whatever I'm deep-diving into for AI or security at the time, which keeps me a generalist by necessity.",
      },
      {
        type: 'p',
        text: "It's also where AI has quietly taken over the most interesting part of the work. A couple of years ago, “build me a website” was the whole brief. Now it's often “build me a website, and also something that can answer customer questions automatically” — small businesses are starting to expect AI features by default, not as an add-on.",
      },
      {
        type: 'h2',
        text: 'How this connects to everything else',
      },
      {
        type: 'p',
        text: "Freelancing is where I apply what I already know; my own projects — like Aegis AI — are where I go learn what I don't. The two feed each other: patterns I get comfortable with on client work show up faster in personal projects, and things I dig into on the side (agents, RAG, tool calling) end up making their way into client proposals once I trust them.",
      },
    ],
  },
  {
    slug: 'aegis-ai',
    title: 'Aegis AI: Teaching Myself Agents, RAG, and MCP by Building a Support Engineer',
    date: 'In progress',
    tags: ['AI Agents', 'RAG', 'MCP', 'LangChain'],
    excerpt:
      "My current side project: an AI platform that acts like a support engineer — reading internal docs, calling tools through an MCP server, and asking for approval before doing anything risky. Built mainly to force myself to actually understand MCP and LangChain, not just read about them.",
    content: [
      {
        type: 'p',
        text: "Aegis AI is the project I'm currently sinking most of my free time into. The short version: it's an AI platform that behaves like a support engineer — it answers technical questions, digs through internal documentation, calls out to real systems through tools, and (carefully) takes action when it's confident it should. The longer version is the reason I'm building it at all: I wanted to actually understand Model Context Protocol (MCP) and LangChain by building something with them, instead of just following tutorials.",
      },
      {
        type: 'h2',
        text: 'The problem I\'m modeling',
      },
      {
        type: 'p',
        text: "The scenario I designed around is a familiar one: a company has thousands of scattered documents — technical manuals, FAQs, runbooks, old support tickets, logs, API docs, internal knowledge bases, customer records — and support engineers spend a huge chunk of their time manually digging through all of it just to answer one question. Aegis AI is my attempt at building the assistant that should exist instead: something that can find the right documentation, consult the right internal system, take a safe action through a tool, and always show its work — which sources it used and why.",
      },
      {
        type: 'h2',
        text: 'Going beyond a chatbot',
      },
      {
        type: 'p',
        text: "The reason this project is worth writing about — and worth the time — is that it's deliberately not a wrapper around a chat API. Every piece is something I picked specifically because it shows up in real production AI systems and forces me to understand a different layer of the stack:",
      },
      {
        type: 'ul',
        items: [
          'Knowledge base management — uploading PDFs, DOCX, Markdown, CSVs, indexing them automatically, and updating the index incrementally, all scoped per organization (multi-tenant from day one).',
          'An advanced RAG pipeline — chunking, embeddings, hybrid search, and cross-encoder re-ranking, so answers are generated only from the best-matching context, with sources and a confidence score attached to every response.',
          'An AI agent with real tools — the model decides on its own when to check an order status, search logs, look up a user, or open a support ticket, instead of me hardcoding a decision tree.',
          'An MCP server — every one of those tools (orders.search, payments.status, logs.search, tickets.create, users.search, knowledge.search) is exposed through the Model Context Protocol, which is the whole reason this project exists: I wanted hands-on experience with MCP as the standard way to expose tools to a model.',
          'Security and permissions — defenses against prompt injection, tool injection, and jailbreaks, plus role-based access (admin, support engineer, customer) so a customer from one organization can never see another organization\'s data.',
          'Human-in-the-loop approval — destructive or sensitive actions (cancelling an order, issuing a refund, deleting a user) require explicit human confirmation before the agent is allowed to execute them.',
          'Evaluation and observability — a dashboard tracking faithfulness, context precision/recall, answer relevance, latency, token usage, and cost per request, plus full logging of every prompt, retrieved document, tool call, and model choice.',
          'Model routing and caching — routing simple questions to a cheap/fast model, complex reasoning to a stronger one, and code-related questions to whichever model is best at code, while caching embeddings, retrieved documents, and answers to avoid paying for the same call twice.',
        ],
      },
      {
        type: 'h2',
        text: 'The stack',
      },
      {
        type: 'p',
        text: "React, TypeScript, Tailwind, and Shadcn UI on the frontend; FastAPI on the backend; PostgreSQL for structured data and Redis for caching; Qdrant as the vector database; LangChain tying the AI pieces together; and OpenTelemetry, Prometheus, and Grafana for observability. The whole thing runs through Docker Compose so it stays reproducible while I iterate on it.",
      },
      {
        type: 'pre',
        text: `                 React Frontend
                        │
                FastAPI Gateway
                        │
        ┌───────────────┼───────────────┐
        │               │               │
 RAG Service      Agent Service     Auth Service
        │               │
        │        MCP Tool Server
        │               │
        │        ┌──────┼───────────┐
        │        │      │           │
        │    Stripe   Logs      Orders API
        │
   Qdrant Vector DB
        │
 PostgreSQL + Redis`,
      },
      {
        type: 'h2',
        text: 'What I\'m actually learning',
      },
      {
        type: 'p',
        text: "MCP and LangChain are the two things I set out to learn, and they're also the two hardest parts. MCP forces me to think about tools as a proper protocol — versioned, discoverable, permissioned — rather than just a list of functions I pass to an API call. LangChain forces me to think about orchestration: how an agent decides which tool to call, when to stop and ask a human, and how to keep a RAG pipeline from just handing the model garbage context and letting it hallucinate confidently on top of it.",
      },
      {
        type: 'p',
        text: "It's slow going, and it's not finished — the evaluation dashboard, model routing, and some of the security hardening are still in progress. But that's the point: it's the kind of project that only teaches you something if it's genuinely difficult to build.",
      },
    ],
  },
]

export default blogPosts

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug)
}
