import express from "express";
import {
  createUser,
  getUser,
  login,
  logout,
} from "../controllers/user.controller";
import { validateSignUp } from "../middlewares/validator.signup";
import { validateLogin } from "../middlewares/validator.login";

const userRouter = express.Router();

userRouter
  .post("/signup", validateSignUp, createUser)
  .get("/", getUser)
  .post("/login", validateLogin, login)
  .post("/logout", logout);

export default userRouter;
