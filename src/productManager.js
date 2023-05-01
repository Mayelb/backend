class ProductManager {
  constructor() {
    this.id = 1;
    this.path = "./src/products.json";
  }
  async getProduct() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
      }
      await fs.promises.readFile(this.path, JSON.stringify([]));
      return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async addProduct(product) {
    try {
      let data = await this.getProduct();

      let validatecode = data.some((p) => p.code === product.code);

      if (validatecode) {
        return "This code already exists";
      }
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbail ||
        !product.code ||
        !product.stock
      ) {
        return "Fields missing";
      }

      let prod = { ...product, id: this.id };

      data.push(prod);
      const productsString = JSON.stringify(data);
      await fs.promises.writeFile(this.path, productsString);
      this.id++;

      return "Product added";
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductByid(id) {
    try {
      let data = await this.getProduct();
      let foundId = data.find((p) => p.id === id);
      if (!foundId) {
        throw new error("Product not found");
      }
      return foundId;
    } catch (error) {
      throw new Error(e);
    }
  }

  async updateProduct() {
    try {
      let data = await this.getProduct();
      let updateId = data.map((p) => --p.stock);
      {
        if (updateId) {
          return data;
        }

        const productsString = JSON.stringify(data);
        await fs.promises.writeFileSync(this.path, productsString);
      }
    } catch (error) {
      throw new Error(e);
    }
  }

  async deleteProduct(id) {
    try {
      let data = await this.getProduct();
      let removeId = data.filter((p) => p.id === id);

      const productsString = JSON.stringify(data);
      await fs.promises.writeFileSync(this.path, productsString);
      return removeId;
    } catch (error) {
      throw new Error(e);
    }
  }
}

const { error } = require("console");
const e = require("express");
const fs = require("fs");

const product = {
  title: "Taza",
  description: " De cerámica",
  price: 2000,
  thumbail: "/src/assets/img/taza.jpg",
  code: 13265,
  stock: 20,
};
const product2 = {
  title: "Vaso térmico",
  description: "Frío/calor ",
  price: 3500,
  thumbail: "/src/assets/img/mugCafe.jpg",
  code: 14278,
  stock: 20,
};
const productManager = new ProductManager();
const asynFn = async () => {
  console.log(await productManager.addProduct(product));
  console.log(await productManager.addProduct(product2));
  console.log(await productManager.getProductByid(product));
  console.log(await productManager.updateProduct(product)); 
};

asyncFn();

module.exports = productManager;
