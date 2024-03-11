import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.port;

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
