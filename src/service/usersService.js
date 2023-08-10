import { usersModels } from '../daos/models/usersModels';
import EErros from '../../errors/enums';
import CustomError from "../../errors/custom-error";

export class mongoUsers {
  validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      CustomError.createError({
        name: "User creation error",
        message: "please complete firstName, lastname and email.",
        code: EErros.INVALID_USER_ERROR,
      });
    }
  }
  async getAll() {
    const users = await usersModels.find({});
    return users;
  }

  async createOne(firstName, lastName, email) {
    this.validateUser(firstName, lastName, email);
    const userCreated = await usersModels.create({ firstName, lastName, email });
    return userCreated;
  }

  async deletedOne(_id) {
    const deleted = await usersModels.deleteOne({ _id: _id });
    return deleted;
  }

  async updateOne(_id, firstName, lastName, email) {
    if (!_id) throw new Error('invalid _id');
    this.validateUser(firstName, lastName, email);
    const userUptaded = await usersModels.updateOne({ _id: id }, { firstName, lastName, email });
    return userUptaded;
  }
}