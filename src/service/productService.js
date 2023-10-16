import { ClassService } from "./classService";
import getDAOS from "../daos/daosFactorys";
const { productDao } = getDAOS();
export class ProductService extends ClassService {
  constructor() {
    super(productDao);
  }
  async getAll(limit, page, sort, query) {
    try {
      const all = await this.dao.getAll(limit, page, sort, query);
      return all;
    } catch (err) {
      throw new Error(err);
    }
  }
}