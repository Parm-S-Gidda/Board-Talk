"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnswer = exports.getAnswers = void 0;
const answer_service_1 = require("../services/answer.service");
const getAnswers = async (req, res) => {
    const question_id = req.query.question_id;
    const request = {
        question_id: question_id,
    };
    const answers = await (0, answer_service_1.getAnswersService)(request);
    if (answers) {
        res.status(200).json(answers);
    }
    else {
        res.status(400).json({
            error: "Please check your arguments",
        });
    }
};
exports.getAnswers = getAnswers;
const createAnswer = async (req, res) => {
    const request = {
        content: req.body.content,
        question_id: req.body.question_id,
        user_id: req.body.user_id,
    };
    const answer = await (0, answer_service_1.createAnswerService)(request);
    if (answer) {
        res.status(201).json(answer);
    }
    else {
        res.status(400).json({
            error: "Please check your arguments",
        });
    }
};
exports.createAnswer = createAnswer;
