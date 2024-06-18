//import logger from "../../src/utils/logger/index.js";
const selectors = document.querySelectorAll(".deleteButton");
selectors.forEach((each) =>
  each.addEventListener("click", async (product) => {
    console.log(JSON.stringify(product.target));
    try {
      const url = "/api/orders/" + product.target.id;
      const opts = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      let response = await fetch(url, opts);
      response = await response.json();
      //console.log(response);
      if (response.statusCode === 200) {
        alert(response.message);
        location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  })
);
const opts = {
  method: "POST",
  headers: {
    "Content-Type": "aplication/json",
  },
};
document.querySelector("#checkout_btn").onclick = () =>
  fetch("/api/payments/checkout", opts)
    .then((res) => res.json())
    .then((res) => location.replace(res.url));
