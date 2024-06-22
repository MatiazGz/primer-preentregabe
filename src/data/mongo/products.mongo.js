import MongoManagger from "./managger.mongo.js";
import Product from "./models/product.model.js";

const products = new MongoManagger(Product);
export default products;