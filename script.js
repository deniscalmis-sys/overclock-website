const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "CLOSE ×" : "MENU +";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "MENU +";
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const accentButtons = document.querySelectorAll(".palette-switcher button");
const savedAccent = localStorage.getItem("overclock-accent");
const setAccent = (colour) => {
  document.documentElement.style.setProperty("--olive", colour);
  document.documentElement.style.setProperty("--accent-soft", colour);
  accentButtons.forEach((button) => button.classList.toggle("active", button.dataset.accent === colour));
};
if (savedAccent) setAccent(savedAccent);
accentButtons.forEach((button) => button.addEventListener("click", () => {
  setAccent(button.dataset.accent);
  localStorage.setItem("overclock-accent", button.dataset.accent);
}));
