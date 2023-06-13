import express from "express";
const fs = require("fs");
import productManager from "./productManager";
 

class CartManager {
    constructor(){
        this.path = "/src/products.json";
    }

    async getCart() {
        try {
          if (fs.existsSync(this.path)) {
            const allCart = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(allCart);
          }
          await fs.promises.readFile(this.path, JSON.stringify([]));
          return [];
        } catch (error) {
          throw new Error(error.message);
        }
      }
    async addCart(){
        const cart = await this.getCart();
        const prodId = await this.getId(cart);
        const newCart = {
            id: prodId,
            products: [],
        }
        cart.push(newCart);
        const productsString = JSON.stringify(cart);
        await fs.promises.writeFile(this.path, productsString);
        return newCart;
    };
  
   async addProductToCart(idCart, idProduct){
    const cart = await this.getCart();
    const UpdateCart = cart.find((c) => c.id == idCart);
    if(!UpdateCart){
        return{
            status:"error",
            message:" No cart found by id:" + idCart,
            payload: {},
        };
    }
    const allProducts = await productManager.read();
    const addToProduct = allProducts.find((product) => product.id == idProduct);

    if (!addToProduct) {
        return {
            status: "error",
            message:"Not prodcut found by id:" + idProduct,
            payload: {},
        };
    }
    const productInCart = await this.finProductIncart(
        UpdateCart,
        addToProduct
    );

    if(productInCart){
        const index = UpdateCart.products.indexOf(productInCart);
        const productData = {
            id: productInCart.id,
            quantity:productInCart.quantity + 1,
        };
        UpdateCart.products[index] = productData;
        const indexCart = cart.indexOf(UpdateCart);
        cart[indexCart] = UpdateCart;
        const productsString = JSON.stringify(cart);
        await fs.promises.writeFile(this.path, productsString);
        return UpdateCart;
    }
    const productData ={
        id: addToProduct.id,
        quantity: 1,
    };
    UpdateCart.products.push(productData);
    const index = cart.indexOf(UpdateCart);
    cart[index] = UpdateCart;
    const productsString = JSON.stringify(cart);
    await fs.promises.writeFile(this.path, productsString);
    return UpdateCart;
   }

   async finProductIncart(UpdateCart, idProduct){
    return UpdateCart.products.find((product) => product.id ==idProduct);
   }

   async getId(cart){
    let id2 =0;
    const allId = cart.map((product) => product.id);
    allId.filter((id) => typeof id === "number");
    if(cart.lenth > 0){
        allId = Math.max(...allId);
    }
    return id2 + 1;
   }
}

const CartManager = new CartManager();
const asynFn = async () => {
  console.log(await CartManager.addCart(product));
 
};

export default CartManager;