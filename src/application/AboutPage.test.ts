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
      { title: "tdd" },
      { title: "jest" },
      { title: "vitest" },
    ].sort(),
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

  test.skip("should get the About Page", async () => {
    const { skills, ...aboutPage } = await aboutPageUseCase.getAboutPage();
    const { skills: skillsMock, ...newAboutPageData } = aboutPageMock;

    expect(aboutPage).toBe(newAboutPageData);
  });

  test.skip("should delete a Skill", async () => {
    await expect(
      aboutPageUseCase.deleteSkill("jest")
    ).resolves.not.toThrowError();
    // await expect(
    //   (
    //     await aboutPageUseCase.getAboutPage()
    //   ).skills
    // ).resolves.not.toContain({ title: "jest" });
  });

  // test("should delete the About Page", async () => {
  //   await expect(aboutPageUseCase.deleteAboutPage()).resolves.not.toThrowError();
  //   await expect(aboutPageUseCase.getAboutPage()).resolves.toEqual({
  //     skills: expect.arrayContaining([
  //       { title: "docker" },
  //       { title: "tdd" },
  //       { title: "vitest" },
  //     ]),
  //   });
  // });
});
