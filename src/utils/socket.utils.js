import { socketServer } from "../../server.js";
import products from "../data/fs/product.manager.fs.js";
import propsProductsUtils from "./propsProducts.utils.js";

export default (socket) => {
  console.log("client " + socket.id + "connected");
  socket.emit("items", products.readProducts());
  socket.on("newItem", async (data) => {
    try {
      propsProductsUtils(data);
      await products.createProduct(data);
      socketServer.emit("items", products.readProducts());
    } catch (error) {
      console.log(error);
    }
  });
};
