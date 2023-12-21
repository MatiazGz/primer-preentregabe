class EventManager {
  static #events = [];
  //# para definir propiedad privada (para usarse solo dentro de la clase)
  static #perGain = 0.3;
  static #totalGain = 0;
  constructor(data) {
    this.id =
      EventManager.#events.length === 0
        ? 1
        : EventManager.#events[EventManager.#events.length - 1].id + 1;
    this.name = data.name;
    this.place = data.place;
    this.price = data.price || 10;
    this.capacity = data.capacity || 50;
    this.date = data.date || new Date();
    EventManager.#events.push(this);
  }
  createEvent({ name, place, ...data }) {
    try {
      if (!name || !place) {
        throw new Error("por favor ingrese nombre y lugar");
      }
      const event = {
        id:
          EventManager.#events.length === 0
            ? 1
            : EventManager.#events[EventManager.#events.length - 1].id + 1,
        name,
        place,
        price: data.price || 10,
        capacity: data.capacity || 50,
        date: data.date || new Date(),
      };
      EventManager.#events.push(event);
    } catch (error) {
      return error.message;
    }
  }
  read() {
    try {
      if (EventManager.#events.length === 0) {
        throw new Error("No se encontro el evento");
      } else {
        return EventManager.#events;
      }
    } catch (error) {
      return error.message;
    }
  }
  readOne() {
    try {
      let singleEvent = EventManager.#events.find(
        (each) => each.id === Number(id)
      );
      if (singleEvent) {
        return singleEvent;
      } else {
        throw new Error("no se encontro el evento");
      }
    } catch (error) {
      return error.messaje;
    }
  }
  soldTicket(quantity, id) {
    try {
      if (!(quantity > 0)) {
        throw new Error("Insert valid quantity");
      } else {
        const one = this.readOne(id);
        console.log(one);
        if (typeof one === "string") throw new Error(one);
        if (quantity > one.capacity) throw new Error("No more capacity");
        one.capacity = one.capacity - quantity;
        EventManager.#totalGain =
          EventManager.#totalGain +
          EventManager.#perGain * quantity * one.price;
        return one.capacity;
       }
    } catch (error) {
      return error.messaje;
    }
  }
  getGain(){
    return EventManager.#totalGain
  }
  removeEventById(id){

  }

}