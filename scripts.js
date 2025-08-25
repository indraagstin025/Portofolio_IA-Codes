// =================================================================
// Bagian Utama: Pengaturan Tema & Efek Scroll Header
// =================================================================
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const html = document.documentElement;
const header = document.querySelector("header");

function updateIcons() {
  if (html.classList.contains("dark")) {
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  } else {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }
}
updateIcons();

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
  updateIcons();
});

const scrollBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.remove("hidden");
    scrollBtn.classList.add("opacity-100");
  } else {
    scrollBtn.classList.add("hidden");
    scrollBtn.classList.remove("opacity-100");
  }

  // Header sudah memiliki backdrop-blur dari HTML, jadi kita hanya perlu mengatur opacity
  const headerBg = header.querySelector(".absolute"); // Mengambil div background
  if (window.scrollY > 50) {
    headerBg.classList.remove("bg-white/30", "dark:bg-[#1e293b]/30");
    headerBg.classList.add("bg-white/80", "dark:bg-[#1e293b]/80");
  } else {
    headerBg.classList.remove("bg-white/80", "dark:bg-[#1e293b]/80");
    headerBg.classList.add("bg-white/30", "dark:bg-[#1e293b]/30");
  }
});

scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// =================================================================
// Bagian Animasi Saat Scroll
// =================================================================
const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("opacity-0", "translate-y-12", "translate-x-12");
      entry.target.classList.add("opacity-100", "translate-y-0", "translate-x-0");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

elementsToAnimate.forEach((element) => observer.observe(element));

// =================================================================
// Bagian Logika Menu Mobile & Sinkronisasi Tema
// =================================================================
const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuOpenIcon = document.getElementById("menu-open-icon");
const menuCloseIcon = document.getElementById("menu-close-icon");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const sunIconMobile = document.getElementById("sun-icon-mobile");
const moonIconMobile = document.getElementById("moon-icon-mobile");

function updateMobileIcons() {
  if (html.classList.contains("dark")) {
    sunIconMobile.classList.remove("hidden");
    moonIconMobile.classList.add("hidden");
  } else {
    sunIconMobile.classList.add("hidden");
    moonIconMobile.classList.remove("hidden");
  }
}
updateMobileIcons();

hamburgerBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("opacity-0");
  mobileMenu.classList.toggle("translate-y-0");
  mobileMenu.classList.toggle("-translate-y-4");
  mobileMenu.classList.toggle("pointer-events-none");

  menuOpenIcon.classList.toggle("hidden");
  menuCloseIcon.classList.toggle("hidden");
});

themeToggleMobile.addEventListener("click", () => {
  html.classList.toggle("dark");
  localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
  updateIcons();
  updateMobileIcons();
});

themeToggle.addEventListener("click", updateMobileIcons);

document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (!mobileMenu.classList.contains("opacity-0")) {
      mobileMenu.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
      mobileMenu.classList.remove("translate-y-0");
      menuOpenIcon.classList.remove("hidden");
      menuCloseIcon.classList.add("hidden");
    }
  });
});

document.addEventListener("click", (e) => {
  if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    if (!mobileMenu.classList.contains("opacity-0")) {
      mobileMenu.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
      mobileMenu.classList.remove("translate-y-0");
      menuOpenIcon.classList.remove("hidden");
      menuCloseIcon.classList.add("hidden");
    }
  }
});
