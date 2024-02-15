import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    photo: {
      type: String,
      default:
        "https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png",
    },
    price: { type: Number, default: 10, index: true },
    stock: { type: Number, default: 50 },
    date: { type: Date, default: new Date(), index: true },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
const Product = model(collection, schema);
export default Product;
