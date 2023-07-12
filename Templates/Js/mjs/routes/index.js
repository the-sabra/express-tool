import { Router } from "express";
import { __dirname } from "../app.js";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile('/public/index.html', {root: __dirname});
});

export default router;
