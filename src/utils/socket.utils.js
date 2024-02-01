import { socketServer } from "../../server.js";
import products from "../data/fs/product.manager.fs.js";
import propsProductsUtils from "./propsProducts.utils.js";

const messages = [];

export default (socket) => {
  console.log("client " + socket.id + " connected");
  socket.emit("products", products.readProducts());
  socket.on("user", () => {
    socket.emit("all", messages);
  });
  socket.emit("messages", messages);
  socket.on("new chat", (data) => {
    messages.push(data);
    socketServer.emit("all", messages);
  });
  socket.on("newProduct", async (data) => {
    try {
      propsProductsUtils(data);
      await products.createProduct(data);
      socketServer.emit("products", products.readProducts());
    } catch (error) {
      console.log(error);
    }
  });
};
