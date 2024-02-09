import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "orders";
const schema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
      index: true,
    },
    product_id: {
      type: Types.ObjectId,
      required: true,
      ref: "products",
      index: true,
    },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "topay",
      enum: ["topay", "paid", "delivered"],
    },
  },
  { timestamps: true }
);
//middleware PRE
schema.pre("find", function () {
  this.populate("user_id", "name");
});
schema.pre("find", function () {
  this.populate("product_id", "title photo");
});

schema.plugin(mongoosePaginate);
const Order = model(collection, schema);
export default Order;
