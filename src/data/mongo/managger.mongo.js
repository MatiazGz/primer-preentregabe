import notFoundOne from "../../utils/noFoundOne.utils.js";
import Order from "./models/order.model.js";
import Comment from "./models/comment.model.js";
import Product from "./models/product.model.js";
import User from "./models/user.model.js";
import Clothe from "./models/clothe.model.js";
import Category from "./models/category.model.js";
import { Types } from "mongoose";

class MongoManagger {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read({filter, options}) {
    try {
      const all = await this.model.paginate(filter, options);
      if (all.totalPages === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async reportBill(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { user_id: new Types.ObjectId(uid) } },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
          },
        },
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id).lean();
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async readByField(email) {
    try {
      const one = await this.model.findOne({ email });

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
const comments = new MongoManagger(Comment);
const clothes = new MongoManagger(Clothe);
const categories = new MongoManagger(Category)

export { products, users, orders, categories, clothes, comments };
export default MongoManagger;
