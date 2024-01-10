import fs from "fs";
import crypto from "crypto";

class EventsManager {
  static #perGain = 0.3;
  static #totalGain = 0;

  init() {
    try {
      const exists = fs.existsSync(this.path);

      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        //opcional:
        this.events = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      throw error;
    }
  }
  constructor(path) {
    this.path = path;
    this.events = [];
    this.init();
  }
  async createEvent(data) {
    try {
      if (!data.name || !data.place) {
        const error = new Error("Se requiere nombre y lugar");
        error.statusCode = 400;
        throw error;
      }
      const event = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        place: data.place,
        price: data.price || 10,
        capacity: data.capacity || 50,
        date: data.date || new Date(),
      };
      this.events.push(event);
      const jsonData = JSON.stringify(this.events, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("create " + event.id);
      return event.id;
    } catch (error) {
      throw error;
    }
  }
  readEvents() {
    try {
      if (this.events.length === 0) {
        const error = new Error("No se encontraron eventos!");
        error.statusCode = 404;
        throw error;
      } else {
        console.log(this.events);
        return this.events;
      }
    } catch (error) {
      throw error;
    }
  }
  readEventById(id) {
    try {
      const one = this.events.find((each) => each.id === id);
      if (!one) {
        const error = new Error("No se encontraron eventos!");
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
  async removeEventById(id) {
    try {
      let one = this.events.find((each) => each.id === id);
      if (!one) {
        const error = new Error("No hay ningun evento!");
        error.statusCode = 404;
        throw error;
      } else {
        this.events = this.events.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.events, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("borrado " + id);
        return id;
      }
    } catch (error) {
      throw error;
    }
  }
  async soldticket(quantity, eid) {
    try {
      const one = this.readEventById(eid);
      if (one) {
        if (one.capacity >= quantity) {
          one.capacity = one.capacity - quantity;
          EventsManager.#totalGain =
            EventsManager.#totalGain +
            one.price * quantity * EventsManager.#perGain;
          const jsonData = JSON.stringify(this.events, null, 2);
          await fs.promises.writeFile(this.path, jsonData);
          console.log("capacidad disponible " + one.capacity);
          return one.capacity;
        } else {
          const error = new Error("no queda disponibilidad de ese evento");
          error.statusCode = 400;
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
const events = new EventsManager("./src/data/fs/files/events.json");
export default events;
