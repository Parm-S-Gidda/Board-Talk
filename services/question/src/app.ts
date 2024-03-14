import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";
import questionRouter from "./routes/question.routes";
import answerRouter from "./routes/answer.route";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);
app.use("/health", (req: Request, res: Response) => [
  res.status(200).json({
    message: "works",
  }),
]);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
