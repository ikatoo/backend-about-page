import { beforeAll, describe, expect, test } from "vitest";
import postgres from "../postgres";
import PostgresSkills from "./PostgresSkills";

describe("Postgres Skills Repository", () => {
  const mock = [
    { title: "git" },
    { title: "mysql" },
    { title: "nodejs" },
    { title: "postgres" },
    { title: "reactjs" },
  ];

  const repository = new PostgresSkills();

  beforeAll(async () => {
    await postgres.none("delete from skills");
  });

  test("should insert skill data", async () => {
    for (let index = 0; index < mock.length; index++) {
      await expect(
        repository.createSkill(mock[index])
      ).resolves.not.toThrowError();
    }
  });

  test("should get all skills data", async () => {
    await expect(repository.getAllSkills()).resolves.not.toThrowError();
  });

  test("should delete a skill data", async () => {
    await expect(repository.deleteSkill("mysql")).resolves.not.toThrowError();
  });
});
