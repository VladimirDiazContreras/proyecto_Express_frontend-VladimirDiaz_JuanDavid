const form = document.getElementById("registerForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  message.textContent = "";
  message.style.color = "";

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();
  const direccion = document.getElementById("direccion").value.trim();

  // Validación mínima
  if (!nombre || !correo || !contrasena || !direccion) {
    message.style.color = "orange";
    message.textContent = "Por favor completa todos los campos.";
    return;
  }
  if (contrasena.length < 6) {
    message.style.color = "orange";
    message.textContent = "La contraseña debe tener al menos 6 caracteres.";
    return;
  }

  // Bloquear botón para evitar envíos dobles
  submitBtn.disabled = true;
  submitBtn.textContent = "Registrando...";

  try {
    const response = await fetch("https://proyecto-ex-press-backend-s1-santoyo-juan-diaz-vladi-hfv93zimp.vercel.app/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, nombre, contrasena, direccion })
    });

    if (response.ok) {
      // Redirección inmediata al login
      window.location.href = "index.html";
      return;
    } else {
      // intentar leer mensaje de error del servidor
      let errorText = "No se pudo registrar.";
      try {
        const errData = await response.json();
        if (errData && errData.message) errorText = errData.message;
      } catch (_) {}
      message.style.color = "red";
      message.textContent = `❌ Error: ${errorText}`;
    }
  } catch (err) {
    message.style.color = "red";
    message.textContent = `⚠ Error de conexión: ${err.message}`;
  } finally {
    // reactivar botón si no hubo redirección
    submitBtn.disabled = false;
    submitBtn.textContent = "Registrarse";
  }
});
