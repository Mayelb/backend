import { Router } from "express";
import {
  getAll,
  create,
  getOne,
  update,
  deleteOne,
} from "../../controllers/productController.js";
import { validateRequest } from "../../middleware/validators.js";
import { isAuth, isAdmin } from "../../middleware/auth.js";
const router = Router();

 
Router.get("/", isAuth, getAll);
Router.get("/:id", isAuth, getOne);
Router.post("/", isAuth, isAdmin, validateRequest, create);
Router.put("/:id", isAuth, isAdmin, validateRequest, update);
Router.delete("/:id", isAuth, isAdmin, deleteOne);

export default  Router;
  