import env from "@/env";
import pgPromise from "pg-promise";
import { IClient } from "pg-promise/typescript/pg-subset";

const pgp = pgPromise({});
const postgres = pgp({
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  database: env.POSTGRES_DB,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  max: 30,
  // allowExitOnIdle: env.NODE_ENV.includes('prod') ? false : true,
  allowExitOnIdle: true,
});

export const createDB = async () => {
  await postgres.none(`create table if not exists about_page (
    title varchar(100) NOT NULL UNIQUE, 
    description text NOT NULL,
    avatar_url text,
    avatar_alt text
  )`);
  await postgres.none(`create table if not exists skills (
    title varchar(100) NOT NULL UNIQUE
  )`);
};

export const ReCreateDB = async () => {
  await postgres.none("drop table if exists about_page");
  await postgres.none("drop table if exists skills");
  await createDB();
};

createDB();

export default postgres;
