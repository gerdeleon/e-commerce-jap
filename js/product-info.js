const product = localStorage.getItem('setProduct');

document.addEventListener("DOMContentLoaded", function () {

fetch(`https://japceibal.github.io/emercado-api/products/${product}.json`)
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
      <p class="subtitulo">Imagenes Ilustrativas:</p> 
      <div class="imgStyle" id="img">
      <img src="img/prod${product.id}_1.jpg" alt="product image" class="img-thumbnail" >
      <img src="img/prod${product.id}_2.jpg" alt="product image" class="img-thumbnail" >    
      <img src="img/prod${product.id}_3.jpg" alt="product image" class="img-thumbnail" >
      <img src="img/prod${product.id}_4.jpg" alt="product image" class="img-thumbnail" >
      </div>
    `;
  })
  .catch(error => console.error('Error al obtener información del producto:', error));
  
  

})

