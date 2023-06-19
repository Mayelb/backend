 import classMongo from "./classMongo";
 import chatModels from "./models/chatModel.js"
 
 export class chatMongo extends classMongo {
    constructor() {
      super("messages", chatModels);
    }
  }
  
  export default mongoChat;