import { describe, expect, test } from "vitest";
import Skill from "./Skill";

describe("Skill Class", () => {
  test("should create new instance", () => {
    const mockData = {
      title: "nodejs",
    };
    const skill = new Skill(mockData);

    expect(expect.objectContaining(skill)).toStrictEqual(mockData);
  });
});
