import service from "../services/users.service.js";

class UsersController {
    constructor (){
        this.service = service;
    } 

    create = async (req, res, next) => {
        try {
          const data = req.body;
          const response = await this.service.create(data);
          return res.success201(response);
        } catch (error) {
          return next(error);
        }
      }

      read = async (req, res, next) => {
        try {
          const options = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,      
            sort: { email: 1 },
          };
          const filter = {};
          if (req.query.email) {
            filter.email = new RegExp(req.query.email.trim(), "i");
          }
          if (req.query.sort === "desc") {
            options.sort.email = "desc";
          }
          const all = await this.service.read({ filter, options });
          return res.success200(all);
        } catch (error) {
          return next(error);
        }
      }

      readOne = async (req, res, next) => {
        try {
          const { uid } = req.params;
          const one = await this.service.readOne(uid);
          return res.success200(one);
        } catch (error) {
          return next(error);
        }
      }

      readByField = async (req, res, next) => {
        try {
          const { uem } = req.params;
          const one = await this.service.readByField(uem);
          return res.success200(one);
        } catch (error) {
          return next(error);
        }
      }

      update = async (req, res, next) => {
        try {
          const { uid } = req.params;
          const data = req.body;
          const response = await this.service.update(uid, data);
          return res.success200(response);
        } catch (error) {
          return next(error);
        }
      }

      destroy = async (req, res, next) => {
        try {
          const { uid } = req.params;
          const response = await this.service.destroy(uid);
          return res.success200(response);
        } catch (error) {
          return next(error);
        }
      }

}

export default UsersController;
const controller = new UsersController();
const { create, read, readOne, readByField, update, destroy } = controller;
export { create, read, readOne, readByField, update, destroy };