import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/index.factory.js";

const { products } = dao;
const requester = supertest("http://localhost:" + process.env.PORT + "/api");

describe("Testeando API", () => {
  const user = {
    name: "SUPERTEST",
    email: "coder@coder.com",
    password: "mati1234",
    role: 1,
    verified: true,
  };
  let token = {};
  it("Registro de un usuario exitoso", async function () {
    this.timeout(10000);
    const response = await requester.post("/sessions/register").send(user);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(201);
  });
  it("Inicio de sesión exitoso", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { statusCode, headers } = response;
    token.key = headers["set-cookie"][0].split("=")[0];
    token.value = headers["set-cookie"][0].split("=")[1];
    expect(statusCode).to.be.equals(200);
  });
  let uid;
  it("Verifico usuario", async () => {
    const response = await requester.get(`/users/?email=${user.email}`);
    const { statusCode, _body } = response;
    uid = _body.response.docs[0]._id;
    expect(statusCode).to.be.equals(200);
  });
  it("Cierre de sesión exitoso", async () => {
    const response = await requester
      .post("/sessions/signout")
      .set("Cookie", [token.key + "=" + token.value]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });
  it("Eliminación de un usuario exitosa", async () => {
    const response = await requester.delete("/users/" + uid);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });
});
