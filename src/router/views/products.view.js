import { Router } from "express";
import passCallBack from "../../middlewares/PassCallBack.mid.js";
import products from "../../data/mongo/products.mongo.js";

const productsRouter = Router();

productsRouter.get("/form", passCallBack("jwt"), (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.render("detail", {
      product: one,
      title: one.title.toUpperCase(),
    });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
