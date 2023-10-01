// Obtener el nombre de usuario almacenado y mostrarlo en un elemento del documento HTML
const storedUsername = localStorage.getItem('usuario');
const usernameDisplay = document.getElementById('usuario-prueba');

if (storedUsername) {
    usernameDisplay.textContent = `${storedUsername}`;
}

document.addEventListener("DOMContentLoaded", function () {
 // Realiza una solicitud web a la URL utilizando fetch
 fetch('https://japceibal.github.io/emercado-api/user_cart/25801.json')
 .then(response => response.json())
 .then(data => {
     // Accede a los datos y muestra la información en HTML
     var infoCarrito = document.getElementById("infoCarrito");
     infoCarrito.innerHTML = `
         <p>Nombre: ${data.articles[0].name}</p>
         <p>Costo: ${data.articles[0].unitCost}</p>
         <label for="cantidad">Cantidad:</label>
         <input type="number" id="cantidad" value="${data.articles[0].count}">
         <p>Moneda: ${data.articles[0].currency}</p>
         <img src="${data.articles[0].image}" alt="Imagen del producto">
         <p id="subtotal">Subtotal: ${data.articles[0].unitCost * data.articles[0].count}</p>
     `;

     // Agrega un evento input al elemento de cantidad
     var cantidadInput = document.getElementById("cantidad");
     cantidadInput.addEventListener("input", function() {
         // Obtiene el nuevo valor de cantidad
         var nuevaCantidad = parseInt(cantidadInput.value);
         
         // Calcula el nuevo subtotal
         var nuevoSubtotal = data.articles[0].unitCost * nuevaCantidad;

         // Actualiza el valor del subtotal en el HTML
         var subtotalElement = document.getElementById("subtotal");
         subtotalElement.textContent = `Subtotal: ${nuevoSubtotal}`;
     });
 })
 .catch(error => {
     console.error('Error al obtener los datos:', error);
 });


 var infoEnvio = document.getElementById("infoEnvio");
     infoEnvio.innerHTML = `
         <h2> Tipo de Envío </h2>
         <input type="radio" name="opcion" id="opcion1" value="Opción 1">
         <label for="opcion1">Premium 2 a 5 días (15%) </label><br>

         <input type="radio" name="opcion" id="opcion2" value="Opción 2">
         <label for="opcion2">Express 5 a 8 días (7%) </label><br>

         <input type="radio" name="opcion" id="opcion3" value="Opción 3">
         <label for="opcion3">Standard 12 a 15 días (5%) </label><br>

         <h2> Dirección de Envío </h2>
            <form id="direccionForm">
                <label for="calle">Calle:</label>
                <input type="text" id="calle" name="calle"><br>

                <label for="numero">Número de Puerta:</label>
                <input type="text" id="numero" name="numero"><br>

                <label for="esquina">Esquina:</label>
                <input type="text" id="esquina" name="esquina"><br>

               
            </form>  
            
            <hr>`;

})


