import express, { json, urlencoded } from "express";
import path from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import { get404 } from "./controllers/error.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const app = express();

//Enable All CORS Requests
app.use(cors());

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use(get404);
// error middleware
app.use(function (err, req, res, next) {
  console.log(err);

  res.status(err.status || 500);
  res.sendFile("error");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`running in port ${process.env.PORT || 3000}`);
});
