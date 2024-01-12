import { Router } from "express";
import users from "../../data/fs/users.fs.js";

const usersRouter = Router();

//definir los endpoints (POST, GET,PUT, DELETE)

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.createUser(data);
    if (response === "Nombre e email requeridos") {
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
usersRouter.get("/", async (req, res, next) => {
  try {
    const all = await users.readUsers();
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
usersRouter.get("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const one = await users.readOne(eid);
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
usersRouter.delete("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const response = await users.removeUserById(eid);
    if (response === "no hay ningun usuario") {
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

export default usersRouter;
