import service from "../services/users.service.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

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
          const all = await this.service.read({ filter, options });
          if (all.docs.length> 0){
            return res.success200(all);
          }else{
          CustomError.new(errors.notFound)
          }
        } catch (error) {
          return next(error);
        }
      }

      readOne = async (req, res, next) => {
        try {
          const { uid } = req.params;
          const one = await this.service.readOne(uid);
          if (one){
            return res.success200(one);
          }else{
          CustomError.new(errors.notFound)
          }
        } catch (error) {
          return next(error);
        }
      }

      readByField = async (req, res, next) => {
        try {
          const { uem } = req.params;
          const one = await this.service.readByField(uem);
          if (one){
            return res.success200(one);
          }else{
          CustomError.new(errors.notFound)
          }
        } catch (error) {
          return next(error);
        }
      }

      update = async (req, res, next) => {
        try {
          const { uid } = req.params;
          const data = req.body;
          const response = await this.service.update(uid, data);
          if (response){
            return res.success200(response);
          }else{
          CustomError.new(errors.notFound)
          }
        } catch (error) {
          return next(error);
        }
      }

      destroy = async (req, res, next) => {
        try {
          const { uid } = req.params;
          const response = await this.service.destroy(uid);
          if (response){
            return res.success200(response);
          }else{
          CustomError.new(errors.notFound)
          }
        } catch (error) {
          return next(error);
        }
      }

}

export default UsersController;
const controller = new UsersController();
const { create, read, readOne, readByField, update, destroy } = controller;
export { create, read, readOne, readByField, update, destroy };