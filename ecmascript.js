class ProductManager  {
  constructor() {

    this.products = [];
    this.id = 1;

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
  this.id++;
  return "Product added";
 
  };

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

const product = {
  title: "Taza",
  description: " De cerámica",
  price: 2000,
  thumbail: "https://",
  code: 13265,
  stock: 20,
};
const product2 = {
  title: "Vaso térmico",
  description: "Frío/calor ",
  price: 3500,
  thumbail: "https://",
  code: 14278,
  stock: 20,
};
const productManager = new ProductManager();
console.log(productManager.addProduct(product));
console.log(productManager.addProduct(product2));
console.log(productManager.getProduct());
console.log(productManager.getProductByid(13));
 
 
 
 