import { orders } from "../data/mongo/managger.mongo.js";

class UsersController {
  constructor() {
    this.model = orders;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.user._id;
      const response = await this.model.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const orderAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.user._id) {
        filter.user_id = req.user._id;
      }
      if (req.query.sort === "desc") {
        orderAndPaginate.sort.title = "desc";
      }
      const all = await this.model.read({ filter, orderAndPaginate });
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };

  report = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = await this.model.reportBill(uid);
      return res.json({
        statusCode: 200,
        response: report,
      });
    } catch (error) {
      return next(error);
    }
  }

  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const response = await this.model.update(oid, data);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await this.model.destroy(oid);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersController;
const controller = new UsersController();
const { create, read, report, update, destroy } = controller;
export { create, read, report, update, destroy };
