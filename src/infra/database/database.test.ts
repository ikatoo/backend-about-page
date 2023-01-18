import PostgresAboutPage from "./PostgresAboutPage";
import postgres from "./postgres";

describe("Postgres Database Suite Test", () => {
  const mock = {
    title: "Titulo About page",
    description: "Descrição about page",
    avatarALT: "avatar alt",
    avatarURL: "avatar url",
  };

  const repository = new PostgresAboutPage();

  afterAll(async () => {
    await postgres.$pool.end();
  });

  it("should insert about page data", async () => {
    const { create } = repository;
    await expect(create(mock)).resolves.not.toThrow();
  });

  it("should get about page data", async () => {
    const { get } = repository;

    await expect(get()).resolves.toEqual({
      title: mock.title,
      description: mock.description,
      avatar_url: mock.avatarURL,
      avatar_alt: mock.avatarALT,
    });
  });

    await postgres.$pool.end();
  });
});
