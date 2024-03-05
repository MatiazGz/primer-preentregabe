import { Router } from "express";
import passCallBack from "../../middlewares/PassCallBack.mid.js";
import isAdminMid from "../../middlewares/isAdmin.mid.js";

const productsRouter = Router();

productsRouter.get("/form", passCallBack("jwt"), isAdminMid, (req, res, next) => {
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
    return res.render("detail", { product: one, title: one.title.toUpperCase()  });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
