import express from "express";
import fsProducstRouter from"./routers/fs/fsProductsRouter";
import fsCartRouter from "./routers/fs/fsCartRouter";
import { fsHomeRouter } from "./routers/fs/fsHomeRouter";
import fsRealtimeProductRouter from "./routers/fs/fsRealTimeProductRouter"; 
import mgChatRouter from "./routers/mongo/mgChatRouter";
import mgProductRouter from "./routers/mongo/mgProductRouter";
import mgCartRouter from "./routers/mongo/mgCartRouter";
import mgHomeRouter from "./routers/mongo/mgHomeRouter";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import websockets from "./websockets/websockets";
import __dirname from "./utils/path";
import path from "path";
import ProductManager from "./file/products.json";
import { connectMongo } from "./utils/mongoDB";
const  data = new ProductManager();
 



const app = express();
const port = 8080 || process.env.port;

const httpServer = app.listen(port, () =>{
  console.log(`Example app listening on http://localhost:${port}`)
});

connectMongo();

const socketServer = new Server(httpServer);

socketServer.on("conection",(socket) => {
  console.log(" ${socket.id}");

  socket.on ("new-product",async (newProd) =>{
     try{
      await data.addProduct({...newProd});
      
      const productList = await data.getProduct();

      socketServer.emit("products", productList);

     }catch (error) {
      console.log(error);
     }
  });
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,+ "/public")));

app.engine("handlebars", handlebars.engine());
app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "handlebars");


app.use("/fs/products", fsProducstRouter);
app.use("/fs/carts", fsCartRouter);
app.use("/fs/home", fsHomeRouter);
app.use("/fs/products", fsRealtimeProductRouter);

app.use("/home", mgHomeRouter);
app.use("/products", mgProductRouter);
app.use("/carts", mgCartRouter);
app.use("/chat", mgChatRouter);

app.get("/", (req, res)=>{
  res.json({respuesta: "ok"});
});
