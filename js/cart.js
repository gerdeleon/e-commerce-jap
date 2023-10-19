// Obtener el nombre de usuario almacenado y mostrarlo en un elemento del documento HTML
const storedUsername = localStorage.getItem('usuario');
const usernameDisplay = document.getElementById('usuario-prueba');

if (storedUsername) {
    usernameDisplay.textContent = `${storedUsername}`;
}

document.addEventListener("DOMContentLoaded", main);

async function main() {
    const cartProducts = await obtenerDatosCarrito();
    actualizarUI(cartProducts);
}

async function obtenerDatosCarrito() {
    try {
        const URL = 'https://japceibal.github.io/emercado-api/user_cart/25801.json'
        const response = await fetch(URL);
        const data = await response.json();
        const endpointData = data.articles[0];
        const { id, name, currency, image, count, unitCost } = endpointData;
        const endpointDataUpdated = {
            id: id,
            name: name,
            currency: currency,
            image: image,
            soldCount: count,
            cost: unitCost
        };

        const lsData = JSON.parse(localStorage.getItem('carrito'));

        const cartProducts = (lsData) ? [...[endpointDataUpdated], ...lsData] : [endpointDataUpdated];

        return cartProducts;

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function crearProductoHTML(item) {
    const { name, currency, cost, id, soldCount, image } = item
    return `
        <div class="producto-en-carrito">
            <hr>
            <p>Nombre: ${name}</p>
            <p>Precio: ${currency} ${cost}</p>
            <label for="cantidad-${name}">Cantidad:</label>
            <input type="number" id="cantidad-${id}" value="${soldCount}" min='0' max='100'">
            <p>Subtotal: <span id="subtotal-${id}">${cost * soldCount} </span></p>
            <img src="${image}" alt="Imagen del producto" width="300">
            <button class="btn btn-danger data-product-id" data-product-id="${id}">Eliminar</button>
        </div>
    `;
}

function actualizarUI(cartProducts) {
    const infoCarrito = document.getElementById("infoCarrito");
    const tipoEnvioRadios = document.getElementsByName("opcion");

    infoCarrito.innerHTML = cartProducts.map(crearProductoHTML).join('');

    let subtotalGeneral = 0; // Inicializa el subtotal general en 0
    let total_del_precio = 0;

    for (let item of cartProducts) {
        const { cost, id, soldCount } = item;
        const cantidadInput = document.getElementById(`cantidad-${id}`);

        cantidadInput.addEventListener("input", function (event) {
            const nuevaCantidad = parseInt(event.target.value);
            const nuevoSubtotal = cost * nuevaCantidad;
            const subtotalElement = document.getElementById(`subtotal-${id}`);
            subtotalElement.textContent = nuevoSubtotal.toFixed(2);

            // Actualiza el subtotal general
            subtotalGeneral = cartProducts.reduce((total, product) => {
                return total + product.cost * (parseInt(document.getElementById(`cantidad-${product.id}`).value));
            }, 0);
            subtotalGeneralElement.textContent = subtotalGeneral.toFixed(2);
            actualizarCostoEnvio(subtotalGeneral);
        });

        total_del_precio += cost * soldCount;
    }

    const subtotalGeneralElement = document.getElementById("subtotal-general").querySelector("span");
    subtotalGeneralElement.textContent = total_del_precio.toFixed(2);

    const costoEnvioElement = document.getElementById("costo-envio").querySelector("span");
    // Agregar evento de escucha a los radios de tipo de envío
    for (let radio of tipoEnvioRadios) {
        radio.addEventListener("change", function () {
            actualizarCostoEnvio(subtotalGeneral);
        });
    }

    function actualizarCostoEnvio(subtotalGeneral) {
        let costoEnvio = 0;
        for (let radio of tipoEnvioRadios) {
            if (radio.checked) {
                const porcentajeEnvio = parseFloat(radio.value) / 100;
                costoEnvio = subtotalGeneral * porcentajeEnvio;
            }
        }
    costoEnvioElement.textContent = costoEnvio.toFixed(2);

    const totalPagar = subtotalGeneral + costoEnvio;
    const totalPagarElement = document.getElementById("total-pagar").querySelector("span");
    totalPagarElement.textContent = totalPagar.toFixed(2);
}

/// DESAFIATEE Agregar evento de clic al botón "Eliminar" ///

     const eliminarBotones = document.querySelectorAll(".eliminar-producto");
     eliminarBotones.forEach((boton) => {
         boton.addEventListener("click", function (event) {
             const productoId = event.target.getAttribute("data-producto-id");
             eliminarProducto(productoId);
         });
     });
 }
 
 // Función para eliminar un producto del carrito
 function eliminarProducto(productoId) {
    const cartProducts = JSON.parse(localStorage.getItem('carrito')) || [];

    // Encontrar el índice del producto a eliminar por su ID
    const productoIndex = cartProducts.findIndex((producto) => producto.id === productoId);

    if (productoIndex !== -1) {
        // Eliminar el producto del array de productos del carrito
        cartProducts.splice(productoIndex, 1);

        // Actualizar el localStorage con los productos restantes
        localStorage.setItem('carrito', JSON.stringify(cartProducts));

        // Recalcular los totales
        actualizarUI(cartProducts);
    }
}
 
 // Resto de tu código para actualizar los totales, similar a lo que ya tienes

    
actualizarUI(cartProducts);

/// FIN DESAFIATEE ///
