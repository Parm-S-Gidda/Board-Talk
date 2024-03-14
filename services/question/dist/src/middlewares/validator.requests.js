"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePostAnswer = exports.validatePostQuestion = exports.validateGetAnswer = void 0;
const zod_1 = require("zod");
const getAnswersSchema = zod_1.z.object({
    question_id: zod_1.z.string({
        required_error: "question_id has bad value",
    }),
});
const postQuestionSchema = zod_1.z.object({
    user_id: zod_1.z.string({
        required_error: "user_id has bad value",
    }),
    content: zod_1.z.string({
        required_error: "content has bad value",
    }),
    title: zod_1.z.string({
        required_error: "title has bad value",
    }),
});
const postAnswerSchema = zod_1.z.object({
    user_id: zod_1.z.string({
        required_error: "user_id has bad value",
    }),
    question_id: zod_1.z.string({
        required_error: "question_id has bad value",
    }),
    content: zod_1.z.string({
        required_error: "content has bad value",
    }),
});
const validateGetAnswer = async (req, res, next) => {
    try {
        await getAnswersSchema.parseAsync(req.body);
    }
    catch (error) {
        res.status(400).json(error);
        return;
    }
    next();
};
exports.validateGetAnswer = validateGetAnswer;
const validatePostQuestion = async (req, res, next) => {
    try {
        await postQuestionSchema.parseAsync(req.body);
    }
    catch (error) {
        res.status(400).json(error);
        return;
    }
    next();
};
exports.validatePostQuestion = validatePostQuestion;
const validatePostAnswer = async (req, res, next) => {
    try {
        await postAnswerSchema.parseAsync(req.body);
    }
    catch (error) {
        res.status(400).json(error);
        return;
    }
    next();
};
exports.validatePostAnswer = validatePostAnswer;
