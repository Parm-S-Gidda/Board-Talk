import { Datastore } from "@google-cloud/datastore";
import db from "../configs/db.config";
import { SignupRequest } from "../middlewares/validator.signup";
import { users } from "../schema/schema";
import { v4 as uuidv4 } from "uuid";

export const signUp = async (signUpRequest: SignupRequest) => {
  const datastore = new Datastore();

  const user_id = uuidv4();

  const key = datastore.key(["user", user_id]);

  const { name, email } = signUpRequest.body;

  const user = {
    key,
    data: {
      name,
      email,
      user_id,
      createdAt: new Date(),
    },
  };

  try {
    await datastore.save(user);

    return user.data;
  } catch (error) {
    console.log(error);
    return null;
  }

  //console.log("Signing up users ....");
  // let user = null;

  // try {
  //   user = await db
  //     .insert(users)
  //     .values({
  //       name,
  //       email,
  //       user_id: uuidv4(),
  //       createdAt: new Date(),
  //     })
  //     .returning();
  // } catch (error) {
  //   console.log(error);
  // }

  // return user;
};
