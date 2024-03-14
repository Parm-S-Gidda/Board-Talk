"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerRelations = exports.questionRelations = exports.answers = exports.questions = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
exports.questions = (0, pg_core_2.pgTable)("questions", {
    question_id: (0, pg_core_1.varchar)("question_id").primaryKey(),
    title: (0, pg_core_1.varchar)("title"),
    content: (0, pg_core_1.varchar)("content"),
    user_id: (0, pg_core_1.varchar)("user_id"),
    createdAt: (0, pg_core_1.timestamp)("createdAt"),
});
exports.answers = (0, pg_core_2.pgTable)("answers", {
    answer_id: (0, pg_core_1.varchar)("answer_id").primaryKey(),
    content: (0, pg_core_1.varchar)("content"),
    createdAt: (0, pg_core_1.timestamp)("createdAt"),
    question_id: (0, pg_core_1.varchar)("question_id"),
    author_id: (0, pg_core_1.varchar)("author_id"),
});
exports.questionRelations = (0, drizzle_orm_1.relations)(exports.questions, ({ many }) => ({
    answers: many(exports.answers),
}));
exports.answerRelations = (0, drizzle_orm_1.relations)(exports.answers, ({ one }) => ({
    question: one(exports.questions, {
        fields: [exports.answers.question_id],
        references: [exports.questions.question_id],
    }),
}));
