function $(s) { return document.querySelector(s); }

async function loadCategories() {
  const sel = document.getElementById('category');
  if (!sel) return;
  try {
    console.log("Cargando categorías...");
    const cats = await api.request('/categories');
    console.log("Categorías recibidas:", cats);

    // Limpiamos y agregamos opciones
    sel.innerHTML = ""; // Limpiar opciones previas
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Todas";
    sel.appendChild(defaultOption);

    cats.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c._id;
      opt.textContent = c.nombre;
      sel.appendChild(opt);
    });

  } catch (err) {
    console.error("Error cargando categorías:", err.message);
    sel.innerHTML = `<option value="">Error cargando categorías</option>`;
  }
}


async function loadMovies() {
  const list = document.getElementById('moviesContainer');
  if (!list) return;

  const categoryId = document.getElementById('category')?.value || "";

  try {
    // Si hay categoría seleccionada, usamos ese endpoint
    let url = categoryId
      ? `/movies/category/${categoryId}`
      : `/movies`;

    const movies = await api.request(url);

    // Renderizamos las películas
    list.innerHTML = movies.length > 0 ? movies.map(m => `
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
    `).join('') : `<p>No hay películas para esta categoría.</p>`;

  } catch (err) {
    console.error("Error cargando películas:", err.message);
    list.innerHTML = '<p>Error cargando películas.</p>';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const logoutBtn = document.getElementById('btnCerrarSesion');
  if (logoutBtn) logoutBtn.onclick = () => { api.clearToken(); location.href = 'index.html'; };

  // Cargar categorías y películas
  await loadCategories();
  await loadMovies();

  // Cuando cambie el select, recargar películas
  const catSel = document.getElementById('category');
  if (catSel) {
    catSel.addEventListener('change', () => {
      console.log("Categoría seleccionada:", catSel.value);
      loadMovies();
    });
  }
});
