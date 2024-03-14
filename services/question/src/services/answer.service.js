"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnswerService = exports.getAnswersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_config_1 = __importDefault(require("../configs/db.config"));
const schema_1 = require("../schema/schema");
const uuid_1 = require("uuid");
const getAnswersService = async (request) => {
    const { question_id } = request;
    let res = null;
    try {
        res = await db_config_1.default
            .select()
            .from(schema_1.answers)
            .where((0, drizzle_orm_1.eq)(schema_1.answers.question_id, question_id));
    }
    catch (error) {
        console.log(error);
        return res;
    }
    return res;
};
exports.getAnswersService = getAnswersService;
const createAnswerService = async (request) => {
    const { user_id, question_id, content } = request;
    let answer = null;
    try {
        answer = await db_config_1.default
            .insert(schema_1.answers)
            .values({
            answer_id: (0, uuid_1.v4)(),
            author_id: user_id,
            content,
            question_id,
            createdAt: new Date(),
        })
            .returning();
    }
    catch (error) {
        console.log(error);
    }
    return answer;
};
exports.createAnswerService = createAnswerService;
