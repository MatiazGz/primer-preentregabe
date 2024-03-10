import { orders } from "../../data/mongo/managger.mongo.js";
import CustomRouter from "../CustomRouter.js";

export default class OrdersRouter extends CustomRouter {
  init(){
    this.create("/", async (req, res, next) => {
      try {
        const data = req.body;
        const one = await orders.create(data);
        return res.json({
          statusCode: 201,
          response: one,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/total/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const report = await orders.reportBill(uid);
        return res.json({
          statusCode: 200,
          response: report,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const filter = { user_id: uid };
        const all = await orders.read({ filter });
        return res.json({
          statusCode: 200,
          response: all,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.update("/:oid", async (req, res, next) => {
      try {
        const { oid } = req.params;
        const data = req.body;
        const one = await orders.update(oid, data);
        return res.json({
          statusCode: 200,
          response: one,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.destroy("/:oid", async (req, res, next) => {
      try {
        const { oid } = req.params;
        const one = await orders.destroy(oid);
        return res.json({
          statusCode: 200,
          response: one,
        });
      } catch (error) {
        return next(error);
      }
    });
    


  }

}