// scripts/script4.js
import { api } from "./api.js";

async function loadCategories() {
  const sel = document.getElementById('category');
  if (!sel) return;
  try {
    console.log("Cargando categorías...");
    const cats = await api.request('/categories');
    console.log("Categorías recibidas:", cats);

    sel.innerHTML = `<option value="">Todas</option>` +
      cats.map(c => `<option value="${c._id}">${c.nombre}</option>`).join('');
  } catch (err) {
    console.error("Error cargando categorías:", err.message);
    sel.innerHTML = `<option value="">Error cargando categorías</option>`;
  }
}

async function loadMovies() {
  const list = document.getElementById('moviesContainer');
  if (!list) return;

  const categoryId = document.getElementById('category')?.value || "";
  let url = categoryId ? `/movies/category/${categoryId}` : `/movies`;

  console.log("Llamando a:", url);

  try {
    const movies = await api.request(url);
    list.innerHTML = movies.length > 0
      ? movies.map(m => `
        <div class="movie-item">
          <img src="${m.portada?.trim() || 'https://via.placeholder.com/200x300'}" alt="${m.nombre}">
          <div class="movie-info">
            <h3>${m.nombre || 'Sin título'}</h3>
            <p>${m.descripcion || ''}</p>
            <small>${m.anno ?? ''}</small>
            <div class="actions">
              <button class="btn" onclick="location.href='index3.html?id=${m._id}'">▶ Ver</button>
              <button class="btn add">+ Mi lista</button>
            </div>
          </div>
        </div>
      `).join('')
      : `<p>No hay películas para esta categoría.</p>`;
  } catch (err) {
    console.error("Error cargando películas:", err.message);
    list.innerHTML = '<p>Error cargando películas.</p>';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const logoutBtn = document.getElementById('btnCerrarSesion');
  if (logoutBtn) logoutBtn.onclick = () => { api.clearToken(); location.href = 'index.html'; };

  await loadCategories();
  await loadMovies();

  const catSel = document.getElementById('category');
  if (catSel) {
    catSel.addEventListener('change', () => {
      console.log("Categoría seleccionada:", catSel.value);
      loadMovies();
    });
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
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
      api.clearToken();
      location.href = "index.html";
    });
  }
});
