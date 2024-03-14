"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionService = exports.getQuestionsService = void 0;
const db_config_1 = __importDefault(require("../configs/db.config"));
const schema_1 = require("../schema/schema");
const uuid_1 = require("uuid");
const getQuestionsService = async () => {
    let res = null;
    try {
        res = await db_config_1.default.select().from(schema_1.questions);
    }
    catch (error) {
        console.log(error);
        return res;
    }
    return res;
};
exports.getQuestionsService = getQuestionsService;
const createQuestionService = async (request) => {
    const { title, content, user_id } = request;
    let question = null;
    try {
        question = db_config_1.default
            .insert(schema_1.questions)
            .values({
            title,
            content,
            user_id,
            question_id: (0, uuid_1.v4)(),
            createdAt: new Date(),
        })
            .returning();
    }
    catch (error) {
        console.log(error);
    }
    return question;
};
exports.createQuestionService = createQuestionService;
