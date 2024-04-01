import CustomRouter from "../CustomRouter.js";
import { create, read, report, update, destroy, } from "../../controllers/orders.controller.js"

export default class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);

    this.read("/", ["PUBLIC"], read);

    this.read("/total/:uid", ["PUBLIC"], report);

    this.update("/:oid", ["PUBLIC"], update);

    this.destroy("/:oid", ["PUBLIC"], destroy);
  }
}
