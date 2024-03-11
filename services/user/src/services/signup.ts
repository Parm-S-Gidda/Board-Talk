import db from "../configs/db.config";
import { SignupRequest } from "../middlewares/validator.signup";
import { users } from "../schema/schema";
import { v4 as uuidv4 } from "uuid";

export const signUp = async (signUpRequest: SignupRequest) => {
  const { name, email } = signUpRequest.body;

  //console.log("Signing up users ....");
  let user = null;

  try {
    user = await db
      .insert(users)
      .values({
        name,
        email,
        user_id: uuidv4(),
        createdAt: new Date(),
      })
      .returning();
  } catch (error) {
    console.log(error);
  }

  return user;
};
