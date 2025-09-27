document.getElementById("loginForm").addEventListener("submit", function(event){
  event.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;

  if(usuario === "admin" && contrasena === "1234"){
    alert("✅ Bienvenido a Omniflix, " + usuario);
  } else {
    alert("❌ Usuario o contraseña incorrectos");
  }
});
