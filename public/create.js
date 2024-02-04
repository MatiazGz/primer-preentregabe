const socket = io();

socket.on("products", (data) => {
  const template = data
  .map(
      (each) => `
    <div class="card" style="width: 18rem;">
    <img src="${each.photo}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${each.title}</h5>
      <p class="card-text">${each.price}</p>
    </div>
  </div>
  `
    )
    .join("");
  document.querySelector("#items").innerHTML = template;
});

document.querySelector("#newItem").addEventListener("click", (product) => {
  product.preventDefault();
  const title = document.querySelector("#title").value;
  const photo = document.querySelector("#photo").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const data = {};
  title && (data.name = title);
  photo && (data.photo = photo);
  price && (data.price = price);
  stock && (data.stock = stock);
  socket.emit("newProduct", data);
});
