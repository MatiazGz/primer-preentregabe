import { users } from "../data/mongo/managger.mongo.js";
import sendEmail from "../utils/sendEmail.util.js";

class UsersService {
  constructor() {
    this.model = users;
  }
  create = async (data) => await this.model.create(data);
  read = async ({ filter, options }) =>
    await this.model.read({ filter, options });
  stats = async (id) => await this.model.stats(id);
  readOne = async (id) => await this.model.readOne(id);
  readByField = async (id) => await this.model.readByField(email);
  update = async (data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
  register = async (data) => {
    try {
      await sendEmail(data)
    } catch (error) {
      throw error
    }
  }
}

const service = new UsersService();
export default service;
