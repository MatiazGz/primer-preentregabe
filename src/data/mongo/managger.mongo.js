import notFoundOne from "../../utils/noFoundOne.utils.js";
import Order from "./models/order.model.js";
import Product from "./models/product.model.js";
import User from "./models/user.model.js";
import Event from "./models/events.models.js";

class MongoManagger {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }
  async read(filter, order) {
    try {
      const all = await this.model.find(filter).sort(order);

      if (all.length === 0) {
        const error = new Error("There aren't any document");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async readByField(email, value) {
    try {
      const filter = { [email]: value };
      const one = await this.model.find(filter);
      
      if (one.length === 0) {
        const error = new Error(`No documents found with ${email}: ${value}`);
        error.statusCode = 404;
        throw error;
      }

      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true }; // este objeto de configuracion opcional devuelve el objeto luego de la modificacion
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async stats({ filter }) {
    try {
      let stats = await this.model.find(filter).explain("executionStats");
      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMillis,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }
}

const products = new MongoManagger(Product);
const users = new MongoManagger(User);
const orders = new MongoManagger(Order);
const events = new MongoManagger(Event);

export { products, users, orders, events };
