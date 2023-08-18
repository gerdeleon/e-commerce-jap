document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
});

function fetchProducts() {
    // URL del JSON en otra página
    const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

    fetch(url)
        .then((response) => response.json())
        .then((jsonData) => {
            const products = jsonData.products;

            // Obtener el contenedor donde se mostrarán los productos
            const productListContainer = document.querySelector(".product-list");

            // Recorremos cada producto y generamos el HTML para mostrarlos
            let productHTML = "";
            products.forEach((product) => {
                productHTML += `
            <div class="card mb-4">
                <img src="${product.image}" alt="${product.name}" width="250">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Precio: ${product.cost} ${product.currency}</p>
                <p class="card-text">Vendidos: ${product.soldCount}</p>
              </div>
            </div>
          `;
            });

            // Agregamos los productos al contenedor en el HTML
            productListContainer.innerHTML = productHTML;
        })
        .catch((error) => {
            console.error("Error al obtener los productos:", error);
        });
}
