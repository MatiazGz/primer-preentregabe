import { socketServer } from "../../server.js";
import products from "../data/fs/product.manager.fs.js";
import propsProductsUtils from "./propsProducts.utils.js";

export default (socket) => {
  console.log("client " + socket.id + " connected");
  socket.emit("products", products.readProducts());
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
