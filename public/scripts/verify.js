const selector = document.querySelector("#verify");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#emailv").value,
      code: document.querySelector("#code").value,
    };
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(data), 
    };
    let response = await fetch("/api/sessions/verify", opts);
    response;
    if (response.statusCode === 200) {
      location.replace("/");
    }
  } catch (error) {
    alert(error.message);
  }
});
