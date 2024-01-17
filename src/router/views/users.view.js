import { Router } from "express";
import users from "../../data/fs/users.fs.js";

const usersRouter = Router();

usersRouter.use("/profile", (req, res, next) => {
  try {
    const one = users.readOne("2f5c4433550e00754c2a3bc4");
    return res.render("profile", { user: one });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
