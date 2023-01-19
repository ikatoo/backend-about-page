import { beforeAll, describe, expect, test } from "vitest";
import postgres from "../postgres";
import PostgresSkills from "./PostgresSkills";

describe("Postgres Skills Repository", () => {
  const mock = [
    { title: "nodejs" },
    { title: "git" },
    { title: "postgres" },
    { title: "mysql" },
    { title: "reactjs" },
  ];

  const repository = new PostgresSkills();

  beforeAll(async () => {
    await postgres.none("delete from skills");
  });

  test("should insert skill data", async () => {
    const { createSkill } = repository;
    mock.forEach(async (skill) => {
      await expect(createSkill(skill)).resolves.not.toThrowError();
    });
  });

  test("should get all skills data", async () => {
    const { getAllSkills } = repository;

    const skills = await getAllSkills();
    expect(expect.arrayContaining(skills)).toEqual(mock);
  });

  test("should delete a skill data", async () => {
    const { deleteSkill, getAllSkills } = repository;

    await expect(deleteSkill("mysql")).resolves.not.toThrowError();

    await expect(getAllSkills()).resolves.toEqual(
      expect.arrayContaining([
        { title: "nodejs" },
        { title: "git" },
        { title: "postgres" },
        { title: "reactjs" },
      ])
    );
  });
});
