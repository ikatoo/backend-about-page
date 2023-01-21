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
  // const aboutPage = await getAboutPage();

  // res.status(200).json(aboutPageResponse);
  res.status(200).json({});
});

export default aboutPageRoute;
