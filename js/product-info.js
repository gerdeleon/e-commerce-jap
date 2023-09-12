                                                    // + Info del Producto

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
  
  

                        // Mostrar comentarios


const setProduct = localStorage.getItem("setProduct"); 
// Convierte el valor en un número, ya que parece ser el ID del producto
const productId = parseInt(setProduct);

// URL del JSON con los comentarios
const jsonUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`; 

// Función para actualizar el contenido en el HTML
function agregarComentario(comentario) {
  const comentarioDiv = document.createElement("div");
  comentarioDiv.classList.add("card-body");

  const descripcionP = document.createElement("p");
  descripcionP.innerHTML = `<strong>Usuario:</strong> ${comentario.user}`;
  comentarioDiv.appendChild(descripcionP);
  descripcionP.classList.add("card-header");

  const puntuacionP = document.createElement("p");
  puntuacionP.innerHTML = `<strong>Comentario:</strong> ${comentario.description}`;
  comentarioDiv.appendChild(puntuacionP);
  puntuacionP.classList.add("card-body");

  const usuarioP = document.createElement("p");
  usuarioP.innerHTML = `<strong>Puntuacion:</strong> ${comentario.score}</div>`;
  comentarioDiv.appendChild(usuarioP);
  usuarioP.classList.add("card-body");

  const fechaHoraP = document.createElement("p");
  fechaHoraP.innerHTML = `<strong>Fecha y Hora:</strong> ${comentario.dateTime} <br> <br>`;
  comentarioDiv.appendChild(fechaHoraP);
  fechaHoraP.classList.add("card-body");

  

  document.getElementById("comentario").appendChild(comentarioDiv);
}

// Realiza una solicitud HTTP para obtener el JSON
fetch(jsonUrl)
.then(response => response.json())
.then(data => {
  // Itera a través de los comentarios y agrégalos al HTML
  data.forEach(comentario => {
    agregarComentario(comentario);
  });
})
.catch(error => {
  console.error("Error al cargar el JSON:", error);
  });
});


