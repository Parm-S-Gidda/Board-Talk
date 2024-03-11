import { Request, Response } from "express";
import { signUp } from "../services/signup";
import { SignupRequest } from "../middlewares/validator.signup";
import { getUser as getUserService } from "../services/get.user";

export const createUser = async (req: Request, res: Response) => {
  const signUpRequest: SignupRequest = {
    body: {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    },
  };

  const user = await signUp(signUpRequest);

  if (user) {
    res.status(201).json(user);
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
    res.status(200).json(user);
  } else {
    res.status(400).json({
      error: "Please check your arguments",
    });
  }
};
