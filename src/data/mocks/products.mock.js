import { faker } from "@faker-js/faker";
import repositiry from "../../repositories/product.rep.js"

function productsMock(id) {
  return {
    title: faker.commerce.productName(),
    photo: faker.person.firstName(),
    stock: faker.number.hex(64),
    price: faker.commerce.price({ min: 100, max: 1100 }),
  };
}

export default async function createProduct(id) {
  try {
    const data = productsMock(id)
    await repositiry.create(data)
  } catch (error) {
    console.log(error)
  }
}