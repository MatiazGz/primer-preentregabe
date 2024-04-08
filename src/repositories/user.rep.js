import UserDTO from "../dto/users.dto.js";
import dao from "../data/index.factory.js";

const { users } = dao;
class UserRep {
  constructor() {
    this.model = users;
  }
  create = async (data) => {
    data = new UserDTO(data);
    const response = await this.model.create(data);
    return response;
  };
  read = async ({ filter, options }) =>
    await this.model.read({ filter, options });
  readOne = async (id) => await this.model.readOne(id);
  readByField = async (email) => await this.model.readByField(email);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const repository = new UserRep();
export default repository;
