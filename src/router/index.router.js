import logger from "../utils/logger/index.js";
import CustomRouter from "./CustomRouter.js";
import ApiRouter from "./api/index.router.js";
import ViewsRouter from "./views/index.view.js";

const api = new ApiRouter();
const apiRouter = api.getRouter();
const views = new ViewsRouter();
const viewsRouter = views.getRouter();

export default class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", apiRouter);
    this.router.use("/", viewsRouter);
    this.router.get("/simplex", (req, res, next) => {
      logger.INFO(process.pid)
      try {
        let total = 1;
        for (let i = 1; i < 100; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
    this.router.get("/complex", (req, res, next) => {
      logger.INFO(process.pid)
      try {
        let total = 1;
        for (let i = 1; i < 1000000; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
  }
}
