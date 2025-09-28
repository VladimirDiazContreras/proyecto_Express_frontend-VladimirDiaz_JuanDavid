/* /scripts/script4.js */
function $(s) { return document.querySelector(s); }
function getQP() { return Object.fromEntries(new URLSearchParams(location.search).entries()); }

async function loadCategories() {
  const sel = $('#category');
  if (!sel) return;
  try {
    const cats = await api.request('/categories'); // [{_id,nombre,...}]
    sel.innerHTML = `<option value="">Todas</option>` + 
      cats.map(c => `<option value="${c._id}">${c.nombre}</option>`).join('');
  } catch (err) {
    console.error("Error cargando categorías:", err.message);
  }
}

async function loadMovies() {
  const list = document.querySelector('.movie-list') || (() => {
    const el = document.createElement('div');
    el.className = 'movie-list';
    document.body.appendChild(el);
    return el;
  })();

  const { search = '', page = '1', limit = '12' } = getQP();
  const q = new URLSearchParams();
  if (search) q.set('search', search);
  if (page)   q.set('page', page);
  if (limit)  q.set('limit', limit);

  try {
    const data = await api.request(`/movies?${q.toString()}`);
    const movies = Array.isArray(data) ? data : (data.items || data.data || []);
    list.innerHTML = `
      <h2>Películas</h2>
      ${movies.map(m => `
        <div class="movie-item">
          <img src="${m.portada && m.portada.trim() ? m.portada : 'https://via.placeholder.com/200x300'}" alt="${m.nombre}">
          <div class="movie-info">
            <h3>${m.nombre || 'Sin título'}</h3>
            <p>${m.descripcion || ''}</p>
            <small>${m.anno ?? ''}</small>
            <div class="actions">
              <button class="btn" onclick="location.href='index3.html?id=${m._id}'">▶ Ver</button>
              <button class="btn secondary">Más información</button>
              <button class="btn add">+ Mi lista</button>
            </div>
          </div>
        </div>
      `).join('')}
    `;
  } catch (err) {
    console.error("Error cargando películas:", err.message);
    list.innerHTML = '<h2>Películas</h2><p>Error cargando el listado.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.onclick = () => { api.clearToken(); location.href = 'index.html'; };

  loadCategories();
  loadMovies();

  // Búsqueda
  const searchInput = $('#search');
  const searchBtn = $('#searchBtn');
  function goSearch() {
    const q = new URLSearchParams(location.search);
    q.set('search', (searchInput?.value || '').trim());
    location.search = q.toString();
  }
  if (searchBtn)   searchBtn.onclick = goSearch;
  if (searchInput) searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') goSearch(); });
});

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const sideMenu = document.getElementById("sideMenu");

  if (burger && sideMenu) {
    burger.addEventListener("click", () => {
      sideMenu.classList.toggle("active");
    });
  }
});
