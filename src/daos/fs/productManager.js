import  { error } from "console";
import express from "express";
import  fs from"fs/promises";

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

      let newProdduct = { ...product, id: this.id };

      data.push(newProdduct);
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


const product = {
  title: "taza",
  description: " De cerámica",
  price: 2000,
  code: 13265,
  stock: 20,
  cateory:"cocina",
  thumbnail: "/src/public/uploads/taza.jpg",
};
const product2 = {
  title: "vaso térmico",
  description: "Frío/calor ",
  price: 3500,
  code: 14278,
  stock: 20,
  category:"cocina",
  thumbnail: "/src/public/uploads/vasoTermico.jpg",
};
const product3 = {
  title: "pantufla",
  description: " ",
  price: 5500,
  code: 1350,
  stock: 20,
  category:"invierno",
  thumbail: "/src/public/uploads/pantufla.jpg",
};
const product4 = {
  title: "azucarera",
  description: "de cerámica  ",
  price: 4000,
  code: 1280,
  stock: 20,
  category:"cocina",
  thumbnail: "/src/public/uploads/azucarera.jpg",
};

const productManager = new ProductManager();
const asynFn = async () => {
  console.log(await productManager.addProduct(product));
  console.log(await productManager.addProduct(product2));
  console.log(await productManager.addProduct(product3));
  console.log(await productManager.addProduct(product4));
};

async();

 export default productManager;
