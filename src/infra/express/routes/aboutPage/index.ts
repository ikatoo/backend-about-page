import AboutPage from "@/application/AboutPage";
import { AboutPageWithSkills } from "@/application/IAboutPageApplication";
import { AboutPageProps } from "@/domain/about-page/AboutPage";
import { SkillProps } from "@/domain/skill/Skill";
import PostgresAboutPage from "@/infra/database/about-page/PostgresAboutPage";
import PostgresSkills from "@/infra/database/skills/PostgresSkills";
import { NextFunction, Request, Response, Router } from "express";
import { BadRequestError } from "../../api-erros";

export type AboutPageResponse = AboutPageProps & { skills?: SkillProps[] };

const aboutPageRoute = Router();

const aboutPageRepository = new PostgresAboutPage();
const skillsRepository = new PostgresSkills();

const useCase = new AboutPage(aboutPageRepository, skillsRepository);

aboutPageRoute.post(
  "/about",
  async (req: Request, res: Response, next: NextFunction) => {
    if (!Object.keys(req.body).length) {
      return next(new BadRequestError("Data is required."));
    }

    const { title, description, skills } = req.body;
    if (!title || !description || !skills) {
      return next(new BadRequestError("Invalid request."));
    }

    const aboutPage: AboutPageWithSkills = req.body;
    await useCase.createAboutPage(aboutPage);

    res.status(201).send();
  }
);

aboutPageRoute.put("/about", async (req: Request, res: Response) => {
  await useCase.deleteAboutPage();
  const aboutPage = req.body;
  await useCase.createAboutPage(aboutPage);

  res.status(204).send();
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
