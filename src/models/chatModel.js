import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    messages:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
});

export const chatModel = model ("messages", chatSchema)