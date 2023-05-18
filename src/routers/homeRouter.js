import express from "express";
import ProductManager from "../products.json";
const  productManager = new ProductManager();
export const homeRouter = express.Router();

homeRouter.get("/", async (req, res) => {
    try{
        const products = await productManager.getProduct();
        return res.render("home", {products: products});
    }catch (err) {
        res.status(err.status || 500).json({
          success:"false",
          message: "error",
          payload: {},
        });
      }
  
  
});

export default homeRouter;