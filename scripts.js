// === THEME HANDLER ===
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Set theme awal
function setInitialTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark") {
    html.classList.add("dark");
  } else {
    // Jika tidak ada preferensi, default ke mode terang
    html.classList.remove("dark");
  }
}

// Jalankan saat halaman dimuat
setInitialTheme();

// Tambahkan event listener untuk tombol
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  });
}