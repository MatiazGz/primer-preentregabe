import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/form", (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.read(pid);
    return res.render("detail", { product: one });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
