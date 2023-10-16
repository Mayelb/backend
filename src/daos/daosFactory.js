import CONFIG from "../../utils/config";

let productDao;
let cartDao;
let userDao;
let ticketDao;

switch (CONFIG.DATASOURCE) {
  case "MEMORY": {
    
    break;
  }
  case "MONGO": {
    const {ProductsMongo } = await import("./mongo/productMongo.js");
    productDao = new  ProductsMongo();
    const { CartMongo } = await import("./mongo/cartMongo.js");
    cartDao = new CartMongo();
    const { UsersMongo } = await import("./mongo/usersMongo.js");
    userDao = new UsersMongo();
    const { TicketMongo } = await import("./mongo/ticketMongo.js");
    ticketDao = new TicketMongo();
    break;
  }
  default: {
    throw new Error(
      "Debes elegir un tipo de persistencia válido: MEMORY o MONGO"
    );
  }
}

const getDAOS = () => {
  return {
    productDao,
    cartDao,
    userDao,
    ticketDao,
  };
};

export default getDAOS;