import repository from "../repositories/orders.rep.js";
import OrderDTO from "../dto/orders.dto.js";

class OrdersService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    data = new OrderDTO(data);
    await this.repository.create(data);
  };
  read = async ({ filter, options }) => await this.repository.read({ filter, options });
  readOne = async (id) => await this.repository.readOne(id);
  update = async (data) => await this.repository.update(id, data);
  destroy = async (id) => await this.repository.destroy(id);
}

const service = new OrdersService();
export default service;