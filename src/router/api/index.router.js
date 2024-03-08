import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.js";
import passport from "../../middlewares/passport.mid.js";
import CustomRouter from "../CustomRouter.js";
import ClothesRouter from "./clothes.router.js";
import CategoriesRouter from "./categories.router.js";
import SizesRouter from "./size.router.js";


const clothes = new ClothesRouter();
const categories = new CategoriesRouter();
const sizes = new SizesRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/orders", passport.authenticate("jwt", { session: false }), ordersRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/clothes", clothes.getRouter());
    this.use("/categories", categories.getRouter());
    this.use("/sizes", sizes.getRouter());
  }
}
