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
    // Obtiene el ID de categoría almacenado en el LocalStorage
    const categoryId = localStorage.getItem("catID");

    // Genera la URL del JSON correspondiente a la categoría seleccionada
    const url = `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`;

    // fetch(url)
    //     .then((response) => response.json())
    //     .then((jsonData) => {
    //         const products = jsonData.products;
    //         currentCategoriesArray = products;
    //         showCategoriesList();     
    //     });

    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            // currentCategoriesArray = resultObj.data
            currentCategoriesArray = resultObj.data.products
            let text = `Veras aqui todos los productos de la categoria ${resultObj.data.catName}`;
            // document.getElementById("titulo").innerHTML = text;
            showCategoriesList()
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data.products);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
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
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
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

// Función que muestra los productos en el DOM

function showProducts(productsArray) {
    const productContainer = document.getElementById('productContainer');

    let template = ``;

    for (let product of productsArray) {

        template +=
            `
            <div class="col-12 col-md-4 col-xxl-3 d-flex mt-5">
                <div class="card cursor-active" >
                    <img class="card-img-top" src="${product.image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p>${product.currency} ${product.cost}</p>
                        <p class="card-text">${product.description}</p>
                        </div>
                        
                    <div class="card-footer">
                        <h6>Vendidos: ${product.soldCount}</h6>
                    </div>
                </div>
            </div>
        `;
    };

    productContainer.innerHTML = template;
}

// Funcionalidad del buscador
function searchProductEvent() {
    const buscar = document.getElementById('buscador');
    buscar.addEventListener('input', () => {
        if (buscar.value.length < 1) {
            showProducts(productsDataGlobal);
            return;
        }
        const filteredData = productsDataGlobal.filter((word) => {
            const name = word.name.toLowerCase().includes(buscar.value.toLowerCase());
            const descripcion = word.description.toLowerCase().includes(buscar.value.toLowerCase());
            return name || descripcion;
        });
        showProducts(filteredData);
    });
}

const botonBuscar = document.getElementById('boton');
botonBuscar.addEventListener('click', searchProductEvent());


/* function showProducts(products) {
    let htmlContentToAppend = "";
    const productsToDisplay = products || currentCategoriesArray;
    for (let i = 0; i < productsToDisplay.length; i++) {
        htmlContentToAppend += `
        <div class="col-12 col-md-4 col-xxl-3 d-flex mt-5">
                <div class="card cursor-active" >
                    <img class="card-img-top" src="${product.image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p>${product.currency} ${product.cost}</p>
                        <p class="card-text">${product.description}</p>
                        </div>
                        
                    <div class="card-footer">
                        <h6>Vendidos: ${product.soldCount}</h6>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
} */ 
