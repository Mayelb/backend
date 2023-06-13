import express from "express";
import Router from "express";
import Router from Router.Router();
import ProductManager from "../products.json";
const  productManager = new ProductManager();
export const realtimeProductRouter = express.Router();

Router.get("/", async (req, res) => {
    try{
        const products = await productManager.getProduct();
        return res.render("realTimeProduct", {products: products});
    }catch (err) {
        res.status(err.status || 500).json({
          success:"false",
          message: "error",
          payload: {},
        });
      }
  
  
});

export default Router;