import { Schema, model } from "mongoose";
 

const ticketSchema = new Schema({
    code:{
        type: String,
         required: true
    },
    purchase_datatime:{
        type: String,
         required: true
    },
    amount:{
        type: number,
        default:0,
        required: true
    },
    purchaser:{
        type: String,
         required: true
    },
});

export const ticketModel = model('products', Schema);