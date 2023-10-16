import { Router } from "express";
import Router from Router.Router();

import { viewChat } from "../../controllers/chatController";
import { isUser } from "../../middleware/auth.js";

Router.get("/", isUser, viewChat);

 export default Router;