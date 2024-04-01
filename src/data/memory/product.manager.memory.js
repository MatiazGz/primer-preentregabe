import crypto from "crypto";
import notFoundOne from "../../utils/noFoundOne.utils.js";

class ProductsManager {
  static #users = [];

  constructor() {}
  async create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo || "https://cdn.shopify.com/s/files/1/0210/2968/3222/articles/trending_products_to_sell_in_India_ad8fc9e0-5052-44bf-bd93-7bec4335f5ee.jpg?v=1647462399",
        price: data.price || 10,
        stock: data.stock || 50,
        date: data.date || new Date(),
      };
      ProductsManager.#users.push(product);
      return product;
    } catch (error) {
      throw error;
    }
  }
  read({ filter, options }) {
    //este metodo para ser compatible con las otras persistencias
    //necesita agregar los filtros
    //y la paginacion/orden
    try {
      if (ProductsManager.#users.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return ProductsManager.#users;
      }
    } catch (error) {
      throw error;
    }
  }
  readOne(id) {
    try {
      const one = ProductsManager.#users.find((each) => each.id === id);
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
  async update(pid, data) {
    try {
      const one = this.readOne(pid);
      notFoundOne(one)
      for (let each in data) {
        one[each] = data[each];
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one)
      ProductsManager.#users = ProductsManager.#users.filter(
        (each) => each.id !== id
      );
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const products = new ProductsManager();
export default products;