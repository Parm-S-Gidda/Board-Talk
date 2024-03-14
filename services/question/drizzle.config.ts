import dotenv from "dotenv";

import type { Config } from "drizzle-kit";

dotenv.config();

export default {
  schema: "./src/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
