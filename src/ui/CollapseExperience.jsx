import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import profileImage from "../assets/2.jpeg";

const LINKEDIN_URL = "https://www.linkedin.com/in/reetik-singh/";

export default function CollapseExperience() {
  const prefersReducedMotion = useReducedMotion();
  const [collapsed, setCollapsed] = useState(false);
  const triggeredRef = useRef(false);
  

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    let frame = 0;
      
    const updateEnvironment = () => {
      frame = 0;

      if (triggeredRef.current) return;

      const maxScroll = Math.max(root.scrollHeight - window.innerHeight, 1);
      const scrollDepth = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      const endingDepth = Math.min(Math.max((scrollDepth - 0.70) / 0.30, 0), 1);

      root.style.setProperty("--scroll-depth", scrollDepth.toFixed(3));
      root.style.setProperty("--env-dim", (endingDepth * 0.2).toFixed(3));
      root.style.setProperty("--noise-alpha", (0.03 + endingDepth * 0.055).toFixed(3));
      root.style.setProperty("--grid-shift", `${(endingDepth * 7).toFixed(2)}px`);
      root.style.setProperty("--grid-density", `${48 - endingDepth * 8}px`);
      root.style.setProperty("--instability", `${(endingDepth * 1.5).toFixed(2)}px`);

      body.classList.toggle("near-ending", endingDepth > 0.18);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateEnvironment);
    };

    updateEnvironment();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      body.classList.remove("near-ending");
      root.style.removeProperty("--scroll-depth");
      root.style.removeProperty("--env-dim");
      root.style.removeProperty("--noise-alpha");
      root.style.removeProperty("--grid-shift");
      root.style.removeProperty("--grid-density");
      root.style.removeProperty("--instability");
    };
  }, []);

  useEffect(() => {
    const body = document.body;
     const contactSection = document.getElementById("contact");
   
      if (!contactSection) return;

       const observer = new IntersectionObserver(
       ([entry]) => {
       if (
         entry.isIntersecting &&
          !triggeredRef.current
            ) {
          triggerCollapse();
             }
       },
         {
          threshold: 0.85
          }
);

observer.observe(contactSection);
  

    const triggerCollapse = async () => {
      if (triggeredRef.current) return;

      triggeredRef.current = true;
      body.classList.remove("near-ending");
      body.classList.add("collapse-running");

      if (prefersReducedMotion) {
        body.classList.add("interface-collapsed");
        setCollapsed(true);
        return;
      }

      const { default: gsap } = await import("gsap");
      const candidates = Array.from(document.querySelectorAll("[data-collapse]")).filter((element) => {
        if (element.closest("[data-preserve-identity]")) return false;
        if (element.closest(".final-scene")) return false;

        const rect = element.getBoundingClientRect();
        return rect.width > 2 && rect.height > 2;
      });

      const snapshots = candidates.map((element) => ({
        element,
        rect: element.getBoundingClientRect()
      }));

      body.classList.add("interface-collapsed");

      snapshots.forEach(({ element, rect }, index) => {
        const seed = index + 1;
        const horizontalDrift = ((seed * 29) % 180) - 90;
        const rotation = ((seed * 17) % 30) - 15;
        const distance = window.innerHeight - rect.top + 140 + ((seed * 37) % 220);
        const delay = Math.min(index * 0.012, 0.28);

        gsap.set(element, {
          position: "fixed",
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          margin: 0,
          zIndex: 35,
          pointerEvents: "none",
          transformOrigin: "50% 50%",
          willChange: "transform, opacity",
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1
        });

        gsap.to(element, {
          x: horizontalDrift,
          y: distance,
          z: 0.01,
          rotation,
          opacity: 0,
          duration: 1.45 + ((seed * 13) % 45) / 100,
          delay,
          ease: "power3.in"
        });
      });

      window.setTimeout(() => {
        body.classList.remove("collapse-running");
        setCollapsed(true);
      }, 1550);
    };

    return () => {
       observer.disconnect();
      body.classList.remove("collapse-running", "interface-collapsed");
    };
  }, [prefersReducedMotion]);

  return collapsed ? <FinalScene /> : null;
}

function FinalScene() {
  return (
    <motion.aside
      className="final-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Final portfolio message"
    >
      <div className="final-scene__particles" aria-hidden="true" />
      <div className="final-scene__grid" aria-hidden="true" />

      <motion.div
        className="final-scene__message"
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.72, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-eyebrow">End state</p>
        <h2>The interface ends here. The engineering journey doesn't.</h2>
        <p>
          Scalable systems, practical backend decisions, and product execution beyond the screen.
        </p>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="final-connect">
          Connect
          <ArrowUpRight size={16} />
        </a>
      </motion.div>

      <motion.div
        className="final-scene__identity"
        data-preserve-identity
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.72, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={profileImage} alt="Reetik Singh" />
        <div>
          <h3>Reetik Singh</h3>
          <p>Backend-focused Java Full Stack Developer</p>
        </div>
      </motion.div>
    </motion.aside>
  );
}
