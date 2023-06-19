import { classMongo } from "./classMongo";
import { cartModel } from "./models/cartModel";

export class mongoProducts extends classMongo{
    constructor(){
      super("carts",cartModel);
    }

    async getAll(){
         
            const carts = await this.baseModel.find({}).populate({
                path: "products",
                populate: {path: "id", model: "products"},
            });
            return carts      
 
    }

    async getOne(id) {
        try {
          const one = await  this.baseModel.findById(id).populate({
            path: "products",
            populate: { path: "_id", model: "products" },
          });
          return one;
        } catch (err) {
          throw new Error(err);
        }
      }

      async addProducts(cart, product) {
         
        const allProducts = cart.products;
        const productExists = allProducts.find(
          (p) => p._id._id.valueOf() == product._id.valueOf()
        );
        if (productExists) {
          productExists.quantity++;
        } else {
          cart.products.push({ _id: product._id, quantity: 1 });
        }
        const cartUpdated = await this.baseModel.findByIdAndUpdate(cart._id, {
          products: cart.products,
        });
        return cartUpdated;
      }

      async addManyProduct(cart, product, quantity) {
        const allProducts = cart.products;
        const productExists = allProducts.find(
          (p) => p._id._id.valueOf() == product._id.valueOf()
        );
        if (productExists) {
          productExists.quantity = quantity;
        } else {
          cart.products.push({ _id: product._id, quantity: quantity });
        }
        const cartUpdated = await this.baseModel.findByIdAndUpdate(cart._id, {
          products: cart.products,
        });
        return cartUpdated;
      } 

      async deleteProduct(cart, product) {
        const allProducts = cart.products;
        if (allProducts.length == 0) throw new Error("Emppty cart");
        const productExists = allProducts.find(
          (p) => p._id._id.valueOf() == product._id.valueOf()
        );
        if (productExists) {
          productExists.quantity > 1
            ? (productExists.quantity -= 1)
            : (cart.products = allProducts.filter(
                (p) => p._id._id.valueOf() != product._id.valueOf()
              ));
        } else {
          throw new Error("The product is not in the cart");
        }
        const cartUpdated = await this.baseModel.findByIdAndUpdate(cart._id, {
          products: cart.products,
        });
        return cartUpdated;
      }
    
      async updateProductsOfOneCart(cart, products) {
        const cartUpdated = await this.baseModel.findByIdAndUpdate(cart._id, {
          products: products,
        });
        return cartUpdated;
      }
    }