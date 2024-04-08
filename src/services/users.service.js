import repository from "../repositories/user.rep.js";
import sendEmail from "../utils/sendEmail.util.js";

class UsersService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => await this.repository.create(data);
  read = async ({ filter, options }) =>
    await this.repository.read({ filter, options });
  readOne = async (id) => await this.repository.readOne(id);
  readByField = async (email) => await this.repository.readByField(email);
  update = async (data) => await this.repository.update(id, data);
  destroy = async (id) => await this.repository.destroy(id);
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
