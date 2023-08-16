document.addEventListener("DOMContentLoaded", function () {
});
const usernameInput = document.getElementById('usuario');
const passwordInput = document.getElementById('contrasena');
const loginButton = document.getElementById('ingresar');

loginButton.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Verificar si el usuario y la contraseña no están vacíos
  if (username && password) {
    // Almacenar el usuario y la contraseña en LocalStorage
    localStorage.setItem('usuario', username);
    localStorage.setItem('contrasena', password);

    // Limpiar los campos de entrada
    usernameInput.value = '';
    passwordInput.value = '';

    window.open("index.html", "_blank");
  } else {
    alert('Por favor, ingresa un usuario y contraseña válidos.');
  }
});

function validarFormulario() {

    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;
    
    if (usuario === "" || contrasena === "") {
        alert("Por favor, completa todos los campos.");
        return false;
    }
    
    // Abrir una nueva pestaña con index.html
    window.open("index.html", "_blank");
    
    return true;
}




function iniciarSesion(usuario, contrasena) {

    if (usuario === "usuario" && contrasena === "contrasena") {
     
        localStorage.setItem("sesionIniciada", "true");
        return true;
    }
    return false;
}

// Función para verificar si se ha iniciado sesión
function verificarSesion() {
    return localStorage.getItem("sesionIniciada") === "true";
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("sesionIniciada");
}
