import winston from "../../src/utils/winston.util.js";
const selectors = document.querySelectorAll(".deleteButton");
selectors.forEach((each) =>
  each.addEventListener("click", async (product) => {
    winston.INFO(JSON.stringify(product.target));
    try {
      const url = "/api/orders/" + product.target.id;
      const opts = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      let response = await fetch(url, opts);
      response = await response.json();
      //console.log(response);
      if(response.statusCode===200) {
        alert(response.message);
        location.reload()
      }
    } catch (error) {
      alert(error.message);
    }
  })
);