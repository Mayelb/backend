import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema({

    title:{
        type: String, 
        required: true,
    },
    description:{
        type: String, 
        required: true
    },
    code:{
        type: String,
         required: true
    },
    price:{
        type: Number, 
        default: 0, 
        required:true
    },
    stock: {
        type: Number,
        default: 0,
        required: true
    },
    category:{
        type: String, 
        required: true
    },
    status:{
        type: Boolean, 
        default: true
    },
    thumbnail:{
        type:[String]
    },
    
});
schema.plugin(mongoosePaginate);

export const productsModel = model("products", schema);
