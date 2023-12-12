class ProductManager {
  static #products = [];
  constructor() {}

  createProduct({ title, photo, ...data }) {
    try {
        if(!title || !photo){
            throw new Error("Por favor ingrese titulo y foto del producto")
        }
        const product = {
            id:
              ProductManager.#products.length === 0
                ? 1
                : ProductManager.#products[ProductManager.#products.length - 1].id+1,
            title,
            photo,
            price: data.price || 10,
            stock: data.stock || 50,
          };
          ProductManager.#products.push(product);
          return product;
    } catch (error) {
        return error;       
    }
    
  }
  read() {
    return ProductManager.#products;
  }
  readOne(id) {
    return ProductManager.#products.find((each) => each.id === Number(id));
  }
}

const products = new ProductManager();

console.log(
  products.createProduct({
    title: "Iphone",
    photo:
      "https://http2.mlstatic.com/D_Q_NP_656548-MLA46114829749_052021-O.webp",
  })
);

console.log(
    products.createProduct({
      title: "Playstation",
      photo:
        "https://http2.mlstatic.com/D_NQ_NP_951973-MLA70217884926_062023-O.webp",
    })
  );

  console.log(
    products.createProduct({
      title: "Dron",
      photo: "https://http2.mlstatic.com/D_NQ_NP_797396-MLA54056673569_022023-O.webp"
    })
  );

console.log(products.readOne(2))