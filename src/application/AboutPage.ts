import { IAboutPage } from "@/domain/about-page/IAboutPage";
import { ISkill } from "@/domain/skill/ISkill";
import {
  AboutPageWithSkills,
  IAboutPageApplication,
} from "./IAboutPageApplication";

export default class AboutPage implements IAboutPageApplication {
  constructor(
    readonly aboutPageRepository: IAboutPage,
    readonly skillsRepository: ISkill
  ) {}

  async createAboutPage(page: AboutPageWithSkills) {
    this.aboutPageRepository.createAboutPage({
      title: page.title,
      description: page.description,
      avatarURL: page.avatarURL,
      avatarALT: page.avatarALT,
    });
    for (let index = 0; index < page.skills.length; index++) {
      await this.skillsRepository.createSkill(page.skills[index]);
    }
  }

  async getAboutPage(): Promise<AboutPageWithSkills | undefined> {
    const aboutPage = await this.aboutPageRepository.getAboutPage();
    if (aboutPage === undefined) return;

    const skills = await this.skillsRepository.getAllSkills();

    const mappedAboutPage: AboutPageWithSkills = {
      title: aboutPage?.title ?? "",
      description: aboutPage?.description ?? "",
      skills: skills,
      avatarURL: aboutPage?.avatarURL,
      avatarALT: aboutPage?.avatarALT,
    };

    return mappedAboutPage;
  }

  async deleteAboutPage(): Promise<void> {
    await this.aboutPageRepository.deleteAboutPage();
  }

  async deleteSkill(title: string): Promise<void> {
    await this.skillsRepository.deleteSkill(title);
  }
}
