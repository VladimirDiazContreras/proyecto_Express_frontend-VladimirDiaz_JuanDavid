// Burger Menu
const burger = document.getElementById("burger");
const sideMenu = document.getElementById("sideMenu");

burger.addEventListener("click", () => {
  sideMenu.classList.toggle("active");
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", () => {
    sideMenu.classList.remove("active");
  });
});

// Cerrar sesión
document.querySelector(".user-options .btn").addEventListener("click", () => {
  alert("Sesión cerrada. Volviendo al login...");
  window.location.href = "index.html";
});

// Botón "Mi lista"
document.querySelectorAll(".btn.add").forEach(button => {
  button.addEventListener("click", () => {
    alert("Película agregada a tu lista ✅");
  });
});
