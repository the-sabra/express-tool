import { Router } from "express";
import { rootDir } from "../app";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile("/public/index.html", { root: rootDir });
});

export default router;
