import { Schema, model } from "mongoose";

const schema = new Schema({

    title:{type: String, required: true,},
    description:{type: String, required: true},
    code:{type: String, required: true},
    price:{type: Number, default: 0, required:true},
    stock:{type: Number, default:0, required: true},
    category:{type: String, required: true},
    status:{type: Boolean, default: true},
    thumbail:{type:[String]},
    
});

export const productsModel = model("products", schema);
