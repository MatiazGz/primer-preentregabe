import { config } from "dotenv";
import args from "./args.util.js";

const { env } = args;
const path =
  env === "prod" ? "./.env.prod" : env === "dev" ? "./.env.dev" : "./.env.test";
config({ path });

export default {
  PORT: process.env.PORT,

  DB_LINK: process.env.DB_LINK,

  SECRET_KEY: process.env.SECRET_KEY,

  SECRET: process.env.SECRET,

  GITHUB_CLIENT: process.env.GITHUB_CLIENT,
  GITHUB_ID: process.env.GITHUB_ID,
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_CLIENT: process.env.GOOGLE_CLIENT,
};
