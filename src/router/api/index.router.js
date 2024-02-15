import { Router } from "express";
import usersRouter from "./users.router.js";
import eventsRouter from "./events.router.js";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";

const apiRouter = Router();

//definir los enrutadores
apiRouter.use("/users", usersRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/events", eventsRouter);

export default apiRouter;
//exporto el enrutador de la api para poder implementarlo en el enrutador del servidor
