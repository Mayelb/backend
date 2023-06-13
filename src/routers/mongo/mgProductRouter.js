import Router from "express";
import Router from Router.Router();
import mongoProduct from "../../daos/mongo/mongoProduct"
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
      const limit = req.query.limit;
      const products = await mgdb.getAll();
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
      }else {
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

  Router.post(`/`, validateCode, async (req, res) => {
    try {
      const newProdduct = req.body;
      const productCreate = await mgdb.create(newProdduct);
      if (productCreate) {
        return res.status(201).json({
          status: "success",
          payload: productCreate,
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
  