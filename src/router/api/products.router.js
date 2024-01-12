import { Router } from "express";
import products from "../../data/fs/product.manager.fs.js";

const productsRouter = Router();

//definir los endpoints (POST, GET,PUT, DELETE)

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.createProduct(data);
    if (response === "se requiere nombre y foto") {
      return res.json({
        statusCode: 403,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.readProducts();
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
productsRouter.get("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const one = await products.readProductById(eid);
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
productsRouter.put("/:eid", async (req, res, next) => {
  try {
    const { eid, quantity } = req.params;
    const response = await products.soldProduct(quantity, eid);
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "cantidad disponible: " + response,
      });
    } else if (response === "no queda disponibilidad de ese producto") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: response,
      });
    }
  } catch (error) {
    next(error);
  }
});
productsRouter.delete("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const response = await products.removeProductById(eid);
    if (response === "no hay ningun producto") {
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

export default productsRouter;
