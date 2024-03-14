import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

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
