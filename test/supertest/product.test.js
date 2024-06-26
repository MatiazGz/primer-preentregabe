import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/index.factory.js";
const { products } = dao;

const requester = supertest("http://localhost:" + process.env.PORT + "/api");

const model = products;

describe("Testing SERVER API: USER + PRODUCT (CREATE/READ/UPDATE/DELETE)", () => {
    const user = {
        name: "SUPERTEST",
        lastName:"TESTING",
        email: "nico@coder.com",
        password: "mati1234",
        role: "ADMIN",
        verified: true,
    };
    const product = {
        title: "SUPERTEST",
        category: "TEST",
        price: 100,
        stock: 20,
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
    it("Verificar usuario", async () => {
        const response = await requester.get(`/users/?email=${user.email}`);
        const { statusCode, _body } = response;
        uid = _body.response.docs[0]._id;
        expect(statusCode).to.be.equals(200);
    });
    let pid;
    it("Creación de un producto con éxito", async () => {
        const one = await model.create(product);
        pid = one._id;
        expect(one).to.have.property("_id");
    });
    it("Lectura del producto", async () => {
        const one = await model.readOne(pid);
        expect(one).to.have.property("_id");
    });
    it("Actualización del producto", async () => {
        const before = await model.readOne(pid);
        const one = await model.update(pid, { title: "SUPERTEST ACTUALIZADO" });
        expect(one.title).not.to.be.equals(before.title);
    });
    it("Eliminación del producto", async () => {
        const one = await model.destroy(pid);
        expect(one).to.have.property("_id");
    });
    it("Cerrado de sesión exitoso", async () => {
        const response = await requester.post("/sessions/signout").set("Cookie", [token.key + "=" + token.value]);
        const { statusCode } = response;
        expect(statusCode).to.be.equals(200);
    });
    it("Eliminación de un usuario correctamente", async () => {
        const response = await requester.delete("/users/" + uid);
        const { statusCode } = response;
        expect(statusCode).to.be.equals(200);
    });
});