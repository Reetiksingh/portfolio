import { useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Braces, CircleDot } from "lucide-react";

const skillDetails = {
  Java: "Primary backend language across the NutriLens and FocusLoop Spring Boot microservice platforms.",
  TypeScript: "Used in React dashboard frontends for typed product surfaces and API-driven analytics views.",
  JavaScript: "Used in browser projects and the Lumo Node.js backend where repository evidence supports it.",
  SQL: "Applied through PostgreSQL schemas, migration scripts, and relational persistence models.",
  HTML: "Semantic structure for portfolio, static projects, and React application entry points.",
  CSS: "Responsive styling foundation for static projects, Tailwind layers, and production UI polish.",
  "Spring Boot": "Core framework for Java 21 services across gateway, auth, analytics, nutrition, and session domains.",
  "Spring Security": "Used for JWT validation, OAuth2 readiness, protected routes, and service-level security boundaries.",
  "Spring Cloud Gateway": "Ingress layer for routing, authentication enforcement, rate limiting, and principal propagation.",
  "Spring Data JPA": "Repository and persistence layer for PostgreSQL-backed service data models.",
  "REST APIs": "Versioned API contracts across auth, users, sessions, analytics, nutrition, recommendations, and leaderboards.",
  "JWT/OAuth2": "Access-token validation, refresh-token rotation, OAuth provider readiness, and secure auth flows.",
  React: "Frontend foundation for FocusLoop and NutriLens analytics dashboards.",
  Vite: "Fast React build tooling used in the TypeScript frontend applications.",
  "Tailwind CSS": "Utility-first styling used by the React dashboards and current portfolio implementation.",
  Zustand: "Client-side state management for focus sessions and product workflow state.",
  "TanStack Query": "API orchestration and server-state management for dashboard data flows.",
  Recharts: "Charting layer for productivity and nutrition analytics visualizations.",
  PostgreSQL: "Durable source of truth for identity, profile, session, analytics, nutrition, and achievement records.",
  Redis: "Hot projections, leaderboards, rate limiting, refresh-session mirrors, cache entries, and ranking state.",
  Kafka: "Domain-event backbone for session completion, analytics recomputation, achievements, notifications, and leaderboards.",
  MongoDB: "Used in the Lumo backend for product, cart, order, and user document persistence.",
  Flyway: "Database migration support across NutriLens Spring Boot services.",
  WebSockets: "Realtime focus rooms, notifications, leaderboard updates, and dashboard delivery surfaces.",
  Microservices: "Service decomposition by business capability: auth, users, nutrition, analytics, leaderboards, achievements, and notifications.",
  "Event-Driven": "Kafka-based fan-out where write services publish domain events and downstream services own projections.",
  Docker: "Containerized local runtimes for Spring services, frontend apps, PostgreSQL, Redis, Kafka, Prometheus, and Grafana.",
  Maven: "Java build and dependency management for multi-module Spring Boot platforms.",
  "Prometheus/Grafana": "Observability stack wired through Spring Actuator and Micrometer metrics.",
  "GitHub Actions": "CI/CD workflow evidence in the NutriLens repository."
};

const ringAngles = [-92, -34, 24, 82, 140, 202];

export default function InteractiveSkillClusters({ groups }) {
  const [active, setActive] = useState(() => ({
    group: groups[0]?.title,
    skill: groups[0]?.items?.[0]
  }));

  const activeDetail = active?.skill
    ? skillDetails[active.skill] || "Applied inside production-minded workflows with clean engineering boundaries."
    : "Select a node to inspect how the skill supports backend-focused product work.";

  return (
    <div className="skill-system" data-collapse>
      <div className="skill-system__header">
        <div>
          <p className="skill-system__kicker">Interactive Engineering Clusters</p>
          <p className="skill-system__copy">
            Select a technology to explore how it fits into the engineering stack.
          </p>
        </div>
        <div className="skill-system__readout" aria-live="polite">
          <span>{active?.group || "System"}</span>
          <strong>{active?.skill || "Select a node"}</strong>
          <p>{activeDetail}</p>
        </div>
      </div>

      <div className="engineering-layout">

  <div className="backend-row">
    <Cluster
      group={groups.find(g => g.title === "Backend")}
      index={0}
      active={active}
      onSelect={(skill) =>
        setActive({ group: "Backend", skill })
      }
      featured
    />
  </div>

  <div className="middle-row">
    <Cluster
      group={groups.find(g => g.title === "Languages")}
      index={1}
      active={active}
      onSelect={(skill) =>
        setActive({ group: "Languages", skill })
      }
    />

    <Cluster
      group={groups.find(g => g.title === "Frontend")}
      index={2}
      active={active}
      onSelect={(skill) =>
        setActive({ group: "Frontend", skill })
      }
    />
  </div>

  <div className="bottom-row">
    <Cluster
      group={groups.find(g => g.title === "Data & Events")}
      index={3}
      active={active}
      onSelect={(skill) =>
        setActive({ group: "Data & Events", skill })
      }
    />

    <Cluster
      group={groups.find(g => g.title === "Platform")}
      index={4}
      active={active}
      onSelect={(skill) =>
        setActive({ group: "Platform", skill })
      }
    />
  </div>

</div>
    </div>
  );
}

function Cluster({
  group,
  index,
  active,
  onSelect,
  featured = false
}) {
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 110, damping: 18, mass: 0.55 });
  const springY = useSpring(dragY, { stiffness: 110, damping: 18, mass: 0.55 });
  const rotateY = useTransform(springX, [-160, 160], [-15, 15]);
  const rotateX = useTransform(springY, [-120, 120], [10, -10]);

  const nodes = useMemo(() => {
  if (featured) {
    const backendPositions = [
      { x: -220, y: -120 }, // Spring Boot
      { x: 220, y: -120 },  // Spring Security

      { x: -320, y: 0 },    // JWT/OAuth2
      { x: 320, y: 0 },     // Spring Cloud Gateway

      { x: -220, y: 120 },  // REST APIs
      { x: 220, y: 120 }    // Spring Data JPA
    ];

    return group.items.map((item, i) => ({
      item,
      ...backendPositions[i],
      z: 0
    }));
  }

  return group.items.map((item, itemIndex) => {
    const radius = group.items.length > 4 ? 112 : 94;

    const angle =
      ringAngles[itemIndex % ringAngles.length] +
      (index % 2 ? 14 : 0);

    const radians = (angle * Math.PI) / 180;

    return {
      item,
      x: Math.cos(radians) * radius,
      y: Math.sin(radians) * radius,
      z: itemIndex % 2 === 0 ? 18 : -10
    };
  });
}, [group.items, index, featured]);

  return (
    <motion.article
      className={`skill-cluster-shell ${ featured ? "featured-cluster" : "" }`}
      data-collapse
      style={{ rotateX, rotateY }}
      drag
      dragElastic={0.08}
      dragMomentum
      dragConstraints={{ left: -26, right: 26, top: -20, bottom: 20 }}
      onDrag={(_, info) => {
        dragX.set(info.offset.x);
        dragY.set(info.offset.y);
      }}
      onDragEnd={() => {
        dragX.set(0);
        dragY.set(0);
      }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 170, damping: 22 }}
    >
      <div className="cluster-orbit" aria-hidden="true" />
      <div className="cluster-core">
        <Braces size={18} />
        <h3>{group.title}</h3>
        <p>{group.note}</p>
      </div>

      {nodes.map(({ item, x, y, z }) => {
        const selected = active?.skill === item;

        return (
          <button
            key={item}
            type="button"
            className={`skill-node${selected ? " is-active" : ""}`}
            style={{
              transform: `translate3d(${x}px, ${y}px, ${z}px)`
            }}
            onClick={() => onSelect(item)}
            data-collapse
          >
            <CircleDot size={11} />
            <span>{item}</span>
          </button>
        );
      })}
    </motion.article>
  );
}
