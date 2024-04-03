import express, { Express, Request, Response } from "express";
import userRouter from "./routes/user.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(compression());

const port = process.env.port || 8080;

app.use("/api/users", userRouter);

app.use("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "works",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
