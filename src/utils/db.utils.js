import { connect } from "mongoose";
import logger from "./logger/index.js";

const dbConnection = async () => {
  try {
    await connect(process.env.DB_LINK);
    logger.INFO("database connected");
  } catch (error) {
    logger.WARN(error.message);
  }
};

export default dbConnection;
