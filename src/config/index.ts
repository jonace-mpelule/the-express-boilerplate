import dotenv from "dotenv";

const environment: string = process.env.NODE_ENV || "production"; // Default to production

// Load the appropriate .env file based on NODE_ENV
const envFile = dotenv.config({
  path: `.env.${environment}`, // This will use .env.development, .env.production, or .env.test
});

if (envFile.error) {
  throw new Error("Please include a valid .env file");
}

export default {
  env: environment as "production" | "development" | "test",
  port: parseInt(process.env.PORT, 10),
  logs: {
    morgan: process.env.MORGAN,
  },
  secrets: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  }
};
