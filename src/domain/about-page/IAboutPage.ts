import { AboutPageProps } from "./AboutPage";

export interface IAboutPage {
  getAboutPage(): Promise<AboutPageProps | undefined>;
  createAboutPage(page: AboutPageProps): Promise<void>;
  updateAboutPage(page: AboutPageProps): Promise<void>;
  deleteAboutPage(): Promise<void>;
}
