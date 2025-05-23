import UserModel from '../models/user.model.js';
export default class UserRepository {
  async getById(id) { return UserModel.findById(id); }
  async getByEmail(email) { return UserModel.findOne({ email }); }
  async create(data) { return UserModel.create(data); }
}
