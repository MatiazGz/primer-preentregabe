import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, readByField, update, destroy,} from "../../controllers/users.controller.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.create("/", create);

    this.read("/", read);

    this.read("/:uid", readOne);

    this.read("/:uem", readByField);

    this.update("/:uid", update);

    this.destroy("/:uid", destroy);
  }
}
