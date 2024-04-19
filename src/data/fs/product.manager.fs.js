import fs from "fs";
import notFoundOne from "../../utils/noFoundOne.utils.js";

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
  async create(data) {
    try {
      this.products.push(data);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return data;
    } catch (error) {
      throw error;
    }
  }
  read({ filter, options }) {
    try {
      if (this.products.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        //console.log(this.products);
        return this.products;
      }
    } catch (error) {
      throw error;
    }
  }
  readOne(id) {
    try {
      const one = this.products.find((each) => each._id === id);
      if (!one) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      this.products = this.products.filter((each) => each._id !== id);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
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
          winston.INFO(JSON.stringify("cantidad disponible " + one.stock));
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
  async update(pid, data) {
    try {
      const one = this.products.readOne(pid);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }
}
const products = new ProductManager("./src/data/fs/files/products.json");
export default products;
