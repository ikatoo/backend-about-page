import { ISkill } from "@/domain/skill/ISkill";
import { SkillProps } from "@/domain/skill/Skill";
import postgres from "../postgres";

export default class PostgresSkills implements ISkill {
  async createSkill(skill: SkillProps): Promise<void> {
    await postgres.none("insert into skills (title) values ($1)", [
      skill.title,
    ]);
  }

  async getAllSkills(): Promise<SkillProps[]> {
    const skills = await postgres.manyOrNone(
      "select * from skills order by title"
    );

    return skills;
  }

  async deleteSkill(title: string): Promise<void> {
    await postgres.none("delete from skills where title = $1", [title]);
  }
}
