import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class ProductDTO {
  constructor(data) {
    argsUtil.env === "test" && (this._id = crypto.randomBytes(12).toString("hex"));
    this._id = crypto.randomBytes(12).toString("hex"),
    this.title = data.title;
    this.photo = data.photo || "https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png";
    this.price = data.price || 10;
    this.stock = data.stock || 50;
    this.date = data.date || new Date();
    argsUtil.env === "test" && (this.updatedAt = new Date());
    argsUtil.env === "test" && (this.createdAt = new Date());
  }
}

export default ProductDTO;
