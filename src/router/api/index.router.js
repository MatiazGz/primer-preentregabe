import { Router } from "express";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.js";
import passport from "../../middlewares/passport.mid.js";

const apiRouter = Router();

//definir los enrutadores
apiRouter.use("/users", usersRouter);
apiRouter.use("/orders", passport.authenticate("jwt", {session : false}) , ordersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/sessions", sessionsRouter);

export default apiRouter;
//exporto el enrutador de la api para poder implementarlo en el enrutador del servidor
