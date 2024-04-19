import winston from "./winston.util";
process.on("exit", (code) => {
  winston.INFO(JSON.stringify("el proceso terminó con código:" + code));
});
process.exit(1);
