const Router = require("express");
const Router = Router.Router();
const CartManager = require ("../cartManager.js");
const path = "/src/carts.json";
const CartManager = new CartManager(path);

cartRouter.post("/", async(req, res)  => {
    try{
        const newCart = req.body;
        const  addedCart = await CartManager.addCart(newCart);
        if ( addedCart){
            return res.status(201).json({
                status: "success",
                payload: addedCart,
              });
        }
        res.json({
            status: "error",
          });
    }catch (err) {
        res.status(err.status || 500).json({
          status: "success",
          payload: err.message,
        });
      }
});

cartRouter.get("/", async(req, res) => {
    try{
        const allCarts = await CartManager.read();
        if(allCarts){
            return res.status(201).json({
                status: "success",
                payload: allCarts,
              });
        }
        res.json({
            status: "error",
            payload: [],
          });
    }catch (err) {
        res.status(err.status || 500).json({
          status: "success",
          payload: err.message,
        });
      }
});

cartRouter.get("/:id/products", async(req, res) => {
    try{
        const idCart = req.params.idCart;
        const allCarts = await CartManager.read();
        const cart2 = allCarts.find((c)=>  c.id == idCart);
        if(cart2){
            return res.status(201).json({
                status: "success",
                payload: cart2.products,
              })      
        }
        res.status(400).json({
            status: "error",
            message: "No cart found by id" + idCart,
            payload: {},
        });
     }catch(err){
        res.status(err.status || 500).json({
            status: "success",
            payload: err.message,
          });
     }
});
cartRouter.put("/:idCart/products/:idProduct", async(req, res)  =>{
    try{
        const idCart = req.params.idCart;
        const idProduct = req.params.idProduct;
        const updateCart = await CartManager.addProductToCart(idCart, idProduct);
        if(updateCart){
            return res.status(201).json({
                status: "success",
                payload: updateCart,
              })
        }
        res.status(400).json({
            status: "error",
            message: "No add product",
            payload: {},
        });
    }catch(err){
        res.status(err.status || 500).json({
            status: "success",
            payload: err.message,
          });
     }
});

module.exports = cartRouter;