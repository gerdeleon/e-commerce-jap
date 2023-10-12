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
        </div>
    `;
}

function actualizarUI(cartProducts) {
    const infoCarrito = document.getElementById("infoCarrito");

    infoCarrito.innerHTML = cartProducts.map(crearProductoHTML).join('');

    let total_del_precio = 0;
    for (let item of cartProducts) {
        const { cost, id, soldCount } = item

        total_del_precio += cost * soldCount;

        const cantidadInput = document.getElementById(`cantidad-${id}`);

        cantidadInput.addEventListener("input", function (event) {
            const nuevaCantidad = parseInt(event.target.value);
            const nuevoSubtotal = cost * nuevaCantidad;
            const subtotalElement = document.getElementById(`subtotal-${id}`);
            subtotalElement.textContent = nuevoSubtotal;
        });
    }
}


// Esto no lo toqué

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
        <button class="btn btn-primary float-end" id="btnComprar"> Comprar </button>
    `;



