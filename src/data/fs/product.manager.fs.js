import fs from "fs";
import crypto from "crypto";

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
      throw error;
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
        const error = new Error("Se requiere nombre y foto");
        error.statusCode = 400;
        throw error;
      }
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
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
      throw error;
    }
  }
  readProducts() {
    try {
      if (this.products.length === 0) {
        const error = new Error("No se encontraron productos!");
        error.statusCode = 404;
        throw error;
      } else {
        console.log(this.products);
        return this.products;
      }
    } catch (error) {
      throw error;
    }
  }
  readProductById(id) {
    try {
      const one = this.products.find((each) => each.id === id);
      if (!one) {
        const error = new Error("No se encontraron productos!");
        error.statusCode = 404;
        throw error;
      } else {
        console.log("leer " + one);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
  async removeProductById(id) {
    try {
      let one = this.products.find((each) => each.id === id);
      if (!one) {
        const error = new Error("no hay ningun producto!");
        error.statusCode = 400;
        throw error;
      } else {
        this.products = this.products.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("borrado " + id);
        return id;
      }
    } catch (error) {
      throw error;
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
          const error = new Error("no queda disponibilidad de ese producto");
          error.statusCode = 400;
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async updateProduct(productId, newData) {
    try {
      const productIndex = this.products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex === -1) {
        const error = new Error("Producto no encontrado");
        error.statusCode = 400;
        throw error;
      }

      const updatedProduct = {
        ...this.products[productIndex],
        ...newData,
      };

      this.products[productIndex] = updatedProduct;

      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);

      console.log("Producto actualizado:", productId);
      return productId;
    } catch (error) {
      throw error;
    }
  }
}
const products = new ProductManager("./src/data/fs/files/products.json");
export default products;

