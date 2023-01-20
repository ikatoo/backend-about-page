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
      avatarURL: aboutPage.avatar_url,
      avatarALT: aboutPage.avatar_alt,
    };

    return mappedAboutPage;
  }

  async createAboutPage(page: AboutPageWithoutSkills): Promise<void> {
    await postgres.none("delete from about_page");
    await postgres.none(
      "insert into about_page (title,description,avatar_url,avatar_alt) values ($1,$2,$3,$4)",
      [page.title, page.description, page.avatarURL, page.avatarALT]
    );
  }

  async updateAboutPage(page: AboutPageWithoutSkills): Promise<void> {
    await postgres.none(
      "update about_page set title = $1, description = $2, avatar_url = $3, avatar_alt = $4",
      [page.title, page.description, page.avatarURL, page.avatarALT]
    );
  }

  async deleteAboutPage(): Promise<void> {
    await postgres.none("delete from about_page");
  }
}
