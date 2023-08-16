document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("botonLogin");
    loginButton.addEventListener("click", function () {
        const username = document.getElementById("usuario").value;
        const password = document.getElementById("contraseña").value;
        
        // Simulación de verificación de inicio de sesión
        if (username === "usuario" && password === "contraseña") {
            window.location.href = "index.html"; // Redirige a la página principal
        } else {
            alert("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    });
});

    
    
    
    
    
    
    
    
    /*function validarFormulario() {
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

// Función para iniciar sesión
function iniciarSesion(usuario, contrasena) {
    // Aquí podrías realizar la autenticación con un servidor o simplemente verificar las credenciales en el cliente
    // En este ejemplo, consideramos un usuario válido con las credenciales "usuario" y "contrasena"
    if (usuario === "usuario" && contrasena === "contrasena") {
        // Almacenar una señal de sesión en localStorage
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
}*/
