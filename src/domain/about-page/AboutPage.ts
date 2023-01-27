export type AboutPageProps = {
  title: string;
  description: string;
  illustrationURL?: string | undefined;
  illustrationALT?: string | undefined;
};

export default class AboutPage {
  readonly title: string;
  readonly description: string;
  readonly illustrationURL?: string | undefined;
  readonly illustrationALT?: string | undefined;

  constructor(page: AboutPageProps) {
    this.title = page.title;
    this.description = page.description;
    if (page.illustrationURL) this.illustrationURL = page.illustrationURL;
    if (page.illustrationALT) this.illustrationALT = page.illustrationALT;
  }
}
