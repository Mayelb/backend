import { cartModel } from "./models/cartModel";

export class mongoProducts{
    
    async getAll(){
         
            const carritos = await cartModel.find({}).populate({
                path: "products",
                populate: {path: "id", model: "products"},
            });
            return carritos      
 
    }

    async getOne(id) {
        try {
          const one = await cartModel.findById(id).populate({
            path: "products",
            populate: { path: "_id", model: "products" },
          });
          return one;
        } catch (err) {
          throw new Error(err);
        }
      }

      async addProductos(cart, product) {
         
        const allProducts = cart.products;
        const productExists = allProducts.find(
          (p) => p._id._id.valueOf() == product._id.valueOf()
        );
        if (productExists) {
          productExists.quantity++;
        } else {
          cart.products.push({ _id: product._id, quantity: 1 });
        }
        const cartUpdated = await cartModel.findByIdAndUpdate(cart._id, {
          products: cart.products,
        });
        return cartUpdated;
      }
    
      async deleteProducto(carrito, productoId) {
        const productoEnCarrito = carrito.productos.find(
          (p) => p._id == productoId
        );
        if (productoEnCarrito) {
          productoEnCarrito.cantidad > 1
            ? productoEnCarrito.cantidad--
            : (carrito.productos = carrito.productos.filter(
                (p) => p._id != productoId
              ));
        } else {
          throw new Error("the product is not in the cart");
        }
        const carritoUpdated = await cartModel.findByIdAndUpdate(
          carrito._id,
          { productos: carrito.productos }
        );
        return carritoUpdated;
      }
    }     
