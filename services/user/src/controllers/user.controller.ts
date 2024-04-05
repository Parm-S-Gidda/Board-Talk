import { Request, Response } from "express";
import { firebaseAuth, signUp } from "../services/signup";
import { loginUser, logoutUser } from "../services/login";
import { SignupRequest } from "../middlewares/validator.signup";
import { getUser as getUserService } from "../services/get.user";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";
import { LoginRequest } from "../middlewares/validator.login";

export const createUser = async (req: Request, res: Response) => {
  const signUpRequest: SignupRequest = {
    body: {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    },
  };

  const userFirebase = await firebaseAuth(signUpRequest);

  if (!userFirebase) {
    res.status(403).json({
      error: "Cannot sign up user",
    });

    return;
  }

  // res.cookie("accessToken", await userFirebase.getIdToken(), {
  //   secure: process.env.NODE_ENV == "production",
  //   httpOnly: false,
  // });

  const user = await signUp(signUpRequest, userFirebase.uid);

  if (user) {
    const accessToken = await userFirebase.getIdToken();
    const userResponse = { ...user, accessToken };
    res.status(201).json(userResponse);
  } else {
    res.status(400).json({
      error: "Please check your arguments",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const user_id: string = req.query.user_id as string;

  const user = await getUserService(user_id);

  if (user) {
    res.setHeader("Cache-Control", "public, max-age=60");
    res.status(200).json(user);
  } else {
    res.status(400).json({
      error: "Please check your arguments",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const loginRequest: LoginRequest = {
    email: req.body.email,
    password: req.body.password,
  };
  const user = await loginUser(loginRequest);

  if (!user) {
    res.status(403).json({
      error: "Cannot login user",
    });

    return;
  }

  // res.cookie("accessToken", await user.getIdToken(), {
  //   secure: process.env.NODE_ENV == "production",
  //   httpOnly: false,
  // });

  const userDb = await getUserService(user.uid);

  if (userDb) {
    const accessToken = await user.getIdToken();
    const userResponse = { ...userDb, accessToken };
    res.status(200).json(userResponse);
  } else {
    res.status(500).json({
      error: "Error with database",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  const success = await logoutUser();

  if (success) {
    res.clearCookie("accessToken").status(200).json({
      message: "Log out successful",
    });
  } else {
    res.status(400).json({
      message: "Log out not successful",
    });
  }
};
