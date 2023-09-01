document.addEventListener("DOMContentLoaded", function () {
});
const usernameInput = document.getElementById('usuario');
const passwordInput = document.getElementById('contrasena');
const loginButton = document.getElementById('ingresar');

loginButton.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  
  if (username && password) {
    
    localStorage.setItem('usuario', username);
    localStorage.setItem('contrasena', password);

    
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
    
 
    window.open("index.html", "_blank");
    
    return true;
}


function iniciarSesion(usuario, contrasena) {

    if (usuario === "usuario" && contrasena === "contrasena") {
     
        localStorage.setItem("username", "true");
        return true;
    }
    return false;
}

function verificarSesion() {
    return localStorage.getItem("username") === "true";
}

function cerrarSesion() {
    localStorage.removeItem("username");
}

