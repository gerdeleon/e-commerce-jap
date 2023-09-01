let catID = localStorage.getItem("catID");
let url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

const ORDER_ASC_BY_PRICE = "PriceAsc";
const ORDER_DESC_BY_PRICE = "PriceDesc";
const ORDER_DESC_BY_SOLD_COUNT = "Relevance.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

document.addEventListener("DOMContentLoaded", function () {
    const categoryId = localStorage.getItem("catID");
    const url = `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`;

    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCategoriesArray = resultObj.data.products
            let text = `Veras aqui todos los productos de la categoria ${resultObj.data.catName}`;
            showCategoriesList()
            sortAndShowCategories(ORDER_ASC_BY_PRICE, resultObj.data.products);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        minCount = undefined;
        maxCount = undefined;
        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }
        showCategoriesList();
    });
})

function showCategoriesList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {

            htmlContentToAppend += `
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="${category.image}" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                    <h4> ${category.name} - ${category.currency} ${category.cost}</h4> 
                                    <p>${category.description}</p> 
                                </div>
                                <small class="text-muted"> ${category.soldCount} vendidos</small> 
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;
    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    //Muestro las categorías ordenadas
    showCategoriesList();
}

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            let aPrice = parseFloat(a.cost);
            let bPrice = parseFloat(b.cost);
            return aPrice - bPrice;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            let aPrice = parseFloat(a.cost);
            let bPrice = parseFloat(b.cost);
            return bPrice - aPrice;
        });
    } else if (criteria === ORDER_DESC_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aRelevance = parseInt(a.soldCount);
            let bRelevance = parseInt(b.soldCount);
            return bRelevance - aRelevance;
        });
    }
    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"

}


document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("cat-list-container");
    let currentProductsArray = []; // Para almacenar la lista completa de productos

    fetch(url)
      .then(response => response.json())
      .then(data => {
        currentProductsArray = data.products; // Almacenar la lista completa de productos
        renderProducts(currentProductsArray);
      })
      .catch(error => console.error("Error fetching products:", error));

      function renderProducts(products) {
        productosContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar
        products.forEach(product => {
          const productoDiv = document.createElement("div");
          productoDiv.classList.add("list-group-item", "list-group-item-action", "cursor-active"); // Agregar clases Bootstrap
      
          const card = document.createElement("div");
          card.classList.add("card", "list-group-item", "list-group-item-action", "d-flex", "flex-row"); // Agregar clases Bootstrap para flexbox
      
          const imgDiv = document.createElement("div");
          imgDiv.classList.add("col-3");
      
          const img = document.createElement("img");
          img.src = product.image;
          img.alt = product.name;
          img.classList.add("img-thumbnail"); // Agregar clase Bootstrap para imágenes
      
          imgDiv.appendChild(img);
      
          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");
      
          const productName = document.createElement("h4");
          productName.classList.add("card-title", "mb-1"); // Agregar clase Bootstrap para título y margen inferior
          productName.textContent = product.name;
          productName.textContent = `${product.name} - ${product.cost} ${product.currency}`;
          
      
          const productDescription = document.createElement("p");
          productDescription.classList.add("card-description", "mb-1"); // Agregar clase Bootstrap para descripción y margen inferior
          productDescription.textContent = product.description;
          
      
          const productPrice = document.createElement("p");
          productPrice.classList.add("card-text");
          
          
      
          cardBody.appendChild(productName);
          cardBody.appendChild(productDescription);
          cardBody.appendChild(productPrice);
      
          card.appendChild(imgDiv); // Colocar la imagen a la izquierda
          card.appendChild(cardBody); // Colocar el contenido a la derecha
      
          productoDiv.appendChild(card);
      
          productosContainer.appendChild(productoDiv);
        });
      }
      
      
      
  
    document.addEventListener('keyup', e => {
      if (e.target.matches("#buscador")) {
        const searchValue = e.target.value.toLowerCase();
  
        if (e.key === "Escape") {
          e.target.value = "";
        }
  
        const filteredProducts = currentProductsArray.filter(product => {
          const productName = product.name.toLowerCase();
          const productDescription = product.description.toLowerCase();
          return productName.includes(searchValue) || productDescription.includes(searchValue);
        });
        
        renderProducts(filteredProducts);
      }
    });
  });