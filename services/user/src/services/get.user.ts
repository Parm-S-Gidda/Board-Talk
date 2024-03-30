import { eq } from "drizzle-orm";
import db from "../configs/db.config";
import { users } from "../schema/schema";
import { Datastore, PropertyFilter } from "@google-cloud/datastore";

export const getUser = async (user_id: string) => {
  const datastore = new Datastore();

  const query = datastore
    .createQuery("user")
    .filter(new PropertyFilter("user_id", "=", user_id));

  let user = null;

  try {
    const [users] = await datastore.runQuery(query);
    user = users[0];
  } catch (error) {
    console.log(error);
  }

  return user;
};
