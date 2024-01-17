import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const mainProducts = ["Arctic Monkeys", "Mega Death"];
    return res.render("index", { products: mainProducts });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);

export default viewsRouter;
