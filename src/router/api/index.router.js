import ProductsRouter from "./products.router.js";
import CustomRouter from "../CustomRouter.js";
import SessionsRouter from "./sessions.router.js";
import UsersRouter from "./users.router.js";
import OrdersRouter from "./orders.router.js";

const session = new SessionsRouter();
const users = new UsersRouter();
const product = new ProductsRouter();
const orders = new OrdersRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/products", product.getRouter());
    this.use("/users", users.getRouter());
    this.use("/orders", orders.getRouter());
    this.use("/sessions", session.getRouter());
  }
}
