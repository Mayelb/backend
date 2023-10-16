import { ClassService } from "./classService";
import getDAOS from "../daos/daos.factory.js";
const { userDao } = getDAOS();

export class UserService extends ClassService {
  constructor() {
    super(userDao);
  }

  async getUserByEmail(email) {
    return await this.dao.getUserByEmail(email);
  }

  async getUserByUsername(username) {
    return await this.dao.getUserByUsername(username);
  }

  async getPurchaser(cart) {
    return await this.dao.getPurchaser(cart);
  }
}