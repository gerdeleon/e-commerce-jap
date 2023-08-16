
        document.getElementById("formulario-login").addEventListener("submit", function (event) {
            event.preventDefault();
            
            var usuario = document.getElementById("usuario").value;
            var contrasena = document.getElementById("contrasena").value;
            
            if (iniciarSesion(usuario, contrasena)) {
                // Redirigir a la página principal después de iniciar sesión
                window.location.href = "index.html";
            } else {
                alert("Credenciales inválidas");
            }
        });

    <div class="registro">  
       <center> <p class="reg"> ¿ Aún no estás registrado ? </p> </center>
        <button class="Btn" type="button" id="RegBtn">Registrate Ahora!</button> 
    </div>

    <div class="fin"> 
       <footer class="pie">
          <p><span class="left">Este sitio forma parte de <a href="https://jovenesaprogramar.edu.uy/" target="_blank">Jovenes a Programar</a> - Grupo 256 Desarrollo Web</span><span class="right">&copy;Subgrupo 6 2023</span></p>
        </div>

  <script src="js/login.js"></script>

