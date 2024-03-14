import { relations } from "drizzle-orm";
import { timestamp, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const questions = pgTable("questions", {
  question_id: varchar("question_id").primaryKey(),
  title: varchar("title"),
  content: varchar("content"),
  user_id: varchar("user_id"),
  createdAt: timestamp("createdAt"),
});

export const answers = pgTable("answers", {
  answer_id: varchar("answer_id").primaryKey(),
  content: varchar("content"),
  createdAt: timestamp("createdAt"),
  question_id: varchar("question_id"),
  author_id: varchar("author_id"),
});

export const questionRelations = relations(questions, ({ many }) => ({
  answers: many(answers),
}));

export const answerRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.question_id],
    references: [questions.question_id],
  }),
}));
