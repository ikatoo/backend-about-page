import Skill from "./Skill";

describe("Skill Class", () => {
  it("should create new instance", () => {
    const mockData = {
      title: "nodejs",
    };
    const skill = new Skill(mockData);

    expect(expect.objectContaining(skill)).toStrictEqual(mockData);
  });
});
