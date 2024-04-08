import argsUtil from "../utils/args.util.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.utils.js";

class UserDTO {
  constructor(data) {
    argsUtil.env !== "prod" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.name = data.name;
    this.email = data.email;
    this.password = createHash(data.password);
    this.role = data.role || "USER";
    argsUtil.env !== "prod" && (this.updatedAt = new Date());
    argsUtil.env !== "prod" && (this.createdAt = new Date());
  }
}

export default UserDTO;
