const product = JSON.parse(localStorage.getItem('setProduct'));
let producto_del_fetch = "";

document.addEventListener("DOMContentLoaded", function () {
  fetch(`http://localhost:3000/products/${product}`)
    .then(response => response.json())
    .then(product => {
      producto_del_fetch = product;
      const productDetailsElement = document.getElementById('product-details');

      productDetailsElement.innerHTML = `
        <br>
        <br>
        <h2>${product.name}</h2>
        <br>
        <p class="subtitulo">Precio:</p><p>UYU${product.cost}</p>
        <p class="subtitulo">Descripción:</p><p>${product.description}</p>
        <p class="subtitulo">Categoría:</p><p>${product.category}</p>
        <p class="subtitulo">Cantidad de vendidos:</p><p>${product.soldCount}</p>
        <p class="subtitulo">Imágenes Ilustrativas:</p>
        <br>
        <br>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="img/prod${product.id}_1.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="img/prod${product.id}_2.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="img/prod${product.id}_3.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="img/prod${product.id}_4.jpg" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" ariahidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
          <button onClick="handleAddCarrito()" class="btn btn-primary float-end" id="btnComprar"> Añadir al carrito </button>
        </div>`;
    })
    .catch(error => console.error('Error al obtener información del producto:', error));

  const setProduct = JSON.parse(localStorage.getItem("setProduct"));
  const productId = setProduct;
  const jsonUrl = `http://localhost:3000/products_comments/${productId}`;

  function agregarComentario(comentario) {
    const comentarioDiv = document.createElement("div");
    comentarioDiv.classList.add("card-body");
    const usuarioP = document.createElement("p");
    usuarioP.innerHTML = `<strong>Usuario:</strong> ${comentario.user}`;
    comentarioDiv.appendChild(usuarioP);
    usuarioP.classList.add("card-header");

    const comentarioP = document.createElement("p");
    comentarioP.innerHTML = `<strong>Comentario:</strong> ${comentario.description}`;
    comentarioDiv.appendChild(comentarioP);
    comentarioP.classList.add("card-body");

    const puntuacionP = document.createElement("p");
    puntuacionP.innerHTML = `<strong>Puntuación:</strong> ${obtenerEstrellas(comentario.score)}</div>`;
    comentarioDiv.appendChild(puntuacionP);
    puntuacionP.classList.add("card-body");

    const fechaHoraP = document.createElement("p");
    fechaHoraP.innerHTML = `<strong>Fecha y Hora:</strong> ${comentario.dateTime} <br> <br>`;
    comentarioDiv.appendChild(fechaHoraP);
    fechaHoraP.classList.add("card-body");

    document.getElementById("comentario").appendChild(comentarioDiv);
  }

  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      data.forEach(comentario => {
        agregarComentario(comentario);
      });
    })
    .catch(error => {
      console.error("Error al cargar el JSON:", error);
    });

  function obtenerEstrellas(puntuacion) {
    const estrellas = '★'.repeat(puntuacion);
    const estrellasVacias = '☆'.repeat(5 - puntuacion);
    const estrellasHTML = `<span style="color: orange">${estrellas}</span><span>${estrellasVacias}</span>`;
    return estrellasHTML;
  }

  fetch(`http://localhost:3000/products/${product}`)
    .then(response => response.json())
    .then(product => {
      const productRelacionadosElement = document.getElementById('relProds');
      productRelacionadosElement.innerHTML = `
        <div class="producto1">
          <h2>${product.relatedProducts[0].name}</h2>
          <img src="img/prod${product.relatedProducts[0].id}_1.jpg" alt="product image" class="img-thumbnail" onclick="redirectToProduct(${product.relatedProducts[0].id})">
        </div>
        <div class="producto2">
          <h2>${product.relatedProducts[1].name}</h2>
          <img src="img/prod${product.relatedProducts[1].id}_1.jpg" alt="product image" class="img-thumbnail" onclick="redirectToProduct(${product.relatedProducts[1].id})">
        </div>
      `;
    })
    .catch(error => console.error('Error al obtener información del producto:', error));
});

function redirectToProduct(product) {
  localStorage.removeItem("setProduct");
  localStorage.setItem("selectedProductId", product);
  window.scrollTo(0, 0);

  const productoID = JSON.parse(localStorage.getItem('selectedProductId'));

  if (productoID) {
    const productUrl = `http://localhost:3000/products/${productoID}`;
    fetch(productUrl)
      .then(response => response.json())
      .then(product => {
        const productDetailsElement = document.getElementById('product-details');
        productDetailsElement.innerHTML = `
          <br>
          <br>
          <h2>${product.name}</h2>
          <br>
          <p class="subtitulo">Precio:</p><p>UYU${product.cost}</p>
          <p class="subtitulo">Descripción:</p><p>${product.description}</p>
          <p class="subtitulo">Categoría:</p><p>${product.category}</p>
          <p class="subtitulo">Cantidad de vendidos:</p><p>${product.soldCount}</p>
          <p class="subtitulo">Imágenes Ilustrativas:</p>
          <br>
          <br>
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="img/prod${product.id}_1.jpg" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="img/prod${product.id}_2.jpg" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="img/prod${product.id}_3.jpg" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="img/prod${product.id}_4.jpg" class="d-block w-100" alt="...">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        `;
      });
  }
}

const handleAddCarrito = () => {
  const prodToAdd = {
    id: producto_del_fetch.id,
    name: producto_del_fetch.name,
    soldCount: producto_del_fetch.soldCount,
    cost: producto_del_fetch.cost,
    currency: producto_del_fetch.currency,
    image: producto_del_fetch.images[0],
  };

  let lsCarritoData = JSON.parse(localStorage.getItem('carrito'));

  if (!lsCarritoData) {
    const prod = {
      ...prodToAdd,
      soldCount: 1,
    };
    localStorage.setItem('carrito', JSON.stringify([prod]));
    return;
  }

  let itemDelLocal = lsCarritoData.find(item => item.id === prodToAdd.id);

  if (!itemDelLocal) {
    const prod = {
      ...prodToAdd,
      soldCount: 1,
    };
    localStorage.setItem('carrito', JSON.stringify([...lsCarritoData, prod]));
    return;
  }

  const prod = {
    ...itemDelLocal,
    soldCount: itemDelLocal.soldCount + 1,
  };

  let filteredCart = lsCarritoData.filter(item => item.id !== prodToAdd.id);

  localStorage.removeItem('carrito');
  localStorage.setItem('carrito', JSON.stringify([...filteredCart, prod]));
};
