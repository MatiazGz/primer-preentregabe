import express from "express";
import events from "./data/fs/events.fs.js";
import users from "./data/fs/users.fs.js";
import products from "./data/fs/product.manager.fs.js";

const server = express();

const PORT = 8080;
const ready = console.log("server ready on port " + PORT);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

//endpoints:

//        EVENTS:

//create events

server.post("/api/events", async (req, res) => {
  try {
    const data = req.body;
    const response = await events.createEvent(data);
    if (response === "se requiere nombre y lugar") {
      return res.json({
        statusCode: 403,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//read events

server.get("/api/events", async (req, res) => {
  try {
    const all = await events.readEvents();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// read one

server.get("/api/events/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const one = await events.readEventById(eid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//put

server.put("/api/events/:eid/:quantity", async (req, res) => {
  try {
    const { eid, quantity } = req.params;
    const response = await events.soldticket(quantity, eid);
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "cantidad disponible: " + response,
      });
    } else if (response === "no queda disponibilidad de ese evento") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//destroy event

server.delete("/api/events/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const response = await events.removeEventById(eid);
    if (response === "no hay ningun evento") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//      PRODUCTS:

//create products

server.post("/api/products", async (req, res) => {
  try {
    const data = req.body;
    const response = await products.createProduct(data);
    if (response === "se requiere nombre y foto") {
      return res.json({
        statusCode: 403,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//read products

server.get("/api/products", async (req, res) => {
  try {
    const all = await products.readProducts();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// products, read one

server.get("/api/products/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const one = await products.readProductById(eid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// products, put

server.put("/api/products/:eid/:quantity", async (req, res) => {
  try {
    const { eid, quantity } = req.params;
    const response = await products.soldProduct(quantity, eid);
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "cantidad disponible: " + response,
      });
    } else if (response === "no queda disponibilidad de ese producto") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//destroy products

server.delete("/api/products/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const response = await products.removeProductById(eid);
    if (response === "no hay ningun producto") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//        USERS:

// create user
server.post("/api/users", async (req, res) => {
  try {
    const data = req.body;
    const response = await users.createUser(data);
    if (response === "Nombre e email requeridos") {
      return res.json({
        statusCode: 403,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//read users

server.get("/api/users", async (req, res) => {
  try {
    const all = await users.readUsers();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// users, read one

server.get("/api/users/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const one = await users.readOne(eid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//users, destroy

server.delete("/api/users/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const response = await users.removeUserById(eid);
    if (response === "no hay ningun usuario") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});
