document.addEventListener("DOMContentLoaded", function () {
    const hasRedirected = localStorage.getItem("hasRedirected");
  
    if (!hasRedirected) {
      localStorage.setItem("hasRedirected", "true");
      window.location.href = "login.html";
    } 
  
    document.getElementById("autos").addEventListener("click", function () {
      localStorage.setItem("catID", 101);
      window.location = "products.html";
    });
    document.getElementById("juguetes").addEventListener("click", function () {
      localStorage.setItem("catID", 102);
      window.location = "products.html";
    });
    document.getElementById("muebles").addEventListener("click", function () {
      localStorage.setItem("catID", 103);
      window.location = "products.html";
    });
  });