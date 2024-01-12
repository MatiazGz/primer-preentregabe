import { Router } from "express";
import usersRouter from "./users.router.js";
import eventsRouter from "./events.router.js";
import productsRouter from "./products.router.js";

const apiRouter = Router();

//definir los enrutadores
apiRouter.use("/users", usersRouter);
apiRouter.use("/events", eventsRouter);
apiRouter.use("/products", productsRouter);

export default apiRouter;
//exporto el enrutarod de la api para poder implementarlo en el enrutador del servidor
