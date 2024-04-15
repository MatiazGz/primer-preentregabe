import users from "../data/mongo/users.mongo.js";
import service from "../services/orders.service.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";
import { verifytoken } from "../utils/token.utils.js";

class  OrdersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const response = await this.service.create(req.body);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const token = req.cookies.token
      const userData = verifytoken(token)
      const user = await users.readByField(userData.email)
      const all = await this.service.read({ filter, oprions });
      const filter = {
        user_id: user._id
      }
      if (all.docs.length> 0){
        return res.success200(all);
      }else{
      CustomError.new(errors.notFound)
      }
    } catch (error) {
      return next(error);
    }
  };

  report = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = await this.service.reportBill(uid);
      return res.success200(report);
    } catch (error) {
      return next(error);
    }
  }

  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const response = await this.service.update(oid, data);
      if (response){
        return res.success200(response);
      }else{
      CustomError.new(errors.notFound)
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await this.service.destroy(oid);
      if (response){
        return res.success200(response);
      }else{
      CustomError.new(errors.notFound)
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersController;
const controller = new OrdersController();
const { create, read, report, update, destroy } = controller;
export { create, read, report, update, destroy };
