import { Router } from "express";
import events from "../../data/fs/event.manager.fs.js";
import propsEvents from "../../middlewares/propsEvents.mid.js";

const eventsRouter = Router();

//definir los endpoints (POST, GET,PUT, DELETE)

eventsRouter.post("/",propsEvents, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await events.createEvent(data);
    if (response === "se requiere nombre y lugar") {
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
eventsRouter.get("/", async (req, res, next) => {
  try {
    const all = await events.readEvents();
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
eventsRouter.get("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const one = await events.readEventById(eid);
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
eventsRouter.put("/:eid", async (req, res, next) => {
  try {
    const { eid, quantity } = req.params;
    const response = await events.soldticket(quantity, eid);
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "cantidad disponible: " + response,
      });
    } else if (response === "no queda disponibilidad de ese evento") {
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
eventsRouter.delete("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const response = await events.removeEventById(eid);
    if (response === "no hay ningun evento") {
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

export default eventsRouter;
