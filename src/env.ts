import { config } from "dotenv";

config({
  path: ".env",
});

const env = (key: string) => {
  if (process.env[key] === undefined) {
    console.error(`*** ${key} IS UNDEFINED. ***`);
  }
  return `${process.env[key] ?? ""}`;
};

export default {
  POSTGRES_USER: env("POSTGRES_USER"),
  POSTGRES_PASSWORD: env("POSTGRES_PASSWORD"),
  POSTGRES_HOST: env("POSTGRES_HOST"),
  POSTGRES_PORT: parseInt(env("POSTGRES_PORT")),
  POSTGRES_DB: env("POSTGRES_DB"),
};
