const selectedProduct = localStorage.getItem('category.id');

  fetch(`https://japceibal.github.io/emercado-api/products/${selectedProduct}.json`)
  .then (response => response.json())
  .then (data => {
  const productDetailsElement = document.getElementByld('product-details');
  
  productDetailsElement.innerHTML = `
  <h2>${data.nombre}</h2>
  <p›Precio: ${data.precio}</p>
  <p>Descripción: ${data.descripcion}</p>

  `;
})
.catch(error => console.error('Error al obtener información del producto:', error));








/*
    if (productId) {
      // Utiliza la ID del producto para cargar la información del producto
      let productURL = `https://japceibal.github.io/emercado-api/cats_products/${productId}.json`;
      getJSONData(productURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          currentProductInfo = resultObj.data;
          MostrarInfo();
        }
      });

const prodinfo = document.getElementById("info-prod"); // seteo constante que corresponde al div de ese ID, donde dibujaré la tabla
var product = "https://japceibal.github.io/emercado-api/products/";
const commentsinfo = document.getElementById("comments"); //seteo constante que corresponde al div de ese ID que dibujaré los comentarios
var comments = "https://japceibal.github.io/emercado-api/products_comments/";
const imagenes = document.getElementById("imagenes"); //seteo constante que corresponde al div de ese ID que dibujaré las imagenes
const relaProd = document.getElementById("relaProd");
let currentProductInfo = []; //lista de la informacion de los productos (vacia)
let currentCommentsInfo = []; //lista de los comentarios de los productos (vacia)




function setCatID(id) {
  localStorage.setItem("catIDinfo", id);
};

document.addEventListener("DOMContentLoaded", function (e) { //funcion que escucha eventos, cuando hago click en cierto div, obtiene mediante localstorage la ID del producto
  let productinfo = localStorage.getItem("catIDinfo"); //obtengo por id mediante storage
  let url = product + productinfo + ".json"; // concatené para evitar los if
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      currentProductInfo = resultObj.data  //currentProductInfo es la data del result.Obj
      MostrarInfo();
      
    }
  });
  LoadComments();
  
})};

*/

/*document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
    // Utiliza la ID del producto para cargar la información del producto
    let productURL = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
    getJSONData(productURL).then(function (resultObj) {
      if (resultObj.status === "ok") {
        currentProductInfo = resultObj.data;
        MostrarInfo();
      }
    });

    const prodinfo = document.getElementById("info-prod"); // seteo constante que corresponde al div de ese ID, donde dibujaré la tabla
    var product = "https://japceibal.github.io/emercado-api/products/";
    const commentsinfo = document.getElementById("comments"); //seteo constante que corresponde al div de ese ID que dibujaré los comentarios
    var comments = "https://japceibal.github.io/emercado-api/products_comments/";
    const imagenes = document.getElementById("imagenes"); //seteo constante que corresponde al div de ese ID que dibujaré las imagenes
    const relaProd = document.getElementById("relaProd");
    let currentProductInfo = []; //lista de la información de los productos (vacia)
    let currentCommentsInfo = []; //lista de los comentarios de los productos (vacia)

    function setCatID(id) {
      localStorage.setItem("catIDinfo", id);
    }

    // LoadComments() // Supongo que esta función carga los comentarios, asegúrate de llamarla en el lugar correcto
  }
});*/