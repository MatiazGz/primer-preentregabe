import { Router } from "express";

import orders from "../../data/mongo/orders.mongo.js";

import passCallBack from "../../middlewares/PassCallBack.mid.js";

const productsRouter = Router();

productsRouter.get("/", passCallBack("jwt"), async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true,
    };
    const user = await users.readByField(req.user.email);
    const filter = {
      user_id: user._id,
    };
    const all = await orders.read({ filter, options });
    console.log(all.docs[0].product_id);
    return res.render("orders", { title: "MI CARRITO", orders: all.docs });
  } catch (error) {
    return res.render("orders", {
      title: "MI CARRITO",
      message: "NO ORDERS YET!",
    });
  }
});

export default productsRouter;