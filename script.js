// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(88, 166, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.card, .note, .project-card, .deep-dive-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(el);
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Prevent body scroll when mobile menu is open
function toggleBodyScroll(disable) {
    if (disable) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

hamburger.addEventListener('click', () => {
    toggleBodyScroll(hamburger.classList.contains('active'));
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleBodyScroll(false);
    });
});

// Contact links functionality
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateX(5px)';
    });

    link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateX(0)';
    });
});

// Glass blur on scroll (increase backdrop blur and saturation)
const bodyBefore = document.documentElement; // we'll control CSS variable
window.addEventListener('scroll', () => {
    const maxBlur = 20; // px
    const maxSaturate = 220; // percent
    const scroll = Math.min(window.scrollY, 1000);
    const t = scroll / 1000; // 0..1
    const blur = Math.round(t * maxBlur);
    const sat = Math.round(100 + t * (maxSaturate - 100));
    // update a CSS variable used in styles
    document.documentElement.style.setProperty('--global-blur', blur + 'px');
    document.documentElement.style.setProperty('--global-saturate', sat + '%');
});

// Subtle 3D parallax tilt for interactive elements on mousemove
const interactiveEls = document.querySelectorAll('.card, .project-card, .note, .project-flagship');
document.addEventListener('mousemove', (e) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h / 2;
    const dx = (e.clientX - cx) / cx; // -1..1
    const dy = (e.clientY - cy) / cy; // -1..1

    interactiveEls.forEach(el => {
        const depth = 12; // px movement
        const rx = (dy * depth) * 0.6; // rotateX
        const ry = (dx * depth) * -0.6; // rotateY
        el.style.transform = `translateZ(0) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
});

// Reset transforms when mouse leaves viewport
document.addEventListener('mouseleave', () => {
    interactiveEls.forEach(el => {
        el.style.transform = '';
    });
});
