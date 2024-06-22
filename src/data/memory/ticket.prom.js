import logger from "../../utils/logger/index.js";
const fs = require("fs");

const ruta = "./data/events.json";
const datos = JSON.stringify([
  {
    name: "Mega Death",
    place: "showcase",
  },
  {
    name: "Arctic Monkeys",
    place: "showcase",
  },
  {
    name: "Guns n Roses",
    place: "showcase",
  },
  {
    name: "Muse",
    place: "showcase",
  },
]);
fs.promises
  .writeFile(ruta, datos)
  .then((resultado) => logger.INFO(JSON.stringify(resultado)))
  .catch((error) => logger.WARN(error.message));
