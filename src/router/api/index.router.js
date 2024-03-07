import { Router } from "express";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.js";
import passport from "../../middlewares/passport.mid.js";
import CustomRouter from '../CustomRouter.js';
import ClothesRouter from './clothes.router.js';
import CategoriesRouter from './categories.router.js';
import SizesRouter  from "./size.router.js";

const apiRouter = Router();

//definir los enrutadores
apiRouter.use("/users", usersRouter);
apiRouter.use("/orders", passport.authenticate("jwt", {session : false}) , ordersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/sessions", sessionsRouter);

//export default apiRouter;
//exporto el enrutador de la api para poder implementarlo en el enrutador del servidor

const clothes = new ClothesRouter();
const categories = new CategoriesRouter();
const sizes = new SizesRouter();


export default class ApiRouter extends CustomRouter {
    init() {
      this.use('/sessions', session.getRouter());
      this.use('/clothes', clothes.getRouter());
      this.use('/categories', categories.getRouter());
      this.use("/sizes", sizes.getRouter())
    }
  }