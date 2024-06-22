const persistence = process.env.MODE || "PROD";

let logger;

switch (persistence) {
  case "TEST":const { default: winstonTest } = await import("./winstonTest.util.js");
  logger = winstonTest;
    break;
  case "DEV":const { default: winstonDev } = await import("./winstonDev.util.js");
  logger = winstonDev;
    break;
  default:
    const { default: winstonProd } = await import("./winston.util.js");
    logger = winstonProd;
    break;
}

export default logger;
