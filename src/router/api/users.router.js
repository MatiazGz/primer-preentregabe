import { users } from "../../data/mongo/managger.mongo.js";
import CustomRouter from "../CustomRouter.js";


//definir los endpoints (POST, GET,PUT, DELETE)

export default class UsersRouter extends CustomRouter {
  init(){
    this.create("/", async (req, res, next) => {
      try {
        const data = req.body;
        const response = await users.create(data);
        return res.json({
          statusCode: 201,
          response,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/", async (req, res, next) => {
      try {
        const orderAndPaginate = {
          limit: req.query.limit || 10,
          page: req.query.page || 1,      
          sort: { email: 1 },
        };
        const filter = {};
        if (req.query.email) {
          filter.email = new RegExp(req.query.email.trim(), "i");
        }
        if (req.query.sort === "desc") {
          orderAndPaginate.email = "desc";
        }
        const all = await users.read({ filter, orderAndPaginate });
        return res.json({
          statusCode: 200,
          response: all,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await users.readOne(uid);
        return res.json({
          statusCode: 200,
          message: one,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/:uem", async (req, res, next) => {
      try {
        const { uem } = req.params;
        const one = await users.readByField(uem);
        return res.json({
          statusCode: 200,
          message: one,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.update("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const data = req.body;
        const one = await users.update(uid, data);
        return res.json({
          statusCode: 200,
          response: one,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.destroy("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await users.destroy(uid);
        return res.json({
          statusCode: 200,
          message: one,
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}

