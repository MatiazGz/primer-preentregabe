import { Router } from "express";
import { products } from "../../data/mongo/managger.mongo.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.read();
    return res.render("products", { products: all });
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/form", (req, res, next)=>{
    try {
        return res.render("form")
        
        
    } catch (error) {
        next(error)
        
    }
})

export default productsRouter;
