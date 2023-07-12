import { rootDir } from "../app";
import { Request, Response, NextFunction } from "express";

export const get404 = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).sendFile("/public/error.html", { root: rootDir });
};
