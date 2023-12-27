const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  static #perGain = 0.3;
  static #totalGain = 0;

  init() {
    try {
      const exists = fs.existsSync(this.path);

      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        //opcional:
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }
  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }
  async createProduct(data) {
    try {
      if (!data.title || !data.photo) {
        throw new Error("se requiere nombre y foto");
      }
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.tilte,
        photo: data.photo,
        price: data.price || 10,
        stock: data.stock || 50,
      };
      this.products.push(product);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("create " + product.id);
      return product.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readProducts() {
    try {
      if (this.products.length === 0) {
        throw new Error("No se encontraron productos!");
      } else {
        console.log(this.products);
        return this.products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readProductById(id) {
    try {
      const one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("no hay ningun producto con id:" + id);
      } else {
        console.log("leer " + one);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async removeProductById(id) {
    try {
      let one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("no hay ningun producto");
      } else {
        this.products = this.products.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("borrado " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async soldProduct(quantity, eid) {
    try {
      const one = this.readProductById(eid);
      if (one) {
        if (one.stock >= quantity) {
          one.stock = one.stock - quantity;
          ProductManager.#totalGain =
            ProductManager.#totalGain +
            one.price * quantity * ProductManager.#perGain;
          const jsonData = JSON.stringify(this.products, null, 2);
          await fs.promises.writeFile(this.path, jsonData);
          console.log("cantidad disponible " + one.stock);
          return one.stock;
        } else {
          throw new Error("no queda disponibilidad de ese producto");
        }
      }
    } catch (error) {
      error.message;
    }
  }
}
const products = new ProductManager("./data/fs/files/products.json");
export default products;
