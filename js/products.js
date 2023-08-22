document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
});

function fetchProducts() {
  // Obtiene el ID de categoría almacenado en el LocalStorage
  const categoryId = localStorage.getItem("catID");
  
  // Genera la URL del JSON correspondiente a la categoría seleccionada
  const url = `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`;
  
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

//Buscador

    const products = jsonData.products;
    const searchInput = document.getElementById('search');
    const resultsList = document.getElementById('results');
    const productos = [];
    fetch(url)
.then((response) => response.json())
.then((jsonData) => {

        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase();
            resultsList.innerHTML = '';
          
            const filteredProductos = productos.filter(producto =>
              producto.nombre.toLowerCase().includes(searchTerm)
            );
          
            filteredProductos.forEach(producto => {
              const li = document.createElement('li');
              li.textContent = producto.nombre;
              resultsList.appendChild(li);
            });
          });
                  
          
          
          
          
    }
)