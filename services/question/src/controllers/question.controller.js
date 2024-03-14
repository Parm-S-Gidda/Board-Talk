"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestion = exports.getQuestions = void 0;
const user_service_1 = require("../services/user.service");
const getQuestions = async (req, res) => {
    const questions = await (0, user_service_1.getQuestionsService)();
    if (questions) {
        res.status(200).json(questions);
    }
    else {
        res.status(400).json({
            error: "Bad payload",
        });
    }
};
exports.getQuestions = getQuestions;
const createQuestion = async (req, res) => {
    const questionRequest = {
        content: req.body.content,
        title: req.body.title,
        user_id: req.body.user_id,
    };
    const question = await (0, user_service_1.createQuestionService)(questionRequest);
    if (question) {
        res.status(201).json(question);
    }
    else {
        res.status(400).json({
            error: "Bad payload",
        });
    }
};
exports.createQuestion = createQuestion;
