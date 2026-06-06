import { motion } from "framer-motion";
import { Github, Layers3 } from "lucide-react";

const projects = [
  {
    label: "Distributed Nutrition Intelligence Platform",
    meta: "Dec 2025 — Present",
    title: "NutriLens",
    impact:
      "Transformed Diet Scanner into NutriLens: a Java 21/Spring Boot nutrition intelligence platform where food scanning becomes the ingestion layer for dietary analytics, scoring, recommendations, leaderboards, and notifications.",
    links: [
      ["GitHub", "https://github.com/Reetiksingh/Diet-Scanner", Github],
      ["System Design", "https://github.com/Reetiksingh/Diet-Scanner/blob/main/docs/NUTRILENS_SYSTEM_DESIGN.md", Layers3]
    ],
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Spring Cloud Gateway",
      "Spring Security",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "Flyway",
      "React",
      "TypeScript",
      "TanStack Query",
      "Docker",
      "Prometheus",
      "Grafana"
    ],
    features: [
      "Food search, barcode scan, label scan parsing, meal logging, and nutrition aggregation.",
      "Nutrition, macro balance, consistency, hydration, and diet-quality scoring.",
      "Behavior detection for skipped breakfast, late-night eating, protein gaps, calorie spikes, and inconsistent patterns.",
      "Recommendations, weekly/monthly summaries, achievements, leaderboards, and notification workflows.",
      "React TypeScript SaaS dashboard with analytics cards, charts, rankings, and product-domain views."
    ],
    engineering: [
      "Multi-module Spring Boot backend across gateway, auth, user, nutrition, analytics, recommendation, leaderboard, achievement, and notification services.",
      "Spring Cloud Gateway handles routing, JWT validation, Redis rate limiting, CORS, request IDs, and dashboard aggregation.",
      "OAuth2-ready auth issues RSA-signed JWTs with rotating hashed refresh-token families and Redis session mirrors.",
      "Kafka topics fan out meal, analytics, recommendation, achievement, leaderboard, and notification events.",
      "PostgreSQL, Spring Data JPA, Flyway, Actuator, Micrometer, Prometheus, and Grafana support durable state and observability."
    ],
    challenge:
      "The core challenge is evolving a scanner-first project into an analytics-first distributed system. The current design separates immediate food-capture APIs from Kafka-driven scoring, recommendations, achievements, rankings, and notifications while keeping insights deterministic and evidence-backed.",
    note: "The repository now presents NutriLens as the current platform direction; the original Node/MySQL/static Diet Scanner implementation is preserved under legacy/."
  },
  {
    label: "Distributed Productivity Analytics Platform",
    meta: "Feb 2026 — Present",
    title: "FocusLoop",
    impact:
      "Built FocusLoop as a Java/Spring distributed productivity platform for focus-session execution, behavioral analytics, leaderboards, WebSocket collaboration, scheduled reporting, and observable backend infrastructure.",
    links: [
      ["GitHub", "https://github.com/Reetiksingh/FocusLoop", Github],
      ["Architecture", "https://github.com/Reetiksingh/FocusLoop/blob/main/docs/architecture-decisions.md", Layers3]
    ],
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Spring Cloud Gateway",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "WebSockets",
      "JWT",
      "React",
      "TypeScript",
      "Zustand",
      "Docker",
      "Prometheus",
      "Grafana"
    ],
    features: [
      "Versioned auth, user, focus-session, analytics, leaderboard, and notification APIs.",
      "Focus-session completion flow calculates quality from idle time, interruptions, and tab switching.",
      "Productivity intelligence updates daily analytics, streaks, weekly reports, and achievement signals.",
      "Redis sorted-set leaderboards for global, country, weekly, monthly, and all-time rankings.",
      "WebSocket focus rooms and notification delivery for realtime collaboration and feedback."
    ],
    engineering: [
      "Gateway validates JWTs, rejects missing credentials, and propagates user identity headers to internal services.",
      "Auth service uses email auth, JWT issuing, hashed opaque refresh tokens, and OAuth2 provider registration.",
      "PostgreSQL owns identity, profile, focus-session, analytics, and achievement records; MongoDB is intentionally not used.",
      "Kafka decouples session completion from analytics, leaderboard, achievement, and notification projections.",
      "Docker Compose runs service replicas with PostgreSQL, Redis, Kafka, Prometheus, and Grafana for local platform testing."
    ],
    challenge:
      "The challenge is maintaining immediate session-write responsiveness while downstream services recompute analytics, rankings, achievements, and notifications independently. Kafka provides fan-out and replay, while Redis keeps hot leaderboard and analytics reads fast."
  },
  {
    label: "Backend Commerce System",
    meta: "April 2026 — Present",
    title: "Lumo Candles Backend",
    impact:
      "Built a production-style Node.js e-commerce backend that demonstrates backend maturity through auth, caching, idempotent order creation, queue-based processing, and concurrency-safe inventory handling.",
    links: [
      ["GitHub", "https://github.com/Reetiksingh/Lumo-Luxury-E-Commerce-Landing-Experience-Frontend-System-", Github],
      [
        "System Design",
        "https://github.com/Reetiksingh/Lumo-Luxury-E-Commerce-Landing-Experience-Frontend-System-/blob/main/SYSTEM_DESIGN.md",
        Layers3
      ]
    ],
    stack: ["Node.js", "Express", "MongoDB", "Redis", "BullMQ", "Docker", "JWT", "Zod", "Pino"],
    features: [
      "User registration/login, admin product management, cart flows, and order placement.",
      "Product listing, filtering, search, pagination, and durable order snapshots.",
      "Dedicated worker processes for order processing, email tasks, and event logging.",
      "Docker-based local infrastructure for API, worker, MongoDB, replica-set init, and Redis."
    ],
    engineering: [
      "Controllers, services, and repositories separated to keep HTTP and business logic clean.",
      "Redis caching for hot product reads plus short-lived distributed locks during order creation.",
      "BullMQ queues for order processing, email work, and background event logging.",
      "MongoDB transactions, conditional stock decrements, and idempotency keys to prevent overselling or duplicate orders."
    ],
    challenge:
      "The difficult part is correctness under load: product reads should stay fast, but checkout can never trust cache alone. The system solves that by combining Redis for speed with transaction-backed stock protection and idempotent order handling.",
    note: "Kept as a secondary project for system-design depth; the current portfolio positioning is led by the Java/Spring Boot platforms above."
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
      <Reveal>
        <div data-collapse className="mb-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-eyebrow">Projects</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Existing work, presented like engineering artifacts.
            </h2>
          </div>
          <div className="hidden h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent lg:block" />
        </div>
      </Reveal>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.05}>
            <article data-collapse className="project-card">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="project-label">{project.label}</span>
                    <span className="project-meta">{project.meta}</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{project.impact}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.links.map(([label, href, Icon]) => (
                      <a key={label} href={href} target="_blank" rel="noreferrer" className="project-link" data-collapse>
                        <Icon size={15} />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="stack-token" data-collapse>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Detail title="Key features" items={project.features} />
                    <Detail title="Engineering highlights" items={project.engineering} />
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">Challenge</p>
                <p className="mt-2 max-w-4xl text-sm leading-7 text-muted">{project.challenge}</p>
                {project.note ? <p className="mt-3 max-w-4xl text-xs leading-6 text-dim">{project.note}</p> : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Detail({ title, items }) {
  return (
    <div className="detail-panel" data-collapse>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">{title}</h4>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
            <span className="mt-2 size-1 shrink-0 bg-signal/80" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
