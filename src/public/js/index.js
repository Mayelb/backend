const socket = socketServer();
const formProduct = document.getElementById("form-product");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const inputThumbail = document.getElementById("thumbail");


socket.on("products", (productList) => {
  console.log(productList);  

  document.getElementById("productList").innerHTML = productList.map((e)=>{
    return "<th>" + e.id + "</th>" +"<td>" + e.title + e.description + e.price + e.code + e.stock + e.thumbail + "</td>";
  });
});

 

formProduct.addEventListener("submit",(e) =>{
  e.preventDefault();
  const newProduct = {
    title: inputTitle.value,
    description: inputDescription.value,
    price: inputPrice.value,
    code: inputCode.value,
    stock: inputStock.value,
    inputThumbail: inputThumbail.value,
  };
  socket.emit("new-product", newProduct);
})