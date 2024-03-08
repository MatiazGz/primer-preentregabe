import apiRouter from "./api/index.router.js";
import viewsRouter from "./views/index.view.js";
import CustomRouter from "./CustomRouter.js";

export default class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", apiRouter);
    this.router.use("/", viewsRouter);
  }
}
