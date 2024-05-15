import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    owner_id: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
      index: true,
    },
    photo: {
      type: String,
      default:
        "https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png",
    },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 50 },
    date: { type: Date, default: new Date(), index: true },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Product = model(collection, schema);
export default Product;
