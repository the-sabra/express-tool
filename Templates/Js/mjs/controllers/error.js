import { __dirname } from "../app.js";

export const get404 = (req, res, next) => {
  res.status(404).sendFile("/public/error.html", { root: __dirname });
};
