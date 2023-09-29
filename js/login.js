// Esperar a que se cargue completamente el documento HTML
document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencias a los elementos del formulario
  const usernameInput = document.getElementById('usuario');
  const passwordInput = document.getElementById('contrasena');
  const loginButton = document.getElementById('ingresar');

  // Agregar un evento de clic al botón de inicio de sesión
  loginButton.addEventListener('click', () => {
    // Obtener el nombre de usuario y contraseña ingresados
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Verificar si se han ingresado tanto usuario como contraseña
    if (username && password) {
      // Almacenar el nombre de usuario y contraseña en el almacenamiento local
      localStorage.setItem('usuario', username);
      localStorage.setItem('contrasena', password);

      // Limpiar los campos de entrada
      usernameInput.value = '';
      passwordInput.value = '';

      // Abrir una nueva ventana o pestaña con el archivo "index.html"
      window.open("index.html", "_blank");
    } else {
      // Mostrar una alerta si falta el nombre de usuario o la contraseña
      alert('Por favor, ingresa un usuario y contraseña válidos.');
    }
  });
});

// Función para validar el formulario de inicio de sesión
function validarFormulario() {
  var usuario = document.getElementById("usuario").value;
  var contrasena = document.getElementById("contrasena").value;

  if (usuario === "" || contrasena === "") {
    // Mostrar una alerta si falta el nombre de usuario o la contraseña
    alert("Por favor, completa todos los campos.");
    return false;
  }

  // Abrir una nueva ventana o pestaña con el archivo "index.html"
  window.open("index.html", "_blank");

  return true;
}

// Función para iniciar sesión
function iniciarSesion(usuario, contrasena) {
  if (usuario === "usuario" && contrasena === "contrasena") {
    // Establecer una bandera en el almacenamiento local para indicar que el usuario ha iniciado sesión
    localStorage.setItem("username", "true");
    return true;
  }
  return false;
}

// Función para verificar si el usuario ha iniciado sesión
function verificarSesion() {
  return localStorage.getItem("username") === "true";
}

// Función para cerrar la sesión del usuario
function cerrarSesion() {
  localStorage.removeItem("username");
}