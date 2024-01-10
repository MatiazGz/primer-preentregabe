class OrderManager {
    static #orders = [];
    constructor() {}
  
    createProduct({ pid, uid,quantity,state, ...data }) {
      try {
        if (!pid || !uid || quantity|| state) {
          throw new Error("no se puede continuar");
        }
        const Order = {
          id:
            OrderManager.#orders.length === 0
              ? 1
              : OrderManager.#orders[OrderManager.#orders.length - 1].id +
                1,
          pid,
          uid,
          quantity,
          state,
        };
        OrderManager.#orders.push(order);
        return order;
      } catch (error) {
        return error.message;
      }
    }
    read() {
      return OrderManager.#orders;
    }
    readOne(id) {
      return OrderManager.#orders.find((each) => each.id === Number(id));
    }
  }
  
  const orders = new OrderManager();