import logger from "../utils/logger/index.js";

const pathHandler = (req, res, next) => {
  logger.WARN(`${req.method} ${req.url} not found path`);
  return res.json({
    status: 404,
    url: `${req.method} ${req.url}`,
    message: ` not found path`,
  });
};

export default pathHandler;
