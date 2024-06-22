import MongoManagger from "./managger.mongo.js";
import User from "./models/user.model.js";

const users = new MongoManagger(User);
export default users;