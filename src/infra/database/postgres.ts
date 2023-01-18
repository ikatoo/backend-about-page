import env from "@/env";
import pgPromise from "pg-promise";

const pgp = pgPromise({});
const postgres = pgp({
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  database: env.POSTGRES_DB,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  max: 30,
});

export const createDB = async () => {
  await postgres.none(`create table if not exists about_page (
    title varchar(100) NOT NULL, 
    description text NOT NULL,
    avatar_url text,
    avatar_alt text
  )`);
  await postgres.none(`create table if not exists skills (
    id varchar(100) NOT NULL UNIQUE PRIMARY KEY, 
    title varchar(100) NOT NULL
  )`);
};

export const ReCreateDB = async () => {
  await postgres.none("drop table if exists about_page");
  await postgres.none("drop table if exists skills");
  await createDB();
};

createDB();

export default postgres;
