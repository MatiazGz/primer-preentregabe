import { Router } from "express";

const sesionsRouter = Router();

sesionsRouter.get("/", async(req,res,next)=>{
  try {
    return res.render("register")
  } catch (error) {
    return next(error)
  }
})

export default sesionsRouter;
