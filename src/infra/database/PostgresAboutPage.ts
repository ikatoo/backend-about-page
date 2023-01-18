import { IAboutPage } from "@/domain/IAboutPage";
import postgres from "./postgres";
import { AboutPageProps } from "@/domain/AboutPage";

type AboutPageWithoutSkills = Omit<AboutPageProps, 'skills'>

export default class PostgresAboutPage implements IAboutPage {
  async getAboutPage(): Promise<AboutPageProps> {
    const aboutPage = await postgres.oneOrNone("select * from about_page");

    return aboutPage;
  }

  async createAboutPage(page: AboutPageWithoutSkills): Promise<void> {
    try {
      await postgres.none("delete from about_page")
      await postgres.none(
        "insert into about_page (title,description,avatar_url,avatar_alt) values ($1,$2,$3,$4)",
        [page.title, page.description, page.avatarURL, page.avatarALT]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updateAboutPage(page: AboutPageWithoutSkills): Promise<void> {
    try {
      await postgres.none(
        "update about_page set title = $1, description = $2, avatar_url = $3, avatar_alt = $4",
        [page.title, page.description, page.avatarURL, page.avatarALT]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAboutPage(): Promise<void> {
    try {
      await postgres.none("delete from about_page");
    } catch (error) {
      console.log(error);
    }
  }
}
