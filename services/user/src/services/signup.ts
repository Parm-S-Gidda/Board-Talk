import { Datastore } from "@google-cloud/datastore";
import { SignupRequest } from "../middlewares/validator.signup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";

export const signUp = async (signUpRequest: SignupRequest, user_id: string) => {
  const datastore = new Datastore();

  const key = datastore.key(["user", user_id]);

  const { name, email, password } = signUpRequest.body;

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
};

export const firebaseAuth = async (signUpRequest: SignupRequest) => {
  const { email, password } = signUpRequest.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
