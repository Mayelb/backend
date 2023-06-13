 import { connect } from "mongoose";

 export async function connectMongo(){
    try{ 
        await connect(
            "mongodb+srv://mayelb:A539228a@cluster0.069d1rd.mongodb.net/"
        );   
        console.log("plu to mongo");
    }catch (e){
        console.log(e);
        throw "can not connect to be the db";
    }
 }