document.addEventListener("DOMContentLoaded", main);

async function main() {
  const cartProducts = await obtenerDatosCarrito();
  actualizarUI(cartProducts);
}

async function obtenerDatosCarrito() {
  try {
    const URL = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
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
            <button id="reducir-cantidad-${id}" class="btn btn-eliminar" data-product-id="${id}" style="background-color: rgb(255, 165, 0);">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash text-white" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                </svg>
            </button>
        </div>
    `;
}

function actualizarUI(cartProducts) {
  const infoCarrito = document.getElementById("infoCarrito");
  const tipoEnvioRadios = document.getElementsByName("opcion");


  infoCarrito.innerHTML = cartProducts.map(crearProductoHTML).join('');


  let subtotalGeneral = 0;
  let total_del_precio = 0;


  for (let item of cartProducts) {
    const { cost, id, soldCount } = item;
    const cantidadInput = document.getElementById(`cantidad-${id}`);
    const reducirCantidadButton = document.getElementById(`reducir-cantidad-${id}`);

    reducirCantidadButton.addEventListener("click", function (event) {
      reducirCantidad(id);
  });

  function reducirCantidad(productID) {
    const cantidadInput = document.getElementById(`cantidad-${productID}`);
    let cantidadActual = parseInt(cantidadInput.value);

    // Verifica que la cantidad actual sea mayor que 0 antes de reducirla
    if (cantidadActual > 0) {
        cantidadActual--;
        cantidadInput.value = cantidadActual;

        // Calcula el nuevo subtotal y actualiza la vista
        const nuevoSubtotal = calcularSubtotal(productID);
        const subtotalElement = document.getElementById(`subtotal-${productID}`);
        subtotalElement.textContent = nuevoSubtotal.toFixed(2);

        // Después de reducir la cantidad, actualiza los totales
        actualizarCostoEnvio(subtotalGeneral);
    }
}

  

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
}


/// DESAFIATEE Agregar evento de click al botón "Eliminar" ///

/* function eliminarProducto(productoId) {
    const cartProducts = JSON.parse(localStorage.getItem('carrito')) || [];

    // Encontrar el índice del producto a eliminar por su ID
    const productoIndex = cartProducts.findIndex((producto) => producto.id === productoId);

    if (productoIndex !== -1) {
        // Eliminar el producto del array de productos del carrito
        cartProducts.splice(productoIndex, 1);

        // Actualizar el localStorage con los productos restantes
        localStorage.setItem('carrito', JSON.stringify(cartProducts));

        // Recalcular los totales y actualizar la interfaz de usuario
        actualizarUI(cartProducts);
    } */


/// FIN DESAFIATEE ///
    


