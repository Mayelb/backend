const express = require("express");
const productRouter = require("./routers/productsRouter");
const cartRouter = require("./routers/cartRouter")
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 

app.use("/products", productRouter);
app.use("/carts", cartRouter);


app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});

 