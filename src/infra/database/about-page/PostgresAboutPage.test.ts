import { describe, expect, test } from "vitest";

import PostgresAboutPage from "./PostgresAboutPage";

describe("Postgres About Page Repository", () => {
  const mock = {
    title: "Titulo About page",
    description: "Descrição about page",
    avatarALT: "avatar alt",
    avatarURL: "avatar url",
  };

  const repository = new PostgresAboutPage();

  test("should insert about page data", async () => {
    const { createAboutPage } = repository;
    await expect(createAboutPage(mock)).resolves.not.toThrowError();
  });

  test("should get about page data", async () => {
    const { getAboutPage } = repository;

    await expect(getAboutPage()).resolves.toEqual(mock);
  });

  test("should update about page data", async () => {
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

  test("should delete about page data", async () => {
    const { deleteAboutPage, getAboutPage } = repository;

    await expect(deleteAboutPage()).resolves.not.toThrowError();
    await expect(getAboutPage()).resolves.toBeNull();
  });
});
