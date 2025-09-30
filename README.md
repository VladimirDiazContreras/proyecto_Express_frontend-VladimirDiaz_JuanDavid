<h3 align="center";>
<b>KarenFlix</b>
</h3>

<br>
<br>
<br>

<h3 align="center";>

**Juan David Santoyo**

</h3>

<h3 align="center";>

**Vladimir Diaz Contreras**

</h3>

<br>
<br>
<br>
<br>

<h3 align="center";>

**S1**

</h3>

<h3 align="center";>

**Pedro Felipe Gómez Bonilla**

</h3>

<br>
<br>
<br>
<br>

<h3 align="center";>

**CAMPUSLANDS**

</h3>

<h3 align="center";>

**RUTA NODE**

</h3>

<h3 align="center";>

**BUCARAMANGA, SANTANDER**

</h3>

<h3 align="center";>

**2025**

</h3>

---
# KarenFlix

## Objetivo

El objetivo de este proyecto es desarrollar una aplicación full-stack usando **Node.js** + **Express** para el backend y **HTML** + **CSS** puro para el frontend, que permita a los usuarios registrar, calificar y rankear películas, animes y series geek. Esta herramienta debe incluir funcionalidades para gestionar usuarios, reseñas, categorías y rankings, diferenciando permisos de usuario y administrador. Además, debe contar con autenticación segura, validaciones robustas y un frontend que consuma la API desarrollada.

## Funcionalidades Requeridas

### Gestión de Usuarios

- **Registro de Usuarios:** Los nuevos usuarios deben poder registrarse en la aplicación.
- **Autenticación:** El sistema debe permitir el inicio de sesión para acceder a funcionalidades protegidas.
- **Perfiles de Usuario:** Cada usuario debe tener un perfil para gestionar sus reseñas y datos.zs.  

---

## 🚀 Características

- **Pantalla de Login** (`index.html`)  
  - Formulario con validación de campos.  
  - Petición al backend para autenticar usuarios.  
  - Manejo de token JWT almacenado en `localStorage`.  

- **Pantalla principal** (`index2.html`)  
  - Navbar con enlaces a Inicio, Series, Películas y Mi Lista.  
  - Botón de **cerrar sesión** (desktop y móvil).  
  - Menú lateral responsive (modo móvil con "burger menu").  
  - Sección **Hero** con botones de acción: reproducir y más información.  
  - Sección de **catálogo** dinámico que carga películas populares desde el backend (`/movies/ranking`).  

- **Scripts principales**  
  - `script.js`: Manejo de login y autenticación.  
  - `script2.js`:  
    - Cierre de sesión.  
    - Carga dinámica del ranking de películas.  
    - Eventos de navegación (series, películas, mi lista).  
    - Control del menú responsive.  

---

## 🛠️ Tecnologías utilizadas

- **Frontend**  
  - HTML5  
  - CSS3 (`style.css`, `style2.css`)  
  - JavaScript (ES6+, módulos y consumo de API)  

- **Backend (requerido para funcionar)**  
  - Node.js con Express  
  - Endpoints esperados:  
    - `POST /auth/login` → login de usuario.  
    - `GET /movies/ranking` → listado de películas populares.  

---

## 📂 Estructura del proyecto

```
OmniFlix-Frontend/
│── index.html         # Pantalla de login
│── index2.html        # Pantalla principal con catálogo
│── scripts/
│    ├── script.js     # Lógica de login
│    ├── script2.js    # Lógica de navegación y catálogo
│    └── api.js        # Cliente de conexión con el backend
│── style/
│    ├── style.css     # Estilos de login
│    ├── style2.css    # Estilos de la página principal
```

---

## ⚙️ Instalación y uso

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/TU_USUARIO/OmniFlix-Frontend.git
   cd OmniFlix-Frontend
   ```

2. **Configurar el backend**  
   Asegúrate de tener el backend en ejecución (Express API).  

3. **Ejecutar en navegador**  
   Abre `index.html` directamente o utiliza un servidor local:  
   ```bash
   npx serve .
   ```
   > También puedes usar la extensión **Live Server** en VS Code.  

---

## 🔑 Flujo de usuario

1. El usuario ingresa correo y contraseña en `index.html`.  
2. El sistema envía la petición a `/auth/login`.  
3. Si las credenciales son correctas:  
   - Se guarda el token JWT en `localStorage`.  
   - Se redirige a `index2.html`.  
4. En `index2.html` se cargan las películas populares desde `/movies/ranking`.  
5. El usuario puede cerrar sesión desde el navbar o el menú lateral.  

---

## 📌 Próximos pasos

- pantalla **Mi Lista** (`index_milista.html`).  
-  sección de **detalles de película** (`index3.html`).   
-  sistema de **registro de usuarios** (`register.html`).  

---

## 👨‍💻 Autores

- **Juan Santoyo .**  
- **Vladimir Díaz .**  

🔗 Repositorio Backend: [Proyecto Express](https://github.com/JuanSantoyoJ/Proyecto_EXpressBackend_S1_SantoyoJuan-DiazVladimir)  

---
