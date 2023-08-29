let catID = localStorage.getItem("catID");
let url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
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
        
        getJSONData(url).then(function(resultObj){
            if (resultObj.status === "ok"){
                // currentCategoriesArray = resultObj.data
                currentCategoriesArray = resultObj.data.products
                let text = `Veras aqui todos los productos de la categoria ${resultObj.data.catName}`;
                // document.getElementById("titulo").innerHTML = text;
                showCategoriesList()
                sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data.products);
            }
        });
    
        document.getElementById("sortAsc").addEventListener("click", function(){
            sortAndShowCategories(ORDER_ASC_BY_NAME);
        });
    
        document.getElementById("sortDesc").addEventListener("click", function(){
            sortAndShowCategories(ORDER_DESC_BY_NAME);
        });
    
        document.getElementById("sortByCount").addEventListener("click", function(){
            sortAndShowCategories(ORDER_BY_PROD_COUNT);
        });
    
        document.getElementById("clearRangeFilter").addEventListener("click", function(){
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";
    
            minCount = undefined;
            maxCount = undefined;
    
            showCategoriesList();
        });
    
        document.getElementById("rangeFilterCount").addEventListener("click", function(){
            //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
            //de productos por categoría.
            minCount = document.getElementById("rangeFilterCountMin").value;
            maxCount = document.getElementById("rangeFilterCountMax").value;
    
            if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
                minCount = parseInt(minCount);
            }
            else{
                minCount = undefined;
            }
    
            if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
                maxCount = parseInt(maxCount);
            }
            else{
                maxCount = undefined;
            }
    
            showCategoriesList();
        });

     
})
 

function showCategoriesList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

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

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;
    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }
    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    //Muestro las categorías ordenadas
    showCategoriesList();
}

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}
