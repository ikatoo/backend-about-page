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
    const { createAboutPage } = repository;
    await expect(createAboutPage(mock)).resolves.not.toThrow();
  });

  it("should get about page data", async () => {
    const { getAboutPage } = repository;

    await expect(getAboutPage()).resolves.toEqual({
      title: mock.title,
      description: mock.description,
      avatar_url: mock.avatarURL,
      avatar_alt: mock.avatarALT,
    });
  });

  it("should update about page data", async () => {
    const { updateAboutPage, getAboutPage } = repository;

    const newMock = {
      title: "New About page",
      description: "Descrição NEW about page",
      avatarALT: "new avatar alt",
      avatarURL: "new avatar url",
    };

    await expect(updateAboutPage(newMock)).resolves.not.toThrow();
    await expect(getAboutPage()).resolves.toEqual({
      title: newMock.title,
      description: newMock.description,
      avatar_alt: newMock.avatarALT,
      avatar_url: newMock.avatarURL,
    });
  });
});
