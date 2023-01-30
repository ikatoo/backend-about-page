import env from "@/env";
import pgPromise from "pg-promise";

const pgp = pgPromise({});
const postgres = pgp({
  host: env.NODE_ENV.includes("prod") ? env.POSTGRES_HOST : 'localhost',
  port: env.POSTGRES_PORT,
  database: env.POSTGRES_DB,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  max: 30,
  allowExitOnIdle: env.NODE_ENV.includes("prod") ? false : true,
});

export const createDB = async () => {
  await postgres.none(`create table if not exists about_page (
    title varchar(100) NOT NULL UNIQUE, 
    description text NOT NULL,
    illustration_url text,
    illustration_alt text
  )`);
  await postgres.none(`create table if not exists skills (
    title varchar(100) NOT NULL UNIQUE
  )`);
};

createDB();

export default postgres;
