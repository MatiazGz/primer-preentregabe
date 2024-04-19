import { connect } from "mongoose";
import winston from "./winston.util.js";

const dbConnection = async () => {
  try {
    await connect(process.env.DB_LINK);
    winston.INFO("database connected");
  } catch (error) {
    winston.WARN(error.message);
  }
};

export default dbConnection;
