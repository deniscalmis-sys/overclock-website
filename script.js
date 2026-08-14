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

const colourButtons = document.querySelectorAll(".colour-lab button");

colourButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.documentElement.style.setProperty("--red", button.dataset.colour);
    colourButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});
