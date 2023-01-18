import { IAboutPage } from "@/domain/IAboutPage";
import postgres from "./postgres";
import { AboutPageProps } from "@/domain/AboutPage";

export default class PostgresAboutPage implements IAboutPage {
  async get(): Promise<AboutPageProps> {
    const aboutPage = await postgres.oneOrNone("select * from about_page");

    return aboutPage;
  }

  async create(page: Omit<AboutPageProps, 'skills'>): Promise<void> {
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

  async update(page: AboutPageProps): Promise<void> {
    try {
      await postgres.none(
        "update about_page set title = $1, description = $2, avatar_url = $3, avatar_alt = $4",
        [page.title, page.description, page.avatarURL, page.avatarALT]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async delete(): Promise<void> {
    try {
      await postgres.none("delete from about_page");
    } catch (error) {
      console.log(error);
    }
  }
}
