import PostgresAboutPage from "./PostgresAboutPage";
import postgres from "./postgres";

describe("Postgres Database Suite Test", () => {
  it("should insert about page data", async () => {
    const { create } = new PostgresAboutPage();
    const mock = {
      title: "Titulo About page",
      description: "Descrição about page",
      avatarALT: "avatar alt",
      avatarURL: "avatar url",
    };
    await create(mock);

    postgres.any("select * from about_page").then((result) => {
      expect(result).toHaveLength(1)
      const aboutPage = result[0]
      expect(mock).toEqual({
        title: aboutPage.title,
        description: aboutPage.description,
        skills: ["node", "git"],
        avatarALT: aboutPage.avatar_alt,
        avatarURL: aboutPage.avatar_url,
      });
    });

    await postgres.$pool.end();
  });
});
