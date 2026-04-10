/* ═══════════════════════════════════════════
   REETIK SINGH — PORTFOLIO  |  script.js
═══════════════════════════════════════════ */

// ─── Custom cursor ───────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// smooth follower via rAF
(function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
})();

// Enlarge cursor on interactive elements
document.querySelectorAll('a, button, .pill, .proj-card, .contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.style.width = '50px';
        follower.style.height = '50px';
        follower.style.borderColor = 'rgba(59,130,246,.6)';
    });
    el.addEventListener('mouseleave', () => {
        follower.style.width = '32px';
        follower.style.height = '32px';
        follower.style.borderColor = 'rgba(59,130,246,.4)';
    });
});

// ─── Smooth scroll ───────────────────────
document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ─── Navbar scroll behavior ──────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── Typing animation ────────────────────
const phrases = [
    'Hello 👋',
    'Welcome to my portfolio',
    'I build backend systems',
    'Let\'s create something great',
];
let pIndex = 0, cIndex = 0, deleting = false;
const el = document.getElementById('typing-text');

function type() {
    const current = phrases[pIndex];

    if (!deleting) {
        el.textContent = current.slice(0, cIndex + 1);
        cIndex++;
        if (cIndex === current.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
        setTimeout(type, 90);
    } else {
        el.textContent = current.slice(0, cIndex - 1);
        cIndex--;
        if (cIndex === 0) {
            deleting = false;
            pIndex = (pIndex + 1) % phrases.length;
            setTimeout(type, 400);
            return;
        }
        setTimeout(type, 45);
    }
}
type();

// ─── Scroll-reveal ───────────────────────
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');

        // stagger children
        const children = entry.target.querySelectorAll('.reveal-child');
        children.forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), 100 + i * 90);
        });

        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Pill hover sound-like ripple ────────
document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', e => {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
      position:absolute;width:6px;height:6px;background:rgba(59,130,246,.5);
      border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);
      animation:rippleOut .4s ease forwards;pointer-events:none;
    `;
        pill.style.position = 'relative';
        pill.style.overflow = 'hidden';
        pill.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    });
});

// inject ripple keyframe
const style = document.createElement('style');
style.textContent = `@keyframes rippleOut{ to{ transform:translate(-50%,-50%) scale(8); opacity:0; } }`;
document.head.appendChild(style);

// ─── Active nav link on scroll ───────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (link) link.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// Add active style dynamically
const activeStyle = document.createElement('style');
activeStyle.textContent = `.nav-link.active{ color:var(--text); } .nav-link.active::after{ width:100%; }`;
document.head.appendChild(activeStyle);
