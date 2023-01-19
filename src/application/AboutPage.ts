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
    page.skills.forEach(async (skill) => {
      await this.skillsRepository.createSkill(skill);
    });
  }

  async getAboutPage(): Promise<AboutPageWithSkills> {
    const aboutPage = await this.aboutPageRepository.getAboutPage();
    const skills = await this.skillsRepository.getAllSkills();

    const mappedAboutPage: AboutPageWithSkills = {
      title: aboutPage?.title ?? '',
      description: aboutPage?.description ?? '',
      skills: skills.sort(),
      avatarURL: aboutPage?.avatarURL,
      avatarALT: aboutPage?.avatarALT
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
