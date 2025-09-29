/* /scripts/script3.js */

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const peliculaId = params.get("id");

  if (!peliculaId) {
    document.getElementById("movie-info").innerHTML = `
      <h1>Error</h1>
      <p>No se especificó la película.</p>
    `;
    return;
  }

  // ==============================
  // 🔹 Cargar película
  // ==============================
  try {
    const pelicula = await api.request(`/movies/${peliculaId}`);
    console.log("🎬 Película cargada:", pelicula);

    // Buscar el nombre de la categoría
    let nombreCategoria = "Sin categoría";
    if (pelicula.categoriaId) {
      try {
        const categorias = await api.request("/categories");
        const categoria = categorias.find(c => c._id === pelicula.categoriaId);
        if (categoria) nombreCategoria = categoria.nombre;
      } catch (err) {
        console.error("❌ Error cargando categoría:", err);
      }
    }

    const hero = document.getElementById("movie-hero");
    if (hero) hero.style.backgroundImage = `url('${pelicula.portada}')`;

    const info = document.getElementById("movie-info");
    if (info) {
      info.innerHTML = `
        <h1>${pelicula.nombre}</h1>
        <p>${pelicula.descripcion || "Sin descripción."}</p>
        <p><strong>Categoría:</strong> ${nombreCategoria}</p>
        <div class="buttons">
          <button class="btn">▶ Reproducir</button>
          <button class="btn secondary">+ Mi Lista</button>
        </div>
      `;
    }

    // cargar reseñas
    await cargarReseñas(peliculaId);

  } catch (err) {
    console.error("❌ Error cargando detalle:", err);
    const info = document.getElementById("movie-info");
    if (info) {
      info.innerHTML = `
        <h1>Error</h1>
        <p>No se pudo cargar la película.</p>
      `;
    }
  }

  // ==============================
  // 🔹 Enviar reseña
  // ==============================
  const btnEnviar = document.getElementById("btnEnviar");
  if (btnEnviar) {
    btnEnviar.addEventListener("click", async () => {
      const comentario = document.getElementById("comentario").value.trim();
      const calificacion = document.getElementById("calificacion").value.trim();

      if (!comentario || !calificacion) {
        alert("Escribe un comentario y una calificación (1-5)");
        return;
      }

      try {
        const body = { peliculaId, comentario, calificacion: Number(calificacion) };
        console.log("📤 Enviando reseña:", body);

        await api.request("/reviews", {
          method: "POST",
          body
        });

        alert("✅ Reseña enviada");
        document.getElementById("comentario").value = "";
        document.getElementById("calificacion").value = "";

        await cargarReseñas(peliculaId);

      } catch (err) {
        console.error("❌ Error al enviar reseña:", err.message);
        alert("Error al enviar reseña: " + err.message);
      }
    });
  }
});

// ==============================
// 🔹 Función cargar reseñas
// ==============================
async function cargarReseñas(peliculaId) {
  const cont = document.getElementById("reviews-list");
  if (!cont) return;
  cont.innerHTML = "Cargando reseñas...";

  const renderNoReviews = () => {
    cont.innerHTML = `
      <div class="no-reviews">
        <span>🎬</span>
        <p>Aún no hay reseñas para esta película.<br>
        ¡Sé el primero en dejar tu opinión!</p>
      </div>
    `;
  };

  try {
    const data = await api.request(`/reviews/movie/${peliculaId}`, { method: "GET" });
    console.log("📖 Reseñas obtenidas:", data);

    const lista = Array.isArray(data) ? data : data?.reseñas;

    if (!Array.isArray(lista) || lista.length === 0) {
      renderNoReviews();
      return;
    }

    cont.innerHTML = "";
    lista.forEach(r => {
      const stars =
        "⭐".repeat(Math.max(0, Math.min(5, Number(r.calificacion) || 0))) +
        "☆".repeat(5 - Math.max(0, Math.min(5, Number(r.calificacion) || 0)));

      const div = document.createElement("div");
      div.classList.add("review-card");
      div.innerHTML = `
        <p><strong>Usuario:</strong> ${r.usuario || "Anónimo"}</p>
        <p><strong>Comentario:</strong> ${r.comentario}</p>
        <p class="stars">${stars}</p>
      `;
      cont.appendChild(div);
    });

  } catch (err) {
    const msg = String(err?.message || "").toLowerCase();
    if (msg.includes("no hay reseñas")) {
      renderNoReviews();
      return;
    }

    console.error("❌ Error cargando reseñas:", err);
    cont.innerHTML = "<p>Error cargando reseñas.</p>";
  }
}

// ==============================
// 🔹 Logout
// ==============================
function logout() {
  api.clearToken();
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const sideMenu = document.getElementById("sideMenu");

  if (burger && sideMenu) {
    burger.addEventListener("click", () => {
      sideMenu.classList.toggle("active");
    });
  }
});
