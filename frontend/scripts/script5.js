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
      card.classList.add("review-card");

      // Generar estrellas para la calificación
      const estrellas = "⭐".repeat(item.calificacion) + "☆".repeat(5 - item.calificacion);

      card.innerHTML = `
        <div class="review-content">
          <img src="${item.pelicula?.portada || './img/no-image.png'}" alt="${item.pelicula?.nombre || "Película"}" class="movie-poster">
          <div class="review-info">
            <h3 class="movie-title">${item.pelicula?.nombre || "Sin título"}</h3>
            <div class="rating">${estrellas} (${item.calificacion}/5)</div>
            <p class="comment">"${item.comentario}"</p>
            <div class="review-date">📅 ${new Date(item.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        <div class="review-actions">
          <button class="btn-edit" onclick="editReview('${item._id}', '${item.pelicula?.nombre}', '${item.pelicula?.portada}', '${item.comentario}', ${item.calificacion})">
            ✏️ Editar
          </button>
          <button class="btn-delete" onclick="deleteReview('${item._id}', '${item.pelicula?.nombre}')">
            🗑️ Eliminar
          </button>
        </div>
      `;

      contenedor.appendChild(card);
    });

  } catch (error) {
    console.error("❌ Error cargando Mi Lista:", error);
    contenedor.innerHTML = `<p class="error">Error al cargar tu lista: ${error.message}</p>`;
  }
});

// Variables globales para el modal
let currentReviewId = null;

// Función para editar reseña
window.editReview = function(reviewId, movieTitle, moviePoster, comentario, calificacion) {
  currentReviewId = reviewId;
  
  // Llenar el modal con los datos actuales
  document.getElementById('modalMovieTitle').textContent = movieTitle;
  document.getElementById('modalMoviePoster').src = moviePoster || './img/no-image.png';
  document.getElementById('editComentario').value = comentario;
  document.getElementById('editCalificacion').value = calificacion;
  
  // Mostrar el modal
  document.getElementById('editModal').style.display = 'block';
};

// Función para eliminar reseña
window.deleteReview = async function(reviewId, movieTitle) {
  if (!confirm(`¿Estás seguro de que quieres eliminar tu reseña de "${movieTitle}"?`)) {
    return;
  }

  try {
    await api.request(`/reviews/${reviewId}`, {
      method: 'DELETE'
    });

    alert('Reseña eliminada correctamente');
    location.reload(); // Recargar la página para actualizar la lista
  } catch (error) {
    console.error('Error eliminando reseña:', error);
    alert('Error al eliminar la reseña: ' + error.message);
  }
};

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

  // Event listeners para el modal
  const modal = document.getElementById('editModal');
  const closeModal = document.getElementById('closeModal');
  const cancelEdit = document.getElementById('cancelEdit');
  const editForm = document.getElementById('editReviewForm');

  // Cerrar modal
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  cancelEdit.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar modal al hacer clic fuera
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Manejar envío del formulario de edición
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const comentario = document.getElementById('editComentario').value.trim();
    const calificacion = parseInt(document.getElementById('editCalificacion').value);

    if (!comentario || !calificacion) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      await api.request(`/reviews/${currentReviewId}`, {
        method: 'PUT',
        body: {
          comentario,
          calificacion
        }
      });

      alert('Reseña actualizada correctamente');
      modal.style.display = 'none';
      location.reload(); // Recargar la página para mostrar los cambios
    } catch (error) {
      console.error('Error actualizando reseña:', error);
      alert('Error al actualizar la reseña: ' + error.message);
    }
  });
});
