import { AboutPageProps } from "@/domain/AboutPage";
import { Request, Response, Router } from "express";

export type AboutPageResponse = AboutPageProps
//  & { skills: SkillWithID[] };

const aboutPageRoute = Router();

aboutPageRoute.post("/about", async (req: Request, res: Response) => {
  const aboutPage: AboutPageResponse = req.body;
  // await createAboutPage(aboutPage);

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
