 import { connect } from "mongoose";
 import "dotenv/config";
 dotenv.config();

 export async function connectMongo(){
    try{ 
        await connect(
            "mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.069d1rd.mongodb.net/"
        );   
        console.log("plu to mongo");
    }catch (e){
        console.log(e);
        throw "can not connect to be the db";
    }
 }