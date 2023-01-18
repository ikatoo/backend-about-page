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

  it("should update about page data", async () => {
    const { update, get } = repository;

    const newMock = {
      title: "New About page",
      description: "Descrição NEW about page",
      avatarALT: "new avatar alt",
      avatarURL: "new avatar url",
    };

    await expect(update(newMock)).resolves.not.toThrow();
    await expect(get()).resolves.toEqual({
      title: newMock.title,
      description: newMock.description,
      avatar_alt: newMock.avatarALT,
      avatar_url: newMock.avatarURL,
    });
  });
});
