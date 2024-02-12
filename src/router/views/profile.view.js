import { Router } from "express";

const profileRouter = Router();

profileRouter.get("/", async(req,res,next)=>{
  try {
    return res.render("profile")
  } catch (error) {
    return next(error)
  }
})

export default profileRouter;