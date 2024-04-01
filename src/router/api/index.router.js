import ProductsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import passport from "../../middlewares/passport.mid.js";
import CustomRouter from "../CustomRouter.js";
import ClothesRouter from "./clothes.router.js";
import CategoriesRouter from "./categories.router.js";
import SessionsRouter from "./sessions.router.js";
import UsersRouter from "./users.router.js";
import commentsRouter from "./comments.router.js";

const session = new SessionsRouter();
const users = new UsersRouter();
const product = new ProductsRouter()
const clothes = new ClothesRouter();
const categories = new CategoriesRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/products", product.getRouter());
    this.use("/users", users.getRouter());
    this.use("/orders", passport.authenticate("jwt", { session: false }), ordersRouter);
    this.use("/sessions", session.getRouter());
    this.use("/clothes", clothes.getRouter());
    this.use("/categories", categories.getRouter());
    this.use("/comments", commentsRouter)
  }
}
