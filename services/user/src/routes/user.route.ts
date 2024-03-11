import express from "express";
import { createUser, getUser } from "../controllers/user.controller";
import { validateSignUp } from "../middlewares/validator.signup";

const userRouter = express.Router();

userRouter.post("/signup", validateSignUp, createUser);
userRouter.get("/", getUser);

export default userRouter;
