import { AboutPageProps } from "@/domain/about-page/AboutPage";
import { SkillProps } from "@/domain/skill/Skill";

export type AboutPageWithSkills = AboutPageProps & { skills: SkillProps[] };

export interface IAboutPageApplication {
  createAboutPage(page: AboutPageWithSkills): Promise<void>;
  getAboutPage(): Promise<AboutPageWithSkills | undefined>;
  deleteAboutPage(): Promise<void>;
  deleteSkill(title: string): Promise<void>
}
