"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_controller_1 = require("../controllers/question.controller");
const validator_requests_1 = require("../middlewares/validator.requests");
const questionRouter = express_1.default.Router();
questionRouter.get("/", question_controller_1.getQuestions);
questionRouter.post("/", validator_requests_1.validatePostQuestion, question_controller_1.createQuestion);
exports.default = questionRouter;
