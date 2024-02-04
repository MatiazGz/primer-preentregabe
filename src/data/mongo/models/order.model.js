import { model, Schema, Types } from "mongoose";

const collection = "orders";
const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, ref: "users", index: true },
    product_id: { type: Types.ObjectId, required: true, ref: "products", index: true },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "topay",
      enum: ["topay", "paid", "delivered"],
    },
  },
  { timestamps: true }
);

schema.pre("find",function () { this.populate("user_id", "-password ")})
schema.pre("find", function () {this.populate("product_id")})

const Order = model(collection, schema);
export default Order;
