import { Router } from "express";
const router = Router();
import ProductManager from "../../daos/helpers/productManager";
const path = "../../file/products.json"
const  data = new ProductManager(path);
 

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