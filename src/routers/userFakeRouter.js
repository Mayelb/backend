import { Router } from "express";
const router = Router();

Router.get("/", async (req, res)=>{
    const userFake = [];

    for(let i = 0; i < 100; i++){
        userFake.push(generateUser());
    }

    res.send({status: "success", payload: userFake});
});


export default Router;