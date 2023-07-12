import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import { get404 } from "./controllers/error";
import cors from "cors";
import path from "path";

export const rootDir: string = __dirname;

const app: Express = express();
// adding status inErrorRequestHandler
interface ErrorStatus extends ErrorRequestHandler {
  status: number;
}

//Enable All CORS Requests
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use(get404);
// error middleware
app.use(function (
  error: ErrorStatus,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);

  res.status(error.status || 500);
  res.sendFile("error");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`running in port ${process.env.PORT || 3000}`);
});
