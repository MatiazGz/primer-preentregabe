import fs from "fs";
import crypto from "crypto";

class UsersManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      throw error;
    }
  }
  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }
  async createUser(data) {
    try {
      if (!data.name || !data.email) {
        const error = new Error("Nombre e email requeridos");
        error.statusCode = 400;
        throw error;
      }
      const event = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        photo: data.photo || "photo",
        email: data.email,
      };
      this.users.push(event);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("crear " + event.id);
      return event.id;
    } catch (error) {
      throw error;
    }
  }
  readUsers() {
    try {
      if (this.users.length === 0) {
        const error = new Error("No se encontraron usuarios!");
        error.statusCode = 404;
        throw error;
      } else {
        console.log(this.users);
        return this.users;
      }
    } catch (error) {
      throw error;
    }
  }
  readOne(id) {
    try {
      const one = this.users.find((each) => each.id === id);
      if (!one) {
        const error = new Error("No se encontraron usuarios!");
        error.statusCode = 404;
        throw error;
      } else {
        console.log("leer " + one);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
  async removeUserById(id) {
    try {
      let one = this.users.find((each) => each.id === id);
      if (!one) {
        const error = new Error("No se encontraron usuarios!");
        error.statusCode = 404;
        throw error;
      } else {
        this.users = this.users.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.users, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("borrado " + id);
        return id;
      }
    } catch (error) {
      throw error;
    }
  }
  async updateUser(userId, newData) {
    try {
      const userIndex = this.users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
        const error = new Error("No se encontraron usuarios!");
        error.statusCode = 404;
        throw error;
      }

      const updatedUser = {
        ...this.users[userIndex],
        ...newData,
      };

      this.users[userIndex] = updatedUser;

      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);

      console.log("Usuario actualizado:", productId);
      return userId;
    } catch (error) {
      throw error;
    }
  }
}

const users = new UsersManager("./src/data/fs/files/users.json");
export default users;
