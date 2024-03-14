import express from "express";
import {
  validateGetAnswer,
  validatePostAnswer,
} from "../middlewares/validator.requests";
import { createAnswer, getAnswers } from "../controllers/answer.controller";

const answerRouter = express.Router();

answerRouter.get("/", getAnswers);
answerRouter.post("/", validatePostAnswer, createAnswer);

export default answerRouter;
