import logger from "./logger/index.js";
process.on("exit", (code) => {
  logger.INFO(JSON.stringify("el proceso terminó con código:" + code));
});
process.exit(1);
