import AboutPage from "./AboutPage";

describe("About Page Class", () => {
  it("should create new instance", () => {
    const mockData = {
      title: "Titulo da pagina",
      description: "Descrição da pagina",
    };
    const aboutPage = new AboutPage(mockData);

    expect(expect.objectContaining(aboutPage)).toStrictEqual(mockData);
  });
});
