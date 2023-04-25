class ProductManager  {
  constructor() {
    this.products = [];
    this.id = 1;
    const productsString = fs.readFileSync("product.json", "utf-8");
    const products = JSON.parse(productsString);
    this.products = products;
  }

  addProduct(product) {

  let validatecode = this.products.some((p) => p.code === product.code);
  
  if(validatecode){
    return "This code already exists";
  }
  if (!product.title || !product.description || !product.price || !product.thumbail || !product.code || !product.stock){
    return "Fields missing";
  }

 let  prod = {...product, id: this.id}

  this.products.push(prod);
  const productsString = JSON.stringify(this.products);
  fs.writeFileSync("product.json", productsString);
  this.id++;
  
  return "Product added";
 
  };

  updateProduct(){
  let  updateId = this.products.map((p) => --p.stock);{
    if(updateId){
      
      return this.products;
              
    }
 
    const productsString = JSON.stringify(this.products);
    fs.writeFileSync("product.json", productsString);
  }  
  };
  


  deleteProduct(id){
   let removeId = this.products.filter((p) => p.id === id);
   
  
   const productsString = JSON.stringify(this.products);
   fs.writeFileSync("product.json", productsString);
   return removeId;
  }
 
  getProduct(){
    
  return this.products;
  }

   getProductByid(id) {
    let foundId = this.products.find((p) => p.id === id);
 
    if (!foundId){
      return "Not found"
    }
    return foundId;
  
  }
 
}

const fs = require("fs");

const product= {
  title: "Taza",
  description: " De cerámica",
  price: 2000,
  thumbail: "https://",
  code: 13265,
  stock: 20
}; 
const product2={
  title: "Vaso térmico",
  description: "Frío/calor ",
  price: 3500,
  thumbail: "https://",
  code: 14278,
  stock: 20
}
const productManager = new ProductManager();
console.log(productManager.addProduct(product));
console.log(productManager.addProduct(product2));
console.log(productManager.getProduct());
console.log(productManager.updateProduct(product));
console.log(productManager.deleteProduct(product2));
console.log(productManager.getProductByid(13));
 
 
 
 