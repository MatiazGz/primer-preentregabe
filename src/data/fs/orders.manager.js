import fs from "fs";
import crypto from "crypto";
import products from "./product.manager.fs";
import users from "./users.fs";

class OrderManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);

      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        //opcional:
        this.orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      throw error;
    }
  }
  constructor(path) {
    this.path = path;
    this.orders = [];
    this.init();
  }
  async createOrder(user, productsList) {
    try {
      const orderId = crypto.randomBytes(12).toString("hex");
      const newOrder = {
        id: orderId,
        user,
        products: productsList,
        createdAt: new Date().toISOString(),
      };
      const event = {
        id: crypto.randomBytes(12).toString("hex"),
        pid: data.pid,
        uid: data.uid,
        quantity: data.quantity,
        state: data.state,
      };
      this.orders.push(order);
      const jsonData = JSON.stringify(this.orders, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("create " + event.id);
      return event.id;
    } catch (error) {
      throw error;
    }
  }
  readOrder() {
    try {
      if (this.orders.length === 0) {
        const error = new Error("No se encontraron órdenes!");
        error.statusCode = 404;
        throw error;
      } else {
        console.log(this.orders);
        return this.orders;
      }
    } catch (error) {
      throw error;
    }
  }
  readOne(id) {
    try {
      const one = this.orders.find((each) => each.id === id);
      if (!one) {
        const error = new Error("No se encontraron órdenes!");
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
  async updateOrder(orderId, newStatus) {
    const validStatus = ["reservado", "pagado", "entregado"];
    if (!validStatus.includes(newStatus)) {
      const error = new Error("Estado de orden inválido");
      error.statusCode = 400;
      throw error;
    }

    const orderToUpdate = this.getOrderById(orderId);
    if (orderToUpdate) {
      orderToUpdate.status = newStatus;
      try {
        const jsonData = JSON.stringify(this.orders, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
      } catch (error) {
        throw error;
      }

      return orderToUpdate;
    } else {
      const error = new Error("No se encontraron órdenes!");
      error.statusCode = 404;
      throw error;
    }
  }
  async removeOrderById(id) {
    try {
      let one = this.orders.find((each) => each.id === id);
      if (!one) {
        const error = new Error("no hay ninguna orden");
        error.statusCode = 400;
        throw error;
      } else {
        this.orders = this.orders.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.orders, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        return id;
      }
    } catch (error) {
      throw error;
    }
  }
}
export default orders;
