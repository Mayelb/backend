import { Router } from "express";
import Router from Router.Router();
import  mongoCart from "../../daos/mongo/mongoCart";
import { mongoProduct } from "../../daos/mongo/mongoProduct";

const mgdb = new mongoCart();
const mgdbProducts = new mongoProduct();

Router.post("/", async(req, res)  => {
    try{
        const  createCart = await mgdb.create();
        if ( createCart){
            return res.status(201).json({
                status: "success",
                payload: createCart,
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

Router.get("/", async(req, res) => {
    try{
        const allCarts = await mgdb.getAll();
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

Router.get("/:idCart/products", async(req, res) => {
    try{
        const idCart = req.params.idCart;
        const allCart = await mgdb.GetOne();
       
        if(allCart){
            return res.status(201).json({
                status: "success",
                payload: allCart.products,
              })      
        }
        res.status(400).json({
            status: "error",
            message: "No cart found by id" + idCart,
            payload: {},
        });
     }catch(err){
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
          });
     }
});

Router.get("/:idCart", async (req, res) => {
  try {
    const idCart = req.params.idCart;
    console.log("idCart", idCart);
    const cart = await mgdb.getOne(idCart);
    const products = cart.products;
    console.log("products", products);
   if (cart) {
     return res.render("myCart", { products })   
   }
   res.status(404).json({
    status: "error",
    message: "Sorry, no cart found by id: " + idCart,
    payload: {},
  });
      
  } catch (err) {
    res.status(err.status || 500).json({
      status: "error",
      payload: err.message,
    });
  }
});

 
Router.put("/:idCart/products/:idProduct", async (req, res) => {
  try {
    const cart = await mgdb.getOne(req.params.idCart);
    const product = await dbProducts.getOne(req.params.idProduct);
    const payload = req.body;
    
    if (payload.quantity) {
      console.log("payload.quantity", payload.quantity);

      if (payload.quantity < 0 || payload.quantity == 0)
        throw new Error(" Quantity must be greater than 0");
      if (cart && product) {
        const cartUpdated = await mgdb.addManyProduct(
          cart,
          product,
          payload.quantity
        );
        const response = await mgdb.getOne(cartUpdated._id);
        res.status(201).json({
          status: "success",
          payload: response,
        });
      } else {
        res.status(404).json({ message: "Missing data" });
      }
    } else {
      if (cart && product) {
        const cartUpdated = await mgdb.addProduct(cart, product);
        const response = await mgdb.getOne(cartUpdated._id);
        res.status(201).json({
          status: "success",
          payload: response,
        });
      } else {
        res.status(404).json({ message: "Missing data" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
});

Router.put("/:idCart", async (req, res) => {
  try {
    const cart = await mgdb.getOne(req.params.idCart);
    const payload = req.body;
    if (cart) {
      const cartUpdated = await mgdb.updateProductsOfOneCart(
        cart,
        payload.products
      );
      const response = await mgdb.getOne(cartUpdated._id);
      res.status(201).json({
        status: "success",
        payload: response,
      });
    } else {
      res.status(404).json({ message: "Missing data" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
});

Router.delete("/:idCart/products/:idProduct", async (req, res) => {
  try {
    const cart = await mgdb.getOne(req.params.idCart);
    const product = await mgdbProducts.getOne(req.params.idProduct);
    if (cart && product) {
      const cartUpdated = await db.removeProduct(cart, product);
      const response = await mgdb.getOne(cartUpdated._id);
      res.status(201).json({
        status: "success",
        payload: response,
      });
    } else {
      res.status(404).json({ message: "Missing data" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
});

Router.delete("/:idCart", async (req, res) => {
  try {
    const cart = await mgdb.getOne(req.params.idCart);
    if (cart) {
      const cartUpdated = await mgdb.emptyCart(cart);
      const response = await mgdb.getOne(cartUpdated._id);
      res.status(201).json({
        status: "success",
        payload: response,
      });
    } else {
      res.status(404).json({ message: "Missing data" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
});

export default Router;