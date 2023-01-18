export type AboutPageProps = {
  title: string;
  description: string;
  avatarURL?: string | undefined;
  avatarALT?: string | undefined;
  skills: string[];
};

export default class AboutPage {
  readonly title: string;
  readonly description: string;
  readonly avatarURL?: string | undefined;
  readonly avatarALT?: string | undefined;
  readonly skills: string[];

  constructor(page: AboutPageProps) {
    this.title = page.title;
    this.description = page.description;
    if (page.avatarURL) this.avatarURL = page.avatarURL;
    if (page.avatarALT) this.avatarALT = page.avatarALT;
    this.skills = page.skills;
  }
}
