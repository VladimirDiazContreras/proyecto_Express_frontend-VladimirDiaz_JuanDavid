/* /scripts/script5.js */
import { api } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("mi-lista");
  contenedor.innerHTML = "<p class='loading'>Cargando tu lista...</p>";

  try {
    const token = api.getToken();
    if (!token) {
      contenedor.innerHTML = `<p class="error">⚠️ Debes iniciar sesión para ver tu lista.</p>`;
      return;
    }

    const lista = await api.request("/reviews/milist", {
      method: "GET"
    });

    // Si no hay reseñas
    if (!lista || lista.length === 0 || lista.msg) {
      contenedor.innerHTML = `
        <div class="empty-list">
          <p>No tienes reseñas aún.</p>
          <p>⭐ Cuando califiques una película, aparecerá aquí.</p>
        </div>
      `;
      return;
    }

    // Pintar reseñas
    contenedor.innerHTML = "";
    lista.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("movie-card");

      card.innerHTML = `
        <img src="${item.pelicula?.portada || './img/no-image.png'}" alt="${item.pelicula?.nombre || "Película"}">
        <div class="movie-overlay">
          <h3>${item.pelicula?.nombre || "Sin título"}</h3>
          <p class="comentario">💬 ${item.comentario}</p>
          <p class="calificacion">⭐ ${item.calificacion}/5</p>
        </div>
      `;

      contenedor.appendChild(card);
    });

  } catch (error) {
    console.error("❌ Error cargando Mi Lista:", error);
    contenedor.innerHTML = `<p class="error">Error al cargar tu lista: ${error.message}</p>`;
  }
});

// Burger menú y logout
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const sideMenu = document.getElementById("sideMenu");

  if (burger && sideMenu) {
    burger.addEventListener("click", () => {
      sideMenu.classList.toggle("active");
    });
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      api.clearToken();
      location.href = "index.html";
    });
  }

  const logoutBtnMobile = document.getElementById("logoutBtnMobile");
  if (logoutBtnMobile) {
    logoutBtnMobile.addEventListener("click", () => {
      api.clearToken();
      location.href = "index.html";
    });
  }
});
