import winston from "../utils/winston.util.js";

const pathHandler = (req, res, next) => {
  winston.WARN(`${req.method} ${req.url} not found path`);
  return res.json({
    status: 404,
    url: `${req.method} ${req.url}`,
    message: ` not found path`,
  });
};

export default pathHandler;
