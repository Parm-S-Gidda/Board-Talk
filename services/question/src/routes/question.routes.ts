import express from "express";
import {
  createQuestion,
  getQuestions,
} from "../controllers/question.controller";
import { validatePostQuestion } from "../middlewares/validator.requests";

const questionRouter = express.Router();

questionRouter.get("/", getQuestions);
questionRouter.post("/", validatePostQuestion, createQuestion);

export default questionRouter;
