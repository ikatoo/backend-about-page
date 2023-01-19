export type SkillProps = {
  title: string;
};

export default class Skill {
  readonly title: string;

  constructor(skill: SkillProps) {
    this.title = skill.title;
  }
}
