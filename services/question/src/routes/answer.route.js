"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_requests_1 = require("../middlewares/validator.requests");
const answer_controller_1 = require("../controllers/answer.controller");
const answerRouter = express_1.default.Router();
answerRouter.get("/", answer_controller_1.getAnswers);
answerRouter.post("/", validator_requests_1.validatePostAnswer, answer_controller_1.createAnswer);
exports.default = answerRouter;
