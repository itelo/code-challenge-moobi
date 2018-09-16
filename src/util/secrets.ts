import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  logger.debug(
    "Using .env.example file to supply config environment variables"
  );
  dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const isProd = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
const isTest = ENVIRONMENT === "test";

export const SESSION_SECRET = process.env["SESSION_SECRET"];

// Should be if
export const MONGODB_URI = isProd
  ? process.env["MONGODB_URI"]
  : isTest
    ? process.env["MONGODB_URI_LOCAL_TEST"]
    : process.env["MONGODB_URI_LOCAL"];

if (!SESSION_SECRET) {
  logger.error("No client secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}

if (!MONGODB_URI) {
  logger.error(
    "No mongo connection string. Set MONGODB_URI environment variable."
  );
  process.exit(1);
}