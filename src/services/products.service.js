import { products } from "../data/mongo/managger.mongo.js";

class ProductsService {
  constructor() {
    this.model = products;
  }
  create = async (data) => {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  read = async ({ filter, orderAndPaginate }) => {
    try {
      const response = await this.model.read({ filter, orderAndPaginate });
      return response;
    } catch (error) {
      throw error;
    }
  };
  readOne = async (id) => {
    try {
      const response = await this.model.readOne(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      const response = await this.model.update(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (id) => {
    try {
      const response = await this.model.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new ProductsService();
export default service;
