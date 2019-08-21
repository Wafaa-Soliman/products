var searchInput       = document.getElementById("searchInput");
var currentIndex = 0;
var productNameInp    = document.getElementById("productName");
var productPriceInp   = document.getElementById("productPrice");
var productCompanyInp = document.getElementById("productCompany");
var productDescInp    = document.getElementById("productDesc");
var addBtn            = document.getElementById("addBtn");
var searchRow         = document.getElementById("searchRow");
var productsContainer;

if(localStorage.getItem("productsContainer") == null){
  productsContainer = [];
}else{
  productsContainer = JSON.parse(localStorage.getItem("productsContainer"));
  displayData();
}

addBtn.onclick = function(){
  if(addBtn.innerHTML == "Add product"){
    addProduct();
    displayData();
    clearData();
  }else {
    updateProduct();
  }
}

function addProduct(){
  var product = {
    name:productNameInp.value,
    price:productPriceInp.value,
    company:productCompanyInp.value,
    desc:productDescInp.value
  }
  if(productNameInp.value=="" && productPriceInp.value=="" && productCompanyInp.value=="" && productDescInp.value==""){

  }else {
      productsContainer.push(product);
      localStorage.setItem("productsContainer", JSON.stringify(productsContainer));
  }
}

function displayData(){
  var showingProducts = "";
  for(var i =0; i<productsContainer.length; i++){
    showingProducts += `<div class="col-md-3 mb-5 border border-white rounded">
        <div class="product">
          <h3>`+productsContainer[i].name+`</h3>
          <p class="text-muted">`+productsContainer[i].desc+`</p>
          <p class="text-info">`+productsContainer[i].company+`</p>
          <p class="text-danger">`+productsContainer[i].price+`</p>
          <button class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button>
          <button class="btn btn-secondary" onclick="setForm(`+i+`)">Update</button>
        </div>
      </div>`
  }
  document.getElementById("rowData").innerHTML = showingProducts;
}
 function clearData(){
   var inputs = document.getElementsByClassName("form-control");
   for(var i = 0; i<inputs.length; i++){
     inputs[i].value = "";
   }
 }

function deleteProduct(id){
  productsContainer.splice(id, 1);
  localStorage.setItem("productsContainer", JSON.stringify(productsContainer));
  displayData()
}

searchInput.onkeyup = function(){
  searchProducts(searchInput.value);
}

function searchProducts(term){
  var searchCols = "";
  for(var i = 0; i < productsContainer.length; i++){
    if(productsContainer[i].name.toLowerCase().includes(term) || productsContainer[i].name.includes(term)){
      searchCols +=  `<div class="col-md-3 mb-5 border border-white rounded">
          <div class="product">
            <h3>`+productsContainer[i].name+`</h3>
            <p class="text-muted">`+productsContainer[i].desc+`</p>
            <p class="text-info">`+productsContainer[i].company+`</p>
            <p class="text-danger">`+productsContainer[i].price+`</p>
            <button class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button>
          </div>
        </div>`
    }
    searchRow.innerHTML = searchCols;
  }
}

function setForm(i){
  productNameInp.value = productsContainer[i].name;
  productCompanyInp.value = productsContainer[i].company;
  productPriceInp.value = productsContainer[i].price;
  productDescInp.value = productsContainer[i].desc;

  addBtn.innerHTML = "Update product";

  currentIndex = i;
}

function updateProduct(){
  productsContainer[currentIndex].name = productNameInp.value;
  productsContainer[currentIndex].price = productPriceInp.value;
  productsContainer[currentIndex].company = productCompanyInp.value;
  productsContainer[currentIndex].desc = productDescInp.value;

  localStorage.setItem("productsContainer", JSON.stringify(productsContainer));
  productsContainer = JSON.parse(localStorage.getItem("productsContainer"));
  displayData();
  clearData();
  addBtn.innerHTML = "Add product";
}
