import argsUtil from "../utils/args.util.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.utils.js";

class UserDTO {
  constructor(data) {
    argsUtil.env === "test" && (this._id = crypto.randomBytes(12).toString("hex"));
    this._id = crypto.randomBytes(12).toString("hex"),
    this.name = data.name;
    this.email = data.email;
    this.password = createHash(data.password);
    this.lastName = data.lastName;
    this.photo = data.photo || "https://i.postimg.cc/wTgNFWhR/profile.png";
    this.age = data.age || 18;
    this.role = data.role || 0;
    this.verified = data.verified || false;
    this.verifiedCode = crypto.randomBytes(12).toString("base64");
    argsUtil.env === "test" && (this.updatedAt = new Date()),
    argsUtil.env === "test" && (this.createdAt = new Date())
  }
}

export default UserDTO;
