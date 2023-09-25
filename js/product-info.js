// + Info del Producto

const product = localStorage.getItem('setProduct');

document.addEventListener("DOMContentLoaded", function () {
                                                    
  fetch(`https://japceibal.github.io/emercado-api/products/${product}.json`)   
  .then(response => response.json())
  .then(product => {
    const productDetailsElement = document.getElementById('product-details')
    
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
     </div>`;
        
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
     const usuarioP = document.createElement("p");
     usuarioP.innerHTML = `<strong>Usuario:</strong> ${comentario.user}`;
     comentarioDiv.appendChild(usuarioP);
    usuarioP.classList.add("card-header");
                                                    
    const comentarioP = document.createElement("p");
    comentarioP.innerHTML = `<strong>Comentario:</strong> ${comentario.description}`;
    comentarioDiv.appendChild(comentarioP);
    comentarioP.classList.add("card-body");
                                                    
    const puntuacionP = document.createElement("p");
    puntuacionP.innerHTML = `<strong>Puntuacion:</strong> ${obtenerEstrellas(comentario.score)}</div>`;
    comentarioDiv.appendChild(puntuacionP);
    puntuacionP.classList.add("card-body");
                                                    
                                                    
                                                      
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
                                                    
                                                    
   // Estrellas Comentarios Cargados desde el Json
   function obtenerEstrellas(puntuacion) {
   const estrellas = '★'.repeat(puntuacion); // Crea una cadena de estrellas basada en la puntuación
   const estrellasVacias = '☆'.repeat(5 - puntuacion); // Crea una cadena de estrellas vacías para completar 5 estrellas
   const estrellasHTML = `<span style="color: orange">${estrellas}</span><span>${estrellasVacias}</span>`;
   return estrellasHTML
   }
                //Probando Relacionadas                                     
                                         
  fetch(`https://japceibal.github.io/emercado-api/products/${product}.json`)   
  .then(response => response.json())
  .then(product => {
    const productRelacionadosElement = document.getElementById('relProds')
    
    
    productRelacionadosElement.innerHTML = `
    <div>
    
    <h2>${product.relatedProducts[0].name}</h2>
    <img src="img/prod${product.relatedProducts[0].id}_1.jpg" alt="product image" class="img-thumbnail" onclick="redirectToProduct(${product.relatedProducts[0].id})">
    </div>
    
    
    <h2>${product.relatedProducts[1].name}</h2>
    <img src="img/prod${product.relatedProducts[1].id}_1.jpg" alt="product image" class="img-thumbnail" onclick="redirectToProduct(${product.relatedProducts[0].id})">
    </div>
    </div>
  `;
  })
  .catch(error => console.error('Error al obtener información del producto:', error));
                                                        
   });

   function redirectToProduct(product) {
  // Construye la URL del producto utilizando el ID
  const productUrl = `https://japceibal.github.io/emercado-api/products/${product}.json`;
  
  // Redirige a la nueva página
  window.location.href = productUrl;
}
