import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  user_id: varchar("user_id"),
  email: varchar("email"),
  name: varchar("name"),
  createdAt: timestamp("createdAt"),
});
