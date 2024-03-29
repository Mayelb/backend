 import ClassMongo from "./classService";
 import productsModel from "../models/productsModel.js"

 export class ProductsMongo extends ClassMongo {
    constructor() {
      super("products", productsModel);
    }
  async get(limit, page, sort, query){
    try{
        const filter = query
        ? { title: { $regex: query.title, $options: "i" } }
        : {};
       
      const all = await this.baseModel.paginate(filter, {
        limit: limit || 10,
        page: page || 1,
        sort: sort || {},
        lean: true,
      });
      return all;
    } catch (err) {
      throw new Error(err);
    }
    }
  }
 