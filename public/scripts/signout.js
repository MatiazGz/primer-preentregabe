import logger from "../../src/utils/logger/index.js";
fetch("/api/sessions/", { method: "POST" })
  .then((res) => res.json())
  .then((res) => {
    if (res.statusCode === 200) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#registerButton"));
      document
        .querySelector("#loginCont")
        .removeChild(document.querySelector("#loginButton"));
      document.querySelector("#signout").addEventListener("click", async () => {
        try {
          const token = localStorage.getItem("token");
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          };
          let response = await fetch("/api/sessions/signout", opts);
          response = await response.json();
          if (response.statusCode === 200) {
            alert(response.message);
            localStorage.removeItem("token");
            location.replace("/");
          }
        } catch (error) {
          logger.WARN(error.message);
        }
      });
    } else {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#formButton"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#ordersButton"));
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#signout"));
    }
    if (res.response?.role === 0) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#formButton"));
    } else if (res.response?.role === 1) {
      document
        .querySelector(".navbar-nav")
        .removeChild(document.querySelector("#ordersButton"));
    }
  });
