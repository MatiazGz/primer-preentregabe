const params = new URLSearchParams(location.search);
let selector = document.querySelector("#text");
selector.value = params.get("title");
document.querySelector("#search").addEventListener("click", async (product) => {
  try {
    const text = selector.value;
    location.search = "title=" + text;
  } catch (error) {
    alert(error.message);
  }
});