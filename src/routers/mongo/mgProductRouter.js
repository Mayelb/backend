import Router from "express";
import Router from Router.Router();
import mongoProduct from "../../service/productService"
import multer from "multer";
import {validateCode} from "../../middleware/validators";
const mgdb = new mongoProduct;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/src/public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

Router.use(multer({ storage }).single("thumbail"));

Router.get(`/`, async (req, res) => {
    try {
      const {limit, page, sort, query} = req.query;
      const products = await mgdb.getAll(limit, page, sort, query);
      if (products) {
        res.status(200).json({
          status: "success",
          playload: products,
        });
      } 
      res.status(200).json({ status: "success", payload: [] });    
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
      const product = await mgdb.getOne(id);
      if (product) {
        return res.status(200).json({
          status: "success",
          payload: product,
        });
      }else {
            res.status(404).json({
            status: "success",
            message: "Product not found by id:" + id,
            payload: {},
          });
      }
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  });

  Router.post("/", validateCode, async (req, res) => {
    try {
      const newProduct = req.body;
      
      const response = await mgdb.getAll();
      const allProducts = response.docs;
      const product = allProducts.find(
        (product) => product.code == newProduct.code
      );
      if (product) {
        res.status(400).json({
          status: "error",
          payload:
            "Invalid request body. Code already exists: " + newProduct.code,
        });
        return;
      }
      const productCreated = await mgdb.create(newProduct);
      console.log(productCreated);
      res.status(201).json({
        status: "success",
        payload: productCreated,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  });

  Router.put(`/:id`, async(req, res)  => {
    try{
      const id = req.params.id;
      const newProdduct = req.body;
      const productUpdate = await mgdb.Update(id, newProdduct);
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
  
  export default  Router;
  