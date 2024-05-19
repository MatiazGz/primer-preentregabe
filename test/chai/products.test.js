import { expect } from "chai";
import "dotenv/config.js";
import dao from "../../src/data/index.factory.js";
const { products } = dao;

describe("Testing: Products Model", () => {
    const model = products;
    const data = { title: "ProductoTest", category: "test" };
    let id;
    it("La creación del producto requiere un objeto con la propiedad title", () => {
        expect(data).to.have.property("title");
    });
    it("La creación de un producto no necesita un objeto con la propiedad 'photo'", () => {
        expect(data).not.to.have.property("photo");
    });
    it("La creación del producto requiere un objeto con la propiedad category", () => {
        expect(data).to.have.property("category");
    });
    it("La función creadora de un producto, devuelve un objeto", async () => {
        const one = await model.create(data);
        expect(one).to.be.an("object");
    });
    it("La función creadora de un producto, devuelve un objeto con la propiedad '_id'", async () => {
        const one = await model.create(data);
        id = one._id;
        expect(one).to.have.property("_id");
    });
    it("La función para leer productos debe devolver un objeto con las propiedades 'prev', 'next' y 'category'", async () => {
        const all = await model.read({
            page: 1,
            limit: 5,
            category: "test"
        });
        expect(all).to.have.property("prev");
        expect(all).to.have.property("next");
        expect(all).to.have.property("category");
    });
    it("La función para actualizar un producto debe devolver un objeto con el producto actualizado", async () => {
        const before = await model.readOne(id);
        const one = await model.update(id, { title: "Producto" });
        expect(one.title).not.to.be.equals(before.title);
    });
    it("La función para eliminar un producto debe efectivamente eliminarlo", async () => {
        const before = await model.destroy(id);
        const after = await model.readOne(id);
        expect(before).not.to.be.equals(after);
    });
});