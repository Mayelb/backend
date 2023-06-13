import express from "express";
import { Router } from "express";
import Router from Router.Router();
import ProductManager from "../file/products.json";
const  data = new ProductManager();
export const mgHomeRouterr = express.Router();

Router.get("/", async (req, res) => {
    try{
        const products = await data.getProduct();
        return res.render("home", {products: products});
    }catch (err) {
        res.status(err.status || 500).json({
          success:"false",
          message: "error",
          payload: {},
        });
      }
  
  
});

export default Router;