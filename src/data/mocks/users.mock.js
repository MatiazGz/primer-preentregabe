import { faker } from "@faker-js/faker";
import repository from "../../repositories/user.rep.js";
import createProduct from "./products.mock.js";

function usersMock() {
  return {
    name: faker.person.firstName(),
    email:
      (faker.person.firstName() + faker.person.lastName()).toLowerCase() +
      faker.number.hex(64) +
      "@coder.com",
    password: "mati1234",
  };
}

async function createMocks() {
  try {
    const data = usersMock();
    const user = await repository.create(data);
    for (let i = 1; i <= 2; i++) {
      await createProduct(user._id);
    }
  } catch (error) {
    console.log(error);
  }
}
for (let i = 1; i <= 100; i++) {
  createMocks()
}
console.log("DATA CREATED");