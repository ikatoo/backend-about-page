import { AboutPageWithSkills } from "@/application/IAboutPageApplication";
import postgres from "@/infra/database/postgres";
import request from "supertest";
import { describe, expect, test } from "vitest";

import app from "../../app";

describe("Express - About Page", () => {
  const mock: AboutPageWithSkills = {
    title: "title test supertest",
    description: "desc test supertest",
    skills: [{ title: "docker" }, { title: "git" }, { title: "nodejs" }],
    avatarURL: "avatar url",
    avatarALT: "alt of the avatar",
  };

  test("should create about page", async () => {
    await postgres.none("delete from about_page");
    await postgres.none("delete from skills");

    const response = await request(app).post("/about").send(mock);
    const aboutPage = await postgres.one("select * from about_page");
    const skills = await postgres.manyOrNone(
      "select * from skills order by title"
    );

    expect(response.status).toBe(201);
    expect(aboutPage).toStrictEqual({
      title: mock.title,
      description: mock.description,
      avatar_url: mock.avatarURL,
      avatar_alt: mock.avatarALT,
    });
    expect(skills).toStrictEqual(mock.skills);
  });

  test("should get about page data", async () => {
    const exist = await postgres.manyOrNone("select * from about_page");
    !exist &&
      (await postgres.none(
        "insert into about_page (title,description, avatar_url, avatar_alt values ($1,$2,$3,$4)",
        [mock.title, mock.description, mock.avatarURL, mock.avatarALT]
      ));
    const response = await request(app).get("/about").send();
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(mock);
  });

  test.skip("should update about page", async () => {
    const response = await request(app).get("/about").send();
    expect(response.status).toBe(200);
    expect(response.body).toBe(mock);
  });

  test("should delete about page", async () => {
    const response = await request(app).delete("/about").send();
    const exist =
      (await postgres.oneOrNone("select * from about_page")) ||
      (await postgres.oneOrNone("select * from skills"));

    expect(response.status).toBe(204);
    expect(exist).toBeNull()
  });
});
