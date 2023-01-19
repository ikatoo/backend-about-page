import { SkillProps } from "./Skill";

export interface ISkill {
  getAllSkills(): Promise<SkillProps[]>;
  createSkill(skill: SkillProps): Promise<void>;
  deleteSkill(): Promise<void>;
}
