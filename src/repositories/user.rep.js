import UserDTO from "../dto/users.dto.js";
import dao from "../data/index.factory.js";

const { users } = dao;

class UsersRep {
  constructor() {
    this.model = users;
  }
  create = async (data) => await this.model.create(new UserDTO(data));
  read = async ({ filter, options }) =>
    await this.model.read({ filter, options });
  stats = async (id) => await this.model.stats(id);
  readOne = async (id) => await this.model.readOne(id);
  readByField = async (email) => await this.model.readByField(email);
  update = async (data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const repository = new UsersRep();
export default repository;
