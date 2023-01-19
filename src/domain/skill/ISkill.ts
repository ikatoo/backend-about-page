import { SkillProps } from "./Skill";

export interface ISkill {
  createSkill(skill: SkillProps): Promise<void>;
  getAllSkills(): Promise<SkillProps[]>;
  deleteSkill(title: string): Promise<void>;
}
