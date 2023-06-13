import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            quantity:{
                type: Number,
                default:0,
            },
        },
    ],
});

export const cartModel = model("products", cartSchema);