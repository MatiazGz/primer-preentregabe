class EventManager {
  static events = [];
  //# para definir propiedad privada (para usarse solo dentro de la clase)
  static #perGain = 0.3;
  static #totalGain = 0;
  constructor(data) {
    this.id =
      EventManager.events.length === 0
        ? 1
        : EventManager.events[EventManager.events.length - 1].id + 1;
    this.name = data.name;
    this.place = data.place;
    this.price = data.price || 10;
    this.capacity = data.capacity || 50;
    this.date = data.date || new Date();
    EventManager.events.push(this);
  }
  createEvent (data) {
    const event ={        
    id: EventManager.events.length === 0
    ? 1
    : EventManager.events[EventManager.events.length - 1].id + 1,
    name: data.name,
    place: data.place,
    price: data.price || 10,
    capacity: data.capacity || 50,
    date: data.date || new Date()    
    }
    EventManager.events.push(event)
  }
  read (){
    return EventManager.events
  }
  readByID (id) {
    return EventManager.events.find((each) => each.id === Number(id))
  }
  soldTicket (quantity,eventId) {
    const event = this.readByID(eventId) // guardo el evento a modificar (disminuir capacidad al vender entradas)
    event.capacity = event.capacity - quantity 
    EventManager.#totalGain = EventManager.#totalGain + quantity*event.price*EventManager.#perGain
    return true

  }
  getGain(){
    return EventManager.#totalGain
  }
}

const events = new EventManager({
  name: "Mega Death",
  place: "showcase",
});
events.createEvent ({
  name: "Arctic Monkeys",
  place: "showcase",
});
events.createEvent ({
  name: "Guns n Roses",
  place: "showcase",
});
events.createEvent ({ 
    name: "Muse", 
    place: "showcase" 
});
events.createEvent ({  
    name: "Eminem", 
    place: "showcase" 
});


events.soldTicket(5,2)
events.soldTicket(9,5)
console.log (events.read ())
console.log (events.getGain())


