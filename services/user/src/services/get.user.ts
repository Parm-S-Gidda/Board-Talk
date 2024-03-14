import { eq } from "drizzle-orm";
import db from "../configs/db.config";
import { users } from "../schema/schema";

export const getUser = async (user_id: string) => {
  let user = null;

  try {
    user = await db.select().from(users).where(eq(users.user_id, user_id));
  } catch (error) {
    console.log(error);
    return user;
  }

  return user[0];
};
