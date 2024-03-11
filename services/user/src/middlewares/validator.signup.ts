import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const signupSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email("Not a valid email"),

    password: z.string({
      required_error: "password is required",
    }),
  }),
});

export const validateSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await signupSchema.parseAsync({
      body: req.body,
    });
  } catch (error) {
    res.status(400).json(error);
  }

  next();
};

export type SignupRequest = z.infer<typeof signupSchema>;
