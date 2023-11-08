document.addEventListener("DOMContentLoaded", function () {
  // Verificar si se ha redirigido desde otra página
  const hasRedirected = localStorage.getItem("hasRedirected");

  if (!hasRedirected) {
    // Establecer una bandera en el almacenamiento local para evitar redirecciones repetidas
    localStorage.setItem("hasRedirected", "true");
    // Redirigir a la página de inicio de sesión si no se ha redirigido previamente
    window.location.href = "login.html";
  }

  // Agregar eventos a elementos con ID "autos", "juguetes" y "muebles"
  document.getElementById("autos").addEventListener("click", function () {
    // Almacenar el ID de categoría correspondiente y redirigir a la página de productos
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });

  document.getElementById("juguetes").addEventListener("click", function () {
    // Almacenar el ID de categoría correspondiente y redirigir a la página de productos
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });

  document.getElementById("muebles").addEventListener("click", function () {
    // Almacenar el ID de categoría correspondiente y redirigir a la página de productos
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });

  // Verificar si el usuario ha iniciado sesión al cargar la página
  window.onload = function () {
    if (!verificarSesion()) {
      // Redirigir a la página de inicio de sesión si el usuario no ha iniciado sesión
      window.location.href = "login.html";
    }
  };

  // Obtener y mostrar el nombre de usuario almacenado
  const storedUsername = localStorage.getItem('usuario');
  const usernameDisplay = document.getElementById('usuario-prueba');

  if (storedUsername) {
    usernameDisplay.textContent = `${storedUsername}`;
  }
});


//Para que verifique si esta logueado, sino que aparezca una alert



function verificarUsuario() {
  // Verificar si el usuario está almacenado en el localStorage
  const usuario = localStorage.getItem('usuario');
  
  if (usuario) {
    // Si el usuario está en el localStorage, redirigir a my-profile.html
    window.location.href = "my-profile.html";
  } else {
    // Si el usuario no está en el localStorage, mostrar una alert
    const alertContainer = document.getElementById('alert-container');
    
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
      Debes iniciar sesión para acceder a tu perfil.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Agregar la alerta al contenedor de alertas
    alertContainer.appendChild(alertDiv);
  }
}