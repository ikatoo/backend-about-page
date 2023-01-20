import PostgresAboutPage from "@/infra/database/about-page/PostgresAboutPage";
import PostgresSkills from "@/infra/database/skills/PostgresSkills";
import { beforeAll, describe, expect, test } from "vitest";
import AboutPage from "./AboutPage";
import { AboutPageWithSkills } from "./IAboutPageApplication";
import postgres from "@/infra/database/postgres";

describe("About Page Use Case test", () => {
  const aboutPageMock: AboutPageWithSkills = {
    title: "About page title",
    description: "About page desc",
    skills: [
      { title: "docker" },
      { title: "jest" },
      { title: "tdd" },
      { title: "vitest" },
    ],
    avatarURL: "url of the avatar",
    avatarALT: "this is a avatar",
  };
  const aboutPageRepository = new PostgresAboutPage();
  const skillsRepository = new PostgresSkills();
  const aboutPageUseCase = new AboutPage(aboutPageRepository, skillsRepository);

  beforeAll(async () => {
    await postgres.none("delete from about_page");
    await postgres.none("delete from skills");
  });

  test("should create a About Page", async () => {
    await expect(
      aboutPageUseCase.createAboutPage(aboutPageMock)
    ).resolves.not.toThrowError();
  });

  test("should get the About Page", async () => {
    await aboutPageUseCase.getAboutPage();
  });

  test("should delete a Skill", async () => {
    await expect(
      aboutPageUseCase.deleteSkill("jest")
    ).resolves.not.toThrowError();
  });

  test("should delete the About Page", async () => {
    await expect(
      aboutPageUseCase.deleteAboutPage()
    ).resolves.not.toThrowError();
    await expect(aboutPageUseCase.getAboutPage()).resolves.toBeUndefined();
  });
});
