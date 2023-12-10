class EventManager {
  static events = [];
  //# para definir propiedad privada (para usarse solo dentro de la clase)
  static #pergain = 0.3;
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
}

const events = new EventManager({
  name: "Mega Death",
  place: "showcase",
});
events.create ({
  name: "Arctic Monkeys",
  place: "showcase",
});
events.create ({
  name: "Guns n Roses",
  place: "showcase",
});
events.create({ 
    name: "Muse", 
    place: "showcase" 
});
events.create ({  
    name: "Eminem", 
    place: "showcase" 
});
console.log (events.read);
