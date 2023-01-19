import { ISkill } from "@/domain/skill/ISkill";
import { SkillProps } from "@/domain/skill/Skill";
import postgres from "../postgres";

export default class PostgresSkills implements ISkill {
  async createSkill(skill: SkillProps): Promise<void> {
    try {
      await postgres.none("insert into skills (title) values ($1)", [
        skill.title,
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllSkills(): Promise<SkillProps[]> {
    const skills = await postgres.manyOrNone("select * from skills");

    return skills;
  }

  async deleteSkill(title: string): Promise<void> {
    try {
      await postgres.none("delete from skills where title = $1", [title]);
    } catch (error) {
      console.log(error);
    }
  }
}
