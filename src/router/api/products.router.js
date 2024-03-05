import { Router } from "express";
import { products } from "../../data/mongo/managger.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import PassCallBackMid from "../../middlewares/PassCallBack.mid.js";

const productsRouter = Router();

//definir los endpoints (POST, GET,PUT, DELETE)

productsRouter.post("/", PassCallBackMid("jwt"), isAdmin, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,      
      sort: { title: 1 },
      lean: true
    };
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }
    if (req.query.sort === "desc") {
      orderAndPaginate.sort.title = "desc";
    }
    const all = await products.read({ filter, orderAndPaginate });
    return res.json({
      statusCode: 200,
      message: all,
    });
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
productsRouter.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const response = await products.update(pid, data);
      return res.json({
        statusCode: 200,
        response: response,
      });
  } catch (error) {
    return next(error);
  }
});
productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await products.destroy(pid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
