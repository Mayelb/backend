 import classMongo from "./classService";
 import chatModels from "../daos/models/chatModel.js"
 
 export class chatMongo extends classMongo {
    constructor() {
      super("messages", chatModels);
    }
  }
  
  export default mongoChat;