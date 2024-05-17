import assert from "assert";
import "dotenv/config.js";
import dao from "../../src/data/index.factory.js";

const { products } = dao;

describe("Testeando Modelo products", () => {
    const model = products;
    const data = { title: "Product", category: "test" };
    let id;
    it("La creación de un producto requiere un objeto con la propiedad 'title'", () => {
        assert.ok(data.title);
    });
    it("La creación de un producto no necesita un objeto con la propiedad 'photo'", () => {
        assert.strictEqual(data.photo, undefined);
    });
    it("La función creadora de un producto, devuelve un objeto", async () => {
        const one = await model.create(data);
        assert.strictEqual(typeof one, "object");
    });
    it("La función creadora de un producto, devuelve un objeto con la propiedad '_id'", async () => {
        const one = await model.create(data);
        id = one._id;
        assert.ok(one._id);
    });
    it("La función para leer productos debe devolver un objeto con la propiedad 'prev'", async () => {
        const all = await model.read({
            page: 2,
            limit: 4,
        });
        assert.ok(all.prev);
    });
    it("La función para leer productos debe devolver un objeto con la propiedad 'next'", async () => {
        const all = await model.read({
            page: 2,
            limit: 4,
        });
        assert.ok(all.next);
    });
    it("La función para leer productos debe devolver un objeto con la propiedad 'docs'", async () => {
        const all = await model.read({
            page: 2,
            limit: 4,
        });
        assert.ok(all.docs);
    });
    it("La función para actualizar un producto debe devolver un producto actualizado", async () => {
        const before = await model.readOne(id);
        const one = await model.update(id, { title: "nombre actualizado" });
        assert.strictEqual(before.title !== one.title, true);
    });
    it("La función para eliminar un producto debe efectivamente eliminar un producto", async () => {
        await model.destroy(id);
        const after = await model.readOne(id);
        assert.strictEqual(after, null);
    });
});