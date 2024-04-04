import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { LoginRequest } from "../middlewares/validator.login";
import auth from "../firebase";
import { Response } from "express";

export const loginUser = async (req: LoginRequest) => {
  const { email, password } = req;

  try {
    const userCredential = await signInWithEmailAndPassword(
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

export const logoutUser = async () => {
  try {
    await signOut(auth);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
