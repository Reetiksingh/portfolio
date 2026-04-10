// Smooth scroll
document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

// Navbar scroll behavior
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Typing animation
const text = "Hello 👋!";
let index = 0;
const el = document.getElementById("typing-text");

function type() {
    if (index < text.length) {
        el.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 100);
    } else {
        setTimeout(() => {
            el.innerHTML = "";
            index = 0;
            type();
        }, 2000);
    }
}

type();