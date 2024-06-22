import MongoManagger from "./managger.mongo.js";
import Order from "./models/order.model.js";

const orders = new MongoManagger(Order);
export default orders;