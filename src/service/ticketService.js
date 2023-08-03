import mongoose from "mongoose";
import productsModel from "../daos/models/productsModel";
import ticketModel from "../daos/models/ticketModel";
import cartService from "../service/cartService";
import classService from "../service/classService";


export class mongoProducts extends classMongo{
    constructor(){
      super("tickets",ticketModel);
      }
   
    async purchaseCart(cartId, cartList, userEmail, userCartId){
        try{
            if (! Array.isArray(cartList)){
                return{
                    status: 400;
                    result:{
                        status: "error";
                        error: "the card must be a valid",
                    },
                };
            }
            if (!cartList|| cartList.length ===0){
                return{
                    status: 400;
                    result:{
                        status: "error";
                        error: "the card list is empty",
                    }, 
                };
            }

            if (!mongoose.Types.objectId.isValid(cartId)){
                return{
                    status: 400;
                    result:{
                        status: "error";
                        error: "Invalid cart Id.",
                    }, 
                };
    
            }
        
        }

    }

    }