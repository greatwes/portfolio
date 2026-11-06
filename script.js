// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");
navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- Dynamic theme toggle ----------
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: light)");

function storedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (e) {
    return null;
  }
}
function resolveTheme() {
  return storedTheme() || (colorSchemeQuery.matches ? "light" : "dark");
}
function applyTheme(theme) {
  root.setAttribute("data-resolved-theme", theme);
  themeToggle.setAttribute("aria-pressed", String(theme === "light"));
}
applyTheme(resolveTheme());

themeToggle.addEventListener("click", () => {
  const next = resolveTheme() === "light" ? "dark" : "light";
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  applyTheme(next);
});

colorSchemeQuery.addEventListener("change", () => {
  if (!storedTheme()) applyTheme(resolveTheme());
});

// ---------- Scroll progress bar ----------
const progressBar = document.getElementById("scrollProgress");
let progressTicking = false;
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + "%";
  progressTicking = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!progressTicking) {
      requestAnimationFrame(updateProgress);
      progressTicking = true;
    }
  },
  { passive: true }
);
updateProgress();

// ---------- Scroll-triggered parallax on the hero photo ----------
const heroPhotoWrap = document.querySelector(".hero-photo-wrap");
const heroSection = document.querySelector(".hero");

if (heroPhotoWrap && heroSection && !prefersReducedMotion) {
  let parallaxTicking = false;
  function updateParallax() {
    const rect = heroSection.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
    const offset = -(progress * 30);
    heroPhotoWrap.style.setProperty("--parallax-shift", `${offset}px`);
    parallaxTicking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
      }
    },
    { passive: true }
  );
  updateParallax();
}

// ---------- Tactile cursor-spotlight on cards ----------
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelectorAll(".project, .feature-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--spot-x", `${x}%`);
      card.style.setProperty("--spot-y", `${y}%`);
    });
  });
}

// ---------- Staggered on-appear reveal ----------
const revealSelector =
  ".section-title, .section-sub, .group-label, .project, .feature-card, .strength, .about-copy p, .stat";
const revealTargets = Array.from(document.querySelectorAll(revealSelector));

revealTargets.forEach((el) => {
  const siblings = Array.from(el.parentElement.children).filter((c) =>
    c.matches(revealSelector)
  );
  const idx = siblings.indexOf(el);
  el.style.transitionDelay = `${Math.min(idx, 5) * 80}ms`;
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("reveal"));
}
