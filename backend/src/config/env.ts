import dotenv from "dotenv";
dotenv.config();

const getRequiredEnvVar = (variable: string): string => {
  const value = process.env[variable];
  if (typeof value === "undefined") {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
  return value;
};

export default {
  DATABASE_URL: getRequiredEnvVar("DATABASE_URL"),
  JWT_SECRET: getRequiredEnvVar("JWT_SECRET"),
  JWT_EXPIRES_IN: getRequiredEnvVar("JWT_EXPIRES_IN"),
  NYT_API_KEY: getRequiredEnvVar("NYT_API_KEY"),
  STRIPE_SECRET_KEY: getRequiredEnvVar("STRIPE_SECRET_KEY"),
  STRIPE_WEBHOOK_SECRET: getRequiredEnvVar("STRIPE_WEBHOOK_SECRET"),

  PORT: Number(process.env.PORT) || 3000,
};
