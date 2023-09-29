// Función para verificar la sesión del usuario al cargar la página.
window.onload = function () {
    if (!verificarSesion()) {
        window.location.href = "login.html";
    }
};

// Obtiene el nombre de usuario almacenado y lo muestra en la página.
const storedUsername = localStorage.getItem('usuario');
const usernameDisplay = document.getElementById('usuario-prueba');
if (storedUsername) {
    usernameDisplay.textContent = storedUsername;
}

// Obtiene el ID de categoría y construye la URL de la API.
let catID = localStorage.getItem("catID");
let URL_CAT = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

// Constantes para criterios de ordenamiento.
const ORDER_ASC_BY_PRICE = "PriceAsc";
const ORDER_DESC_BY_PRICE = "PriceDesc";
const ORDER_DESC_BY_SOLD_COUNT = "Relevance";

// Variables globales para administrar categorías y filtros.
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

// Función que se ejecuta cuando el contenido HTML está listo.
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene datos de productos de la API y realiza acciones relacionadas.
    getJSONData(URL_CAT).then(function (resultObj) {
        filterEvents();
        currentCategoriesArray = resultObj.products;
        let text = `Veras aqui todos los productos de la categoria ${resultObj.catName}`;
        showCategoriesList();
    });

    // Función asincrónica para obtener datos en formato JSON.
    async function getJSONData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    // Configura evento para limpiar filtros de rango.
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        minCount = undefined;
        maxCount = undefined;
        showCategoriesList();
    });

    // Configura evento para aplicar filtros de rango.
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showCategoriesList();
    });
});

// Función para establecer el ID de producto en el almacenamiento local y redirigir a la página de información del producto.
function setProductID(id) {
    localStorage.setItem("setProduct", id);
    window.location = "product-info.html";
}

// Función para mostrar la lista de categorías de productos en la página.
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
                                    <h4>${category.name} - ${category.currency} ${category.cost}</h4>
                                    <p>${category.description}</p>
                                </div>
                                <small class="text">${category.soldCount} vendidos</small>
                            </div>
                            <button class="btn btn-primary" onclick="setProductID(${category.id})">Más información</button>
                        </div>
                    </div>
                </div>`;
        }
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

// Función para ordenar y mostrar las categorías de productos.
function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;
    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    showCategoriesList();
}

// Función para ordenar un array de categorías según un criterio específico.
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

// Función para establecer el ID de categoría en el almacenamiento local y redirigir a la página de productos relacionados con esa categoría.
function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html";
}

// Variables para contenedor de productos y array de productos actuales.
const productosContainer = document.getElementById("cat-list-container");
let currentProductsArray = [];

// Obtener datos de productos y renderizarlos en la página.
fetch(URL_CAT)
    .then(response => response.json())
    .then(data => {
        currentProductsArray = data.products;
        renderProducts(currentProductsArray);
    })
    .catch(error => console.error("Error fetching products:", error));

// Función para renderizar productos en la página.
function renderProducts(products) {
    productosContainer.innerHTML = "";
    products.forEach(product => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("list-group-item", "list-group-item-action", "cursor-active");

        const card = document.createElement("div");
        card.classList.add("card", "list-group-item", "list-group-item-action", "d-flex", "flex-row");

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("col-3");

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.classList.add("img-thumbnail");

        imgDiv.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const productName = document.createElement("h4");
        productName.classList.add("card-title", "mb-1");
        productName.textContent = `${product.name} - ${product.cost} ${product.currency}`;

        const productDescription = document.createElement("p");
        productDescription.classList.add("card-description", "mb-1");
        productDescription.textContent = product.description;

        const productPrice = document.createElement("p");
        productPrice.classList.add("card-text");

        cardBody.appendChild(productName);
        cardBody.appendChild(productDescription);
        cardBody.appendChild(productPrice);

        card.appendChild(imgDiv);
        card.appendChild(cardBody);

        productoDiv.appendChild(card);

        productosContainer.appendChild(productoDiv);
    });
}

// Configura evento de búsqueda en tiempo real para filtrar productos.
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

// Configura eventos de ordenamiento de productos.
function filterEvents() {
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_SOLD_COUNT);
    });
}