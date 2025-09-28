/* /scripts/script2.js */
document.addEventListener('DOMContentLoaded', async () => {
  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      api.clearToken();
      location.href = 'index.html';
    };
  }

  // Contenedor de populares
  const container =
    document.querySelector('.carousel-container') ||
    document.querySelector('#popularGrid') ||
    (() => {
      const el = document.createElement('div');
      el.className = 'carousel-container';
      document.body.appendChild(el);
      return el;
    })();

  try {
    // Endpoint de ranking
    const items = await api.request('/movies/ranking'); 
    container.innerHTML = items.map(m => `
      <div class="movie-card"
           onclick="location.href='index3.html?id=${m._id}'"
           title="${m.nombre}">
        <img src="${m.portada && m.portada.trim() ? m.portada : 'https://via.placeholder.com/200x300'}" 
             alt="${m.nombre}" 
             style="width:180px;height:260px;object-fit:cover;border-radius:12px;">
        <div style="text-align:center;margin-top:5px;color:#fff;font-weight:bold;">
          ${m.nombre}
        </div>
      </div>
    `).join('');
  } catch (e) {
    console.error("Error cargando populares:", e.message);
    container.innerHTML = '<p>No se pudieron cargar las películas populares.</p>';
  }
});

// Botones del hero
document.addEventListener("DOMContentLoaded", () => {
  const btnReproducir = document.getElementById("btnReproducir");
  const btnInfo = document.getElementById("btnInfo");

  if (btnReproducir) {
    btnReproducir.addEventListener("click", () => {
      location.href = "index4.html"; // 🔹 Va a la lista de películas
    });
  }

  if (btnInfo) {
    btnInfo.addEventListener("click", () => {
      window.open(
        "https://github.com/JuanSantoyoJ/Proyecto_EXpressBackend_S1_SantoyoJuan-DiazVladimir.git",
        "_blank"
      );
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Series y Películas llevan a index4.html
  const linkSeries = document.getElementById("linkSeries");
  const linkPeliculas = document.getElementById("linkPeliculas");
  if (linkSeries) {
    linkSeries.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = "index4.html";
    });
  }
  if (linkPeliculas) {
    linkPeliculas.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = "index4.html";
    });
  }

  // 🔹 Mi lista: películas reseñadas por el usuario
  const linkMiLista = document.getElementById("linkMiLista");
  if (linkMiLista) {
    linkMiLista.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = "index_milista.html"; // ➝ tendrás que crear este HTML
    });
  }

  // 🔹 Cerrar sesión
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
      api.clearToken(); // borra el token
      location.href = "index.html"; // redirige al login
    });
  }
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
