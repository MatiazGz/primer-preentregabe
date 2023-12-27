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
      return error.message;
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
        throw new Error("Nombre e email requeridos");
      }
      const event = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        place: data.place,
        price: data.price || 10,
        capacity: data.capacity || 50,
        date: data.date || new Date(),
      };
      this.users.push(event);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("crear " + event.id);
      return event.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readUsers() {
    try {
      if (this.users.length === 0) {
        throw new Error("No se encontraron usuarios!");
      } else {
        console.log(this.users);
        return this.users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readOne(id) {
    try {
      const one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("no hay ningun usuario con id:" + id);
      } else {
        console.log("leer " + one);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async removeUserById(id) {
    try {
      let one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("no hay ningun usuario");
      } else {
        this.users = this.users.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.users, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("borrado " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const users = new UsersManager("./data/fs/files/users.json");
export default users;
