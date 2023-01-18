import { AboutPageProps } from "./AboutPage";

export interface IAboutPage {
  get(): Promise<AboutPageProps>;
  create(page: AboutPageProps): Promise<void>;
  update(page: AboutPageProps): Promise<void>;
  delete(): Promise<void>;
}
