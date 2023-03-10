import { describe, expect, test } from "vitest";

import PostgresAboutPage from "./PostgresAboutPage";

describe("Postgres About Page Repository", () => {
  const mock = {
    title: "Titulo About page",
    description: "Descrição about page",
    illustrationALT: "illustration alt",
    illustrationURL: "illustration url",
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
      illustrationALT: "new illustration alt",
      illustrationURL: "new illustration url",
    };

    await expect(updateAboutPage(newMock)).resolves.not.toThrowError();
    await expect(getAboutPage()).resolves.toEqual(newMock);
  });

  test("should delete about page data", async () => {
    const { deleteAboutPage, getAboutPage } = repository;

    await expect(deleteAboutPage()).resolves.not.toThrowError();
  });
});
