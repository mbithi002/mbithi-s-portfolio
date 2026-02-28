// Custom cursor
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

function animateRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

// Project expand/collapse
function toggleProject(header) {
  const card = header.parentElement;
  const body = card.querySelector(".project-body");
  const btn = card.querySelector(".project-expand-btn");
  const isOpen = body.classList.contains("open");

  document
    .querySelectorAll(".project-body.open")
    .forEach((b) => b.classList.remove("open"));
  document.querySelectorAll(".project-expand-btn.open").forEach((b) => {
    b.classList.remove("open");
    b.textContent = "+";
  });

  if (!isOpen) {
    body.classList.add("open");
    btn.classList.add("open");
    btn.textContent = "+";
  }
}

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => observer.observe(el));

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector(".form-submit");
  btn.textContent = "Sent ✓";
  btn.style.background = "#333";
  btn.style.color = "#888";
  setTimeout(() => {
    btn.textContent = "Send Message →";
    btn.style.background = "";
    btn.style.color = "";
    e.target.reset();
  }, 3000);
}

// Nav hide on scroll up, show on scroll down
let lastScroll = 0;
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  const curr = window.scrollY;
  nav.style.opacity = curr > lastScroll && curr > 100 ? "0" : "1";
  lastScroll = curr;
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");

function toggleMobileMenu() {
  mobileMenuBtn.classList.toggle("active");
  mobileNav.classList.toggle("active");
  document.body.style.overflow = mobileNav.classList.contains("active")
    ? "hidden"
    : "";
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu);

// Close mobile menu when clicking a link
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    toggleMobileMenu();
  });
});

// Close mobile menu when clicking outside (optional - click on overlay)
mobileNav.addEventListener("click", (e) => {
  if (e.target === mobileNav) {
    toggleMobileMenu();
  }
});
