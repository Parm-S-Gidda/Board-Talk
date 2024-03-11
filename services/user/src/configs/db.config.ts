import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function connectToDb() {
  await client.connect();
}

connectToDb();

const db = drizzle(client);

export default db;
