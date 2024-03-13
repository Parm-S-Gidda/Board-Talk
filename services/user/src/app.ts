import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.port;

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
