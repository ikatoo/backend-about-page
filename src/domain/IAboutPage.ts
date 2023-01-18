import { AboutPageProps } from "./AboutPage";

export interface IAboutPage {
  getAboutPage(): Promise<AboutPageProps>;
  createAboutPage(page: AboutPageProps): Promise<void>;
  updateAboutPage(page: AboutPageProps): Promise<void>;
  deleteAboutPage(): Promise<void>;
}
