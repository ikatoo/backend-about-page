import { ISkill } from "@/domain/skill/ISkill";
import postgres from "../postgres";
import { SkillProps } from "@/domain/skill/Skill";

export default class PostgresSkills implements ISkill {
  getAllSkills(): Promise<SkillProps[]> {
    throw new Error("Method not implemented.");
  }
  createSkill(skill: { title: string; }): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateSkill(skill: SkillProps): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteSkill(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
