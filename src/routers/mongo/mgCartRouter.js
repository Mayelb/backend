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

 
Router.put("/:idCart/products/:idProduct", async (req, res) => {
  try {
    const cart = await mgdb.getOne(req.params.idCart);
    const product = await mgdbProducts.getOne(req.params.idProduct);

    if (cart && product) {
      const cartUpdated = await mgdb.addProductos(cart, product);
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

Router.delete("/:id", async(req,res)=>{
  try{
    const id = req.params.id;
    const productDelete = await mgdb.delete(id);
    res.status(200).json({
      status:"success",
      payload:  productDelete,
    }); 
  }catch(err){
    res.status(err.status || 500).json({
      status:"error",
      payload:err.message,
    });
  }
});

export default Router;