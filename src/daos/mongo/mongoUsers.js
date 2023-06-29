import { usersModels } from '../../daos/mongo/models/usersModels';


export class mongoUsers {
  validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      
      throw new Error('validation error: please complete firstName, lastname and email.');
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