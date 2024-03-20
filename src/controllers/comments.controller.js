import service from "../services/comments.service.js";

class CommentsController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.user._id;
      const one = await this.service.create(data);
      return res.seccess201(one);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const filter = {};
      const orderAndPaginate = {};
      const all = await this.service.read({ filter, orderAndPaginate });
      return success200(all);
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const one = await this.service.readOne(cid);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const data = req.body
      const one = await this.service.update(cid, data);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const one = await this.service.destroy(cid);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };
}

export default CommentsController;
const controller = new CommentsController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
