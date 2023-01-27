import { AboutPageProps } from "@/domain/about-page/AboutPage";
import { IAboutPage } from "@/domain/about-page/IAboutPage";
import postgres from "../postgres";

type AboutPageWithoutSkills = Omit<AboutPageProps, "skills">;

export default class PostgresAboutPage implements IAboutPage {
  async getAboutPage(): Promise<AboutPageProps | undefined> {
    const aboutPage = await postgres.oneOrNone("select * from about_page");

    if (!aboutPage) return;

    const mappedAboutPage: AboutPageWithoutSkills = {
      title: aboutPage.title,
      description: aboutPage.description,
      illustrationURL: aboutPage.illustration_url,
      illustrationALT: aboutPage.illustration_alt,
    };

    return mappedAboutPage;
  }

  async createAboutPage(page: AboutPageWithoutSkills): Promise<void> {
    await postgres.none("delete from about_page");
    await postgres.none(
      "insert into about_page (title,description,illustration_url,illustration_alt) values ($1,$2,$3,$4)",
      [page.title, page.description, page.illustrationURL, page.illustrationALT]
    );
  }

  async updateAboutPage(page: AboutPageWithoutSkills): Promise<void> {
    await postgres.none(
      "update about_page set title = $1, description = $2, illustration_url = $3, illustration_alt = $4",
      [page.title, page.description, page.illustrationURL, page.illustrationALT]
    );
  }

  async deleteAboutPage(): Promise<void> {
    await postgres.none("delete from about_page");
  }
}
