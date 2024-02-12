import { Router } from "express";
import { products } from "../../data/mongo/managger.mongo.js";
import productsRouter from "./products.view.js";
import usersRouter from "./register.view.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const mainProducts = await products.read({});
    return res.render("index", { products: mainProducts, title: "INDEX" });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/register", usersRouter);

export default viewsRouter;
