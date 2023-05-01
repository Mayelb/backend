const express = require("express");
const ProductManager = require("./products.json");
const productManager = new ProductManager();

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/products`, async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProduct();
    if (limit) {
      res.status(200).json(products.slice(0, limit));
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "There was a mistake" });
  }
});

app.get(`/products/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productManager.getProductByid(parseInt(id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "There was a mistake" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
