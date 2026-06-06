import React, { Suspense, lazy, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CircleDot,
  Database,
  FileDown,
  Github,
  Mail,
  Network,
  ShieldCheck,
  Workflow
} from "lucide-react";
import "./styles.css";
import profileImage from "./assets/2.jpeg";
import CollapseExperience from "./ui/CollapseExperience.jsx";
import InteractiveSkillClusters from "./ui/InteractiveSkillClusters.jsx";

const ThreeBackdrop = lazy(() => import("./ui/ThreeBackdrop.jsx"));
const ProjectsSection = lazy(() => import("./ui/ProjectsSection.jsx"));

const navItems = ["About", "Skills", "Experience", "Projects", "Approach", "Contact"];

const skills = [
  {
  title: "Languages",
  note: "Repo-backed languages across Java services, React dashboards, SQL schemas, and browser projects.",
  items: ["Java", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"]
},
{
  title: "Backend",
  note: "Java 21 and Spring Boot services with secure API boundaries and persistence layers.",
  items: ["Spring Boot", "Spring Security", "Spring Cloud Gateway", "Spring Data JPA", "REST APIs", "JWT/OAuth2"]
},
{
  title: "Frontend",
  note: "React TypeScript dashboards for analytics-heavy product surfaces.",
  items: ["React", "Vite", "Tailwind CSS", "Zustand", "TanStack Query", "Recharts"]
},
{
  title: "Data & Events",
  note: "Durable state, hot projections, event streams, migrations, and realtime delivery.",
  items: ["PostgreSQL", "Redis", "Kafka", "MongoDB", "Flyway", "WebSockets"]
},
{
  title: "Platform",
  note: "Build, delivery, observability, and architecture tooling used in the platform repos.",
  items: ["Microservices", "Event-Driven", "Docker", "Maven", "Prometheus/Grafana", "GitHub Actions"]
}
];

const experience = [
  {
    period: "2024",
    title: "Nexverse Digital Studios",
    body: "Worked in a small college startup environment across product discussions, frontend implementation, testing, and feature execution. Gained exposure to startup workflows, rapid iteration, and collaborative product development."
  },

  {
    period: "2025–2026",
    title: "Foundation Building",
    body: "Focused on data structures, algorithms, Java fundamentals, object-oriented programming, databases, and full-stack development. Solved 500+ DSA problems while building a strong software engineering foundation."
  },

  {
    period: "2026",
    title: "Backend System Development",
    body: "Designed and built NutriLens and FocusLoop around authentication, REST APIs, PostgreSQL persistence, Redis caching, Kafka event flows, WebSocket updates, and scalable Spring Boot architecture."
  }
];

const principles = [
  {
  icon: ShieldCheck,
  title: "Security before scale",
  body: "Authentication, validation, token flow, and access boundaries should be established early — before systems grow in complexity."
},
{
  icon: Network,
  title: "APIs as system contracts",
  body: "APIs should stay predictable, consistent, and structured around clean communication between frontend and backend systems."
},
{
  icon: Database,
  title: "Correctness near the source",
  body: "Caching improves responsiveness, but critical decisions should remain grounded in reliable source-of-truth data."
},
{
  icon: Workflow,
  title: "Events need ownership",
  body: "Kafka events, scheduled jobs, and Redis projections work best when each service owns a clear domain boundary and rebuild path."
}
];

function App() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    let handlePointer = null;
    let disposed = false;

    import("gsap").then(({ default: gsap }) => {
      if (disposed) return;

      const quickX = gsap.quickTo(document.documentElement, "--spotlight-x", {
        duration: 0.55,
        ease: "power3.out"
      });
      const quickY = gsap.quickTo(document.documentElement, "--spotlight-y", {
        duration: 0.55,
        ease: "power3.out"
      });

      handlePointer = (event) => {
        quickX(`${event.clientX}px`);
        quickY(`${event.clientY}px`);
      };

      window.addEventListener("pointermove", handlePointer, { passive: true });
    });

    return () => {
      disposed = true;
      if (handlePointer) {
        window.removeEventListener("pointermove", handlePointer);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div className="site-shell">
      <Suspense fallback={null}>
        <ThreeBackdrop />
      </Suspense>
      <div className="surface-grid" aria-hidden="true" />
      <Header />
      <main className="pt-16">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Suspense fallback={<ProjectSkeleton />}>
          <ProjectsSection />
        </Suspense>
        <Approach />
        <Contact />
      </main>
      <CollapseExperience />
    </div>
  );
}

function Header() {
  return (
    <header data-collapse className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-base/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#hero" className="group flex items-center gap-3" aria-label="Reetik Singh home">
          <span className="grid size-9 place-items-center border border-white/15 bg-white/[0.03] font-mono text-[11px] font-semibold tracking-[0.14em] text-ink transition group-hover:border-signal/45 group-hover:text-signal">
            RS
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold text-ink">Reetik Singh</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-dim">Java developer</span>
          </span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>
        <a href="/Resume.pdf" download className="icon-button" aria-label="Download resume">
          <FileDown size={16} />
          <span className="hidden sm:inline">Resume</span>
        </a>
      </nav>
    </header>
  );
}
function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto min-h-[calc(100svh-4rem)] max-w-6xl px-4 py-12 sm:px-6 lg:py-16"
    >
      <div className="grid items-center gap-14 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div>
          <Reveal>
            <div data-preserve-identity className="mb-5 inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted shadow-keyline">
              <CircleDot size={12} className="text-signal" />
              Java Full Stack Developer
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 data-preserve-identity className="hero-name max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.96] text-ink sm:text-6xl lg:text-7xl">
  Reetik <span className="accent-stroke">Singh</span>
</h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted">
              Backend-focused full-stack developer building scalable systems
              with Java, Spring Boot, and modern frontend technologies.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div data-collapse className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#projects" className="primary-button">
                View work
                <ArrowUpRight size={17} />
              </a>

              <a
                href="https://github.com/Reetiksingh"
                target="_blank"
                rel="noreferrer"
                className="secondary-button"
              >
                <Github size={17} />
                GitHub
              </a>

              <a
                href="mailto:reetik.developer@gmail.com"
                className="secondary-button"
              >
                <Mail size={17} />
                Contact
              </a>
            </div>
          </Reveal>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <Reveal delay={0.2}>
          <div data-preserve-identity className="flex justify-center lg:justify-end">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-2 shadow-expensive">
              <img
                src={profileImage}
                alt="Reetik Singh"
                className="h-[340px] w-[340px] rounded-2xl object-cover sm:h-[400px] sm:w-[400px]"
              />
            </div>
          </div>
        </Reveal>

      </div>

      {/* BOTTOM CARDS */}
      <Reveal delay={0.32}>
        <div data-collapse className="mt-12 grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] shadow-expensive sm:grid-cols-3">
          {[
            ["Mode", "Java 21 + Spring Boot platforms"],
            ["Signal", "Kafka, Redis, PostgreSQL systems"],
            ["Execution", "React TypeScript with API-first thinking"]
          ].map(([label, value]) => (
            <div key={label} className="bg-base/90 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                {label}
              </p>
              <p className="mt-2 text-sm font-medium text-ink">
                {value}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="Designing reliable backend systems with a full-stack product mindset.">
      <div data-collapse className="grid gap-px border border-white/[0.08] bg-white/[0.08] lg:grid-cols-[1.35fr_0.65fr]">
        <Reveal className="bg-panel/80 p-6 sm:p-8">
          <p className="max-w-3xl text-lg leading-8 text-muted">
           I build around the parts of software that need to remain reliable long after the UI is finished:
        API design, authentication flows, validation layers, caching strategies, database structure,
        and maintainable backend architecture. My current stack is centered around Java 21, Spring Boot,
        PostgreSQL, Redis, Kafka, and scalable full stack application development.
          </p>
          <p className="mt-5 max-w-3xl leading-7 text-muted">
            While backend engineering is the primary direction, I still value strong frontend execution.
        I use React and modern web technologies to build interfaces that feel fast, intentional,
        and production-ready — without sacrificing system design, performance, or long-term maintainability.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="bg-base/70 p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">Current vector</p>
          <dl className="mt-5 space-y-5">
            <Info label="Role target" value="Java Full Stack Developer" />
            <Info label="Backend focus" value="Spring Boot, Kafka, Redis, JWT/OAuth2" />
            <Info label="Education" value="B.Tech Computer Engineering, 2027" />
            <Info label="Base" value="Pune, India" />
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Technologies I work with">
      <Reveal>
        <InteractiveSkillClusters groups={skills} />
      </Reveal>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="A focused path toward scalable backend engineering.">
      <div className="border-l border-white/10">
        {experience.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06}>
            <article data-collapse className="timeline-item">
              <div className="timeline-dot" />
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass">{item.period}</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 max-w-3xl leading-7 text-muted">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Approach() {
  return (
    <Section id="approach" eyebrow="Engineering philosophy" title="Practical backend decisions, visible in the interface.">
      <div className="grid gap-3 sm:grid-cols-2">
        {principles.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={index * 0.05}>
              <article data-collapse className="principle-card">
                <Icon size={20} className="text-signal" />
                <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <div data-collapse className="contact-band">
          <div>
            <p className="section-eyebrow">Contact</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Open to roles where scalable backend engineering and strong product execution both matter.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href="mailto:reetik.developer@gmail.com" className="primary-button">
              <Mail size={17} />
              Email me
            </a>
            <a href="https://github.com/Reetiksingh" target="_blank" rel="noreferrer" className="secondary-button">
              <Github size={17} />
              GitHub
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
      <Reveal>
        <div data-collapse className="mb-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-eyebrow">{eyebrow}</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {title}
            </h2>
          </div>
          <div className="hidden h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent lg:block" />
        </div>
      </Reveal>
      {children}
    </section>
  );
}

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

function ProjectSkeleton() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="h-72 animate-pulse border border-white/[0.08] bg-white/[0.03]" />
    </section>
  );
}

const container = document.getElementById("root");
const root = globalThis.__REETIK_PORTFOLIO_ROOT__ || createRoot(container);
globalThis.__REETIK_PORTFOLIO_ROOT__ = root;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
