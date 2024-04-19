import env from "./src/utils/env.util.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import IndexRouter from "./src/router/index.router.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import cors from "cors";
import dbConnection from "./src/utils/db.utils.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import compression from "express-compression";
import winston from "./src/middlewares/winston.mid.js";
import logger from "./src/utils/logger/index.js";

const server = express();

const PORT = env.PORT;
const ready = () => {
  logger.INFO(JSON.stringify("server ready on port " + PORT));
  dbConnection();
};
//server.listen(PORT, ready);

const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);

//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

const FileStore = sessionFileStore(expressSession);
//middlewares
server.use(winston);
server.use(cookieParser(process.env.SECRET_KEY));
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

//MEMORY STORE
/* server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
); */

//FILE STORE
/* server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
      path: "./src/data/fs/files/sessions",
      ttl: 10,
      retries: 2,
    }),
  })
); */

//MONGO STORE
// server.use(
//   expressSession({
//     secret: process.env.SECRET_KEY,
//     resave: true,
//     saveUninitialized: true,
//     store: new MongoStore({
//       ttl: 7 * 24 * 60 * 60,
//       mongoUrl: process.env.DB_LINK,
//     }),
//   })
// );
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));
//endpoints
const router = new IndexRouter();
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);
//socket

export { socketServer };
