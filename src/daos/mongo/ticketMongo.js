import ClassMongo from "./classMongo";
import { ticketModel } from "../models/ticketModel";

export class TicketMongo extends ClassMongo{
    constructor(){
        super(ticketModel);
    }
}