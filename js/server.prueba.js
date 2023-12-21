//requiero los modules necesarios para crear el servidor
// en este caso y por ahora unicamente http
const http = require("http");
//requiero el modulo necesario para gestionar servidores (crearlo , configurarlo y levantarlo)

const server = http.createServer();
// createServer() es el metodo necesario para crear un servidor

//para iniciar el servidor necesito dos parametros:
//puerto donde va a funcionar el servidor (8080)
const PORT = 8080;
//cb para informarnos que el servidor esta funcionando
// importante> recomiendo que muestre en consola el puerto donde el sevidor esta funcionando
const cbReady = () => console.log("server ready on port" + PORT);
//listen() es el metodo necesario para iniciar el servidor
server.listen(PORT, cbReady);
