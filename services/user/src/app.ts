import express, { Express, Request, Response } from "express";
import userRouter from "./routes/user.route";
import cors from "cors";
import cookieParser from "cookie-parser";
<<<<<<< HEAD
import compression from "compression";
=======
>>>>>>> socket-retry-vinci

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

<<<<<<< HEAD
app.use(compression());

=======
>>>>>>> socket-retry-vinci
const port = process.env.port || 8080;

app.use("/api/users", userRouter);

app.use("/api/users/ping", (req: Request, res: Response) => {
  res.status(200).json({
    message: "works",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
