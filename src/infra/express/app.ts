import env from "@/env";
import cors from "cors";
import express, { Request, Response } from "express";

import routes from "./routes";

const app = express();
app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.disable("x-powered-by").disable("etag");

app.use(routes);

// Status
app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

export default app;
