// Burger Menu
const burger = document.getElementById("burger");
const sideMenu = document.getElementById("sideMenu");

burger.addEventListener("click", () => {
  if (sideMenu.style.right === "0px") {
    sideMenu.style.right = "250px";
  } else {
    sideMenu.style.right = "0px";
  }
});

// Cerrar sesión
document.querySelector(".user-options .btn").addEventListener("click", () => {
  alert("Sesión cerrada. Volviendo al login...");
  window.location.href = "./index.html";
});
