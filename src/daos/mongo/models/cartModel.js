import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const cartSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
        }
      }
    ],
    default:[],
  },
});

export const cartModel = model("products", cartSchema);
