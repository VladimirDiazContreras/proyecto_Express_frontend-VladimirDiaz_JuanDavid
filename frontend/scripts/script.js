/* /scripts/script.js */
import { api } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (!form) {
    console.error("⚠️ No se encontró el formulario de login (#loginForm)");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    if (!correo || !contrasena) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const data = await api.request("/auth/login", {
        method: "POST",
        body: { correo, contrasena }
      });

      // ✅ Guardar el token en localStorage
      api.setToken(data.token);
      console.log("🔑 Token guardado:", data.token);

      // Redirigir al home
      location.href = "index2.html";
    } catch (err) {
      console.error("❌ Error en login:", err.message);
      alert("Error al iniciar sesión: " + err.message);
    }
  });
});
