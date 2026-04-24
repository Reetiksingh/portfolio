const body = document.body;
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");
const revealItems = document.querySelectorAll(".reveal");
const revealArray = Array.from(revealItems);
const pageSections = document.querySelectorAll("main section[id]");
const year = document.getElementById("year");

requestAnimationFrame(() => {
  body.classList.add("page-ready");
});

function setNavOpen(isOpen) {
  body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setNavOpen(!isOpen);
});

document.addEventListener("click", event => {
  if (!body.classList.contains("nav-open")) {
    return;
  }

  const clickedInsideNav = navLinks.contains(event.target) || navToggle.contains(event.target);
  if (!clickedInsideNav) {
    setNavOpen(false);
  }
});

navItems.forEach(link => {
  link.addEventListener("click", () => {
    setNavOpen(false);
  });
});

window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 18);
  },
  { passive: true }
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.08,
    rootMargin: "0px 0px -10% 0px"
  }
);

revealArray.forEach((item, revealIndex) => {
  item.style.setProperty("--reveal-delay", `${(revealIndex % 4) * 70}ms`);
  revealObserver.observe(item);
});

if (window.location.hash) {
  const deepLinkedSection = document.querySelector(window.location.hash);

  if (deepLinkedSection) {
    deepLinkedSection.querySelectorAll(".reveal").forEach(item => {
      item.classList.add("is-visible");
      revealObserver.unobserve(item);
    });
  }
}

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      navItems.forEach(link => {
        const isMatch = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isMatch);
      });
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0
  }
);

pageSections.forEach(section => {
  sectionObserver.observe(section);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    setNavOpen(false);
  }
});

if (year) {
  year.textContent = new Date().getFullYear();
}
