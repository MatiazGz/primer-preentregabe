import { Router } from "express";
import orders from "../../data/fs/orders.manager";

const ordersRouter = Router();

ordersRouter.get("/", async (req, res, next) => {
  try {
    const all = await orders.readOrder();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    next(error);
  }
});
ordersRouter.get("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const one = await orders.readOrderById(eid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const response = await orders.removeOrderById(eid);
    if (response === "no hay ninguna orden") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    next(error);
  }
});
