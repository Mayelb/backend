import Router from "express";
import Router from Router.Router();
import ProductManager from "../products.json";
const  productManager = new ProductManager();

productRouter.get(`/products`, async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProduct();
    if (limit) {
      res.status(200).json({
        status: "success",
        playload: products.slice(0, limit),
      });
    } else {
      res.status(200).json({
        status: "success",
        playload: products,
      });
    }
  } catch (err) {
    res.status(err.status || 500).json({
      status: "error",
      payload: err.message,
    });
  }
});

productRouter.get(`/products/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productManager.getProductByid(parseInt(id));
    if (!product) {
      return res.status(404).json({
        status: "success",
        message: "Product not found",
        payload: {},
      });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(err.status || 500).json({
      status: "error",
      payload: err.message,
    });
  }
});

productRouter.post(`/products`, validateCode, async (req, res) => {
  try {
    const newProdduct = req.body;
    const addedProduct = await productManager.addedProduct(newProdduct);
    if (addedProduct) {
      return res.status(201).json({
        status: "success",
        payload: addedProduct,
      });
    }
    res.json({
      status: "error",
    });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "success",
      payload: err.message,
    });
  }
});

productRouter.put(`/products`, updateId, async(req, res)  => {
  try{
    const newProdduct = req.body;
    const productUpdate = await productManager.updateProduct(newProdduct);
    res.status(200).json({
      status:"success",
      payload: productUpdate,
    });
  }catch(err){
    res.status(err.status || 500).json({
      status:"error",
      payload:err.message,
    });
  }
});
productRouter.delete("products/:id", async(req,res)=>{
  try{
    const id = req.params.id;
    const productDelete = await productManager.deleteProduct(id);
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

export default  productsRouter;
