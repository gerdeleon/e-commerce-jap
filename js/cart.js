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
            console.log(data.articles[0]);
            let producto = {
                name: data.articles[0].name,
                cost: data.articles[0].unitCost,
                soldCount: data.articles[0].count,
                currency: data.articles[0].currency,
                category: "",
                images: [data.articles[0].image],
            }

            //checkeamos si existe el local, sino lo creamos
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            //agrego al carrito
            carrito.push(producto);

            var infoCarrito = document.getElementById("infoCarrito");
            let total_del_precio = 0;
            for (const item of carrito) {
                // Calcula el subtotal para cada producto
                const subtotal = item.cost * item.soldCount;
                total_del_precio += subtotal;

                // Agrega un elemento para mostrar la cantidad y el subtotal
                infoCarrito.innerHTML += `
                    <div class="producto-en-carrito">
                        <p>Nombre: ${item.name}</p>
                        <p>Precio: ${item.cost}</p>
                        <label for="cantidad-${item.name}">Cantidad:</label>
                        <input type="number" id="cantidad-${item.name}" value="${item.soldCount}" data-producto="${item.name}">
                        <p>Subtotal: <span id="subtotal-${item.name}">${subtotal}</span></p>
                        <img src="${item.images[0]}" alt="Imagen del producto" width="300">
                    </div>
                `;

                // Agrega un evento input a cada campo de cantidad
                const cantidadInput = document.getElementById(`cantidad-${item.name}`);
                cantidadInput.addEventListener("input", function () {
                    const nuevaCantidad = parseInt(cantidadInput.value);

                    // Actualiza la cantidad en el carrito
                    item.soldCount = nuevaCantidad;

                    // Calcula el nuevo subtotal
                    const nuevoSubtotal = item.cost * nuevaCantidad;

                    // Actualiza el valor del subtotal en el HTML
                    const subtotalElement = document.getElementById(`subtotal-${item.name}`);
                    subtotalElement.textContent = nuevoSubtotal;

                    // Actualiza el total del carrito
                    total_del_precio = carrito.reduce((total, producto) => total + producto.cost * producto.soldCount, 0);
                    subTotal.textContent = total_del_precio;
                });
            }

            var subTotal = document.getElementById("subtotal");
            subTotal.textContent = total_del_precio;
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

            <label for="numero" id="numero">Número de Puerta:</label>
            <input type="text" id="numero" name="numero"><br>

            <label for="esquina">Esquina:</label>
            <input type="text" id="esquina" name="esquina"><br>
        </form>
    `;
})
