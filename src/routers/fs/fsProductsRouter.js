import Router from "express";
import Router from Router.Router();
import ProductManager from "../file/products.json";
import multer from "multer";
import {validateCode} from "/src/middleware/validators";
const  data = new ProductManager();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
Router.use(multer({ storage }).single("thumbnail"));


Router.get(`/`, async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await data.getProduct();
    if (limit) {
      res.status(200).json({
        status: "success",
        playload: products.slice(0, limit),
      });
    } else if (limit) {
      res.status(200).json({
        status: "success",
        playload: products,
      });
    } else {
      res.status(200).json({ status: "success", payload: [] });
    }
  } catch (err) {
    res.status(err.status || 500).json({
      status: "error",
      payload: err.message,
    });
  }
});

Router.get(`/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await data.getProductByid(id);
    if (product) {
      return res.status(200).json({
        status: "success",
        payload: {},
      });
    }else{
      res.status(404).json({
        status: "error",
        message: "Sorry, no product found by id: " + id,
        payload: {},
    })
    res.status(200).json(product);
  }
} catch (err) {
  res.status(err.status || 500).json({
    status: "error",
    payload: err.message,
  });
}
}); 

Router.post(`/`, validateCode, async (req, res) => {
  try {
    const newProduct = req.body;
    const photo = req.file;
    
    newProduct.thumbail = "/src/public/uploads" + photo.filename;
    const addedProduct = await data.addProduct(newProduct);
    if (addedProduct) {
      return res.redirect("/");
      }
    } catch (err) {
    res.status(err.status || 500).json({
      status: "success",
      payload: err.message,
    });
  }
});

Router.put(`/:id`, async(req, res)  => {
  try{
    const id = req.params.id;
    const newProdduct = req.body;
    const productUpdate = await data.updateProduct(id, newProdduct);
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

Router.delete("/:id", async(req,res)=>{
  try{
    const id = req.params.id;
    const product = await data.getProductById(id);
    if (!product) {
      res.status(404).json({
        status: "error",
        message: "Sorry, no product found by id: " + id,
        payload: {},
      });
      return;
    } 
    const productDelete = await data.deleteProduct(id);
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

export default  Router;
