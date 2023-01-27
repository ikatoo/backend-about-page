import { AboutPageWithSkills } from "@/application/IAboutPageApplication";
import postgres from "@/infra/database/postgres";
import request from "supertest";
import { describe, expect, test } from "vitest";

import app from "../../app";
import { aboutPageMock } from "@/shared/aboutPageMock";

describe("Express - About Page", () => {
  const mock: AboutPageWithSkills = aboutPageMock

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
      illustration_url: mock.illustrationURL,
      illustration_alt: mock.illustrationALT,
    });
    expect(skills).toStrictEqual(mock.skills);
  });

  test("should get about page data", async () => {
    const exist = await postgres.manyOrNone("select * from about_page");
    !exist &&
      (await postgres.none(
        "insert into about_page (title,description, illustration_url, illustration_alt values ($1,$2,$3,$4)",
        [mock.title, mock.description, mock.illustrationURL, mock.illustrationALT]
      ));
    const response = await request(app).get("/about").send();
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(mock);
  });

  test("should update about page", async () => {
    const newAboutPage: AboutPageWithSkills = {
      title: "new title - updated",
      description: "new description - updated",
      skills: [
        { title: "docker" },
        { title: "postgres" },
        { title: "reactjs" },
        { title: "vitest" },
      ],
      illustrationURL: "new illustration url",
      illustrationALT: "new alt",
    };
    const response = await request(app).put("/about").send(newAboutPage);
    const aboutPage = await postgres.one("select * from about_page");
    const skills = await postgres.manyOrNone(
      "select * from skills order by title"
    );

    expect(response.status).toBe(201);
    expect(aboutPage).toStrictEqual({
      title: newAboutPage.title,
      description: newAboutPage.description,
      illustration_url: newAboutPage.illustrationURL,
      illustration_alt: newAboutPage.illustrationALT,
    });
    expect(skills).toStrictEqual(newAboutPage.skills);
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
