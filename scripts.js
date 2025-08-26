// =================================================================
// Bagian Utama: Pengaturan Tema & Efek Scroll Header
// =================================================================
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");
const html = document.documentElement;
const header = document.querySelector("header");

function updateIcons() {
  // Pengecekan agar tidak error jika elemen tidak ditemukan
  if (sunIcon && moonIcon) {
    if (html.classList.contains("dark")) {
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    } else {
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
    }
  }
}
updateIcons();

// Pastikan themeToggle ada sebelum menambahkan event listener
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    html.classList.toggle("dark");
    localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
    updateIcons();
  });
}

const scrollBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
  // Pengecekan untuk scrollBtn
  if (scrollBtn) {
    if (window.scrollY > 200) {
      scrollBtn.classList.remove("hidden");
      scrollBtn.classList.add("opacity-100");
    } else {
      scrollBtn.classList.add("hidden");
      scrollBtn.classList.remove("opacity-100");
    }
  }

  // Pengecekan untuk header dan headerBg
  if (header) {
    const headerBg = header.querySelector(".absolute");
    if (headerBg) {
      if (window.scrollY > 50) {
        headerBg.classList.remove("bg-white/30", "dark:bg-[#1e293b]/30");
        headerBg.classList.add("bg-white/80", "dark:bg-[#1e293b]/80");
      } else {
        headerBg.classList.remove("bg-white/80", "dark:bg-[#1e293b]/80");
        headerBg.classList.add("bg-white/30", "dark:bg-[#1e293b]/30");
      }
    }
  }
});

// Pastikan scrollBtn ada sebelum menambahkan event listener
if (scrollBtn) {
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

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

// Fungsi untuk update icon mobile
function updateMobileIcons() {
  // Pengecekan agar tidak error
  if (sunIconMobile && moonIconMobile) {
    if (html.classList.contains("dark")) {
      sunIconMobile.classList.remove("hidden");
      moonIconMobile.classList.add("hidden");
    } else {
      sunIconMobile.classList.add("hidden");
      moonIconMobile.classList.remove("hidden");
    }
  }
}
updateMobileIcons();

// Fungsi sederhana untuk toggle menu
let isMenuOpen = false;
function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;

  // Pengecekan agar tidak error
  if (menuOpenIcon && menuCloseIcon && mobileMenu) {
    // Toggle icon hamburger
    menuOpenIcon.classList.toggle("hidden");
    menuCloseIcon.classList.toggle("hidden");

    // Toggle menu
    if (isMenuOpen) {
      mobileMenu.classList.remove("hidden");
      // Tambah delay kecil untuk animasi
      requestAnimationFrame(() => {
        mobileMenu.classList.remove("opacity-0");
        mobileMenu.classList.remove("pointer-events-none");
      });
    } else {
      mobileMenu.classList.add("opacity-0");
      mobileMenu.classList.add("pointer-events-none");
      // Tunggu animasi selesai sebelum hide
      setTimeout(() => {
        mobileMenu.classList.add("hidden");
      }, 200);
    }
  }
}

// Event listener untuk hamburger button
if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });
}

// Theme toggle untuk mobile
if (themeToggleMobile) {
  themeToggleMobile.addEventListener("click", () => {
    html.classList.toggle("dark");
    localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
    updateIcons();
    updateMobileIcons();
  });
}

// Update mobile icons ketika desktop theme berubah
if (themeToggle) {
  themeToggle.addEventListener("click", updateMobileIcons);
}

// Tutup menu saat klik link
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (isMenuOpen) {
      toggleMobileMenu();
    }
  });
});

// Tutup menu saat klik di luar
document.addEventListener("click", (e) => {
  if (isMenuOpen && hamburgerBtn && mobileMenu && !hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    toggleMobileMenu();
  }
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // Menambahkan kelas untuk memulai animasi fade out
    preloader.classList.add("opacity-0");

    // Mengurangi waktu preloader menjadi 2 detik
    setTimeout(() => {
      preloader.style.display = "none";
    }, 2000);
  }
});

function openProfileModal() {
  document.getElementById('profile-modal').classList.remove('hidden');
}

function closeProfileModal() {
  document.getElementById('profile-modal').classList.add('hidden');
}
