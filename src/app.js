import express from "express";
import productRouter from"./routers/productsRouter";
import cartRouter from "./routers/cartRouter";
import { homeRouter } from "./routers/homeRouter";
import realtimeProductRouter from "./routers/realTimeProductRoute.jsr"; 
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils";
import path from "path";
import ProductManager from "../products.json";
const  productManager = new ProductManager();
 



const app = express();
const port = 8080;

const httpServer = app.listen(port, () =>{
  console.log(`Example app listening on http://localhost:${port}`)
});

const socketServer = new Server(httpServer);

socketServer.on("conection",(socket) => {
  console.log("products" + socket.id);

  socket.on ("products", (productManager) =>{
    console.log(productManager);
    socketServer.emit("products", productManager);
  })
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));
 

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.use("/", homeRouter);
app.use("/", realtimeProductRouter);

app.get("/", (req, res)=>{
  res.json({respuesta: "ok"});
})

