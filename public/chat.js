const socket = io();

const user = {};

Swal.fire({
    title:"Escribe tu nick:",
    input:"text",
    inputvalidator: nickname=> (!nickname && "escribe tu nick:"),
    allowOutsideClick: false

}).then(obj=>{
    user.name = obj.value 
    document.querySelector("#name").innerHTML = user.name
    socket.emit("user");
})

const newChat = document.querySelector("#text")
newChat.addEventListener("keyup", event => {
    if(event.key === "Enter") {
        socket.emit("new chat",{name: user.name, message: newChat.value})
        newChat.value = ""
    }
})

socket.on("all", data=>{
    data = data.map(each=>`<p><span class="fw-bold">${each.name}</span>${each.message}</p>`).join("")
    document.querySelector("#chats").innerHTML = data
})