import { Router } from "express";
import Router from Router.Router();
 

import { isAuth } from "../../middleware/auth.js";
import { viewHome } from "../../controllers/homeController";

Router.get("/", isAuth, viewHome);

export default Router;