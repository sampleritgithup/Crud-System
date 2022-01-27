const productName = document.getElementById("productName")
const productPrice = document.getElementById("productPrice")
const productCategory = document.getElementById("productCategory")
const productDescription = document.getElementById("productDescription")
const addingBtn = document.getElementById("addingBtn")
const searchInput = document.getElementById("search-text")
const tableBody = document.getElementById("tableBody")
const tableContainer = document.querySelector(".table-responsive")
const clearBtn = document.querySelector(".clear-btn")
let productList 

let updateID = Number("")
let updateFlag = false


window.addEventListener("load",setupItems)
addingBtn.addEventListener("click",addProduct)
clearBtn.addEventListener("click",clearItems)

//Add New Product:
function addProduct(){

    if(validateProductName() && validateProductPrice && validateProductCategory && validateProductDescription){
        var product = {
            name : productName.value,
            price : productPrice.value,
            category: productCategory.value,
            description: productDescription.value
        }
        if(!updateFlag){
            productList.push(product)
            tableContainer.classList.add("show-container")    
        displayProduct()
        addToLocalStorage()
        resetToDeafult()
        }else if(updateFlag){
            productList.splice(updateID ,1,product)
            displayProduct()
            localStorage.setItem("list",JSON.stringify(productList))
            resetToDeafult()
        }
    }



}

function displayProduct(){
    let item = productList.map(function(item,index){
        return `<tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.category}</td>
                    <td>${item.description}</td>
                    <td><button   data-id=${index} class="edit-btn"><i class="fas fa-edit"></i></button></td>
                    <td><button  data-id=${index}  class=" delete-btn"><i class="fas fa-trash"></i></button></td>
                </tr>`
    }).join("")

    
    tableBody.innerHTML = item
     const deleteBtn = document.querySelectorAll(".delete-btn")
    deleteBtn.forEach(function(btn){
        btn.addEventListener("click",function(){
           deleteItem(btn.dataset.id)
        })
     })
    const UpdateBtn = document.querySelectorAll(".edit-btn")
    UpdateBtn.forEach(function(btn){
         btn.addEventListener("click",function(){
                updateItem(this.dataset.id)
         })
      })
}

function clearItems(){
   productList = [];
   displayProduct()
   localStorage.removeItem("list")
    tableContainer.classList.remove("show-container")

}

function resetToDeafult(){
    let inputs = document.querySelectorAll("input")
    inputs.forEach(function(input){  
        input.value = ""
    })
    productDescription.value = ""
    updateID 
    updateFlag = false
    addingBtn.innerHTML = "Add Product"
}


function deleteItem(index){
    productList.splice(index,1) 
    displayProduct()
    if(tableBody.children.length == 0){
        tableContainer.classList.remove("show-container")
    }
    localStorage.setItem("list",JSON.stringify(productList))
    resetToDeafult()
}

function updateItem(index){
    updateFlag = true
    addingBtn.innerHTML = "Update Product"
    updateID = Number(index)
    console.log(updateID);
    productName.value = productList[updateID].name 
    productPrice.value = productList[updateID].price 
    productDescription.value = productList[updateID].description 
    productCategory.value = productList[updateID].category
}

//Getting List & checking is there products or not -- from storage:
function getLocalStorage(){
    return localStorage.getItem("list")?   JSON.parse(localStorage.getItem("list")):  []
}

// function that Display list on loading the page-- from storage:
function setupItems(){
    productList = getLocalStorage()
    if(productList.length > 0 ){
        tableContainer.classList.add("show-container")   
    }else{
        tableContainer.classList.remove("show-container")   
    }
    
    displayProduct()
}
// function that add list on local storage:
function addToLocalStorage(){
    localStorage.setItem("list",JSON.stringify(productList))
}

searchInput.addEventListener("keyup",searchForInput)
function searchForInput(){
    let searchVlaue = searchInput.value
    
    let temp = ""

    for(let i = 0 ; i < productList.length; i++){
        if(productList[i].name.toLowerCase().includes(searchVlaue.toLowerCase())){
            temp += `<tr>
            <td>${i + 1}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].description}</td>
            <td><button   data-id=${i} class="edit-btn"><i class="fas fa-edit"></i></button></td>
            <td><button  data-id=${i}  class=" delete-btn"><i class="fas fa-trash"></i></button></td>
        </tr>

            `
        }
    }

    tableBody.innerHTML = temp
}

// 1 -- Validate Product Name Function:
function validateProductName() {

    var regex = /^[A-Z][a-z A-z 0-9]{2,}$/;
  
    if (regex.test(productName.value) == true) {
    
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
  
        PNameAlert.classList.add("d-none");
        PNameAlert.classList.remove("d-block");
  
        
  
        return true; 
  
    } else {
      productName.classList.add("is-invalid");
      productName.classList.remove("is-valid");
  
      PNameAlert.classList.add("d-block");
      PNameAlert.classList.remove("d-none");
  
      addBtn.disabled = true;
  
      return false;
    }
  };
  
  //Check Duplicated Product Name
  function checkDuplicatedNames() {
  
    for(var i = 0; i < productList.length; i++)
        {
          if(productName.value == productList[i].name) 
          {
            productName.classList.add("is-invalid");
            productName.classList.remove("is-valid");
  
            PNameAlert.classList.add("d-block");
            PNameAlert.classList.remove("d-none");
  
            PNameAlert.innerHTML = "Product Name Already Exists";
            
    
            
          } 
        }

  };
  
  productName.addEventListener("keyup", validateProductName);
  productName.addEventListener("blur", checkDuplicatedNames);
  
  
  // 2 -- Validate Product Category Function:
  function validateProductCategory() {
  
    var regex = /^[a-z A-Z 0-9]{5,}$/;
  
    if (regex.test(productCategory.value) == true) {
  
      productCategory.classList.add("is-valid");
      productCategory.classList.remove("is-invalid");
  
      PCategoryAlert.classList.add("d-none");
      PCategoryAlert.classList.remove("d-block");
  
      
  
      return true;
  
    } else {
      productCategory.classList.add("is-invalid");
      productCategory.classList.remove("is-valid");
  
      PCategoryAlert.classList.add("d-block");
      PCategoryAlert.classList.remove("d-none");
  
      
  
      return false;
    }
  };
  
  productCategory.addEventListener("keyup", validateProductCategory);
  
  
  // 3 -- Validate Product Price Function:
  function validateProductPrice() {
  
    var regex = /^([1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|10000)$/;
  
    if (regex.test(productPrice.value) == true) {
  
      productPrice.classList.add("is-valid");
      productPrice.classList.remove("is-invalid");
  
      PPriceAlert.classList.add("d-none");
      PPriceAlert.classList.remove("d-block");
  
      
  
      return true;
  
    } else {
      productPrice.classList.add("is-invalid");
      productPrice.classList.remove("is-valid");
  
      PPriceAlert.classList.add("d-block");
      PPriceAlert.classList.remove("d-none");
  
      
  
      return false;
    }
  };
  
  productPrice.addEventListener("keyup", validateProductPrice);
  
  
  // 4 -- Validate Product Description:
  function validateProductDescription() {
  
    var regex = /^[a-z A-Z 0-9]{3,}$/;
  
    if (regex.test(productDescription.value) == true) {
  
      productDescription.classList.add("is-valid");
      productDescription.classList.remove("is-invalid");
  
      PDescriptionAlert.classList.add("d-none");
      PDescriptionAlert.classList.remove("d-block");
  
      
  
      return true;
  
    } else {
      productDescription.classList.add("is-invalid");
      productDescription.classList.remove("is-valid");
  
      PDescriptionAlert.classList.add("d-block");
      PDescriptionAlert.classList.remove("d-none");
  
      
  
      return false;
    }
  };
  
  productDescription.addEventListener("keyup", validateProductDescription);







