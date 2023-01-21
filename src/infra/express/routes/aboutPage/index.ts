import AboutPage from "@/application/AboutPage";
import { AboutPageWithSkills } from "@/application/IAboutPageApplication";
import { AboutPageProps } from "@/domain/about-page/AboutPage";
import { SkillProps } from "@/domain/skill/Skill";
import PostgresAboutPage from "@/infra/database/about-page/PostgresAboutPage";
import PostgresSkills from "@/infra/database/skills/PostgresSkills";
import { Request, Response, Router } from "express";

export type AboutPageResponse = AboutPageProps & { skills?: SkillProps[] };

const aboutPageRoute = Router();

const aboutPageRepository = new PostgresAboutPage();
const skillsRepository = new PostgresSkills();

const useCase = new AboutPage(aboutPageRepository, skillsRepository);

aboutPageRoute.post("/about", async (req: Request, res: Response) => {
  const aboutPage: AboutPageWithSkills = req.body;
  await useCase.createAboutPage(aboutPage);

  res.status(201).send();
});

aboutPageRoute.put("/about", async (req: Request, res: Response) => {
  const aboutPage = req.body;
  // await updateAboutPage(aboutPage);

  res.status(201).send();
});

aboutPageRoute.get("/about", async (_req: Request, res: Response) => {
  const aboutPage = await useCase.getAboutPage();

  res.status(200).json(aboutPage);
});

aboutPageRoute.delete("/about", async (_req: Request, res: Response) => {
  await useCase.deleteAboutPage();

  res.status(204).send();
});

export default aboutPageRoute;
