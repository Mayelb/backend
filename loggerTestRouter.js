import { Router } from "express";
import { addLogger } from "./src/utils/logger";

Router.get("/loggerTest", (req, res,) => {
    addLogger.info("logging in" + new Date().toLocaleTimeString());
   
    addLogger.warn("Error");
    
    addLogger.error("something went wrong")
    
    res.send({ message: "successful login"});
  });

  export default Router;