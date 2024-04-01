import argsUtil from "../utils/args.util.js";
import dbConnection from "../utils/db.utils.js";

const environment = argsUtil.env;
//la variable puede ser el ambiente o directamente la persistencia con la que tengo que trabajar
//va a depender de una variable de entorno o del argumento que se pase

let dao = {};

switch (environment) {
  case "test":
    //vamos a usar MEMORY
    console.log("MEMORY CONNECTED");
    const { default: productsMemory } = await import("./memory/products.memory.js")
    dao = { products: productsMemory }
    break;
  case "dev":
    //vamos a usar FS
    console.log("FS CONNECTED");
    const { default: productsFs } = await import("./fs/product.manager.fs.js")
    const { default: usersFs } = await import("./fs/users.fs.js")
    const { default: ordersFs } = await import("./fs/orders.manager.fs.js")
    const { default: commentsFs } = await import("./fs/comments.fs.js")
    dao = { products: productsFs, users: usersFs, orders: ordersFs, comments: commentsFs }
    break;
  case "prod":
    //vamos a usar MONGO
    //aca es necesario configurar la conexión de mongo
    dbConnection()
      .then(() => console.log("MONGO CONNECTED"))
    const { default: productsMongo } = await import("./mongo/products.mongo.js")
    const { default: usersMongo } = await import("./mongo/users.mongo.js")
    const { default: ordersMongo } = await import("./mongo/orders.mongo.js")
    const { default: commentsMongo } = await import("./mongo/comments.mongo.js")
    dao = { products: productsMongo, users: usersMongo, orders: ordersMongo, comments: commentsMongo }
    break;
  default:
    break;
}

export default dao;