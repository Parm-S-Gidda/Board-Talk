import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email("Not a valid email"),
  password: z.string({
    required_error: "password is required",
  }),
});

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await loginSchema.parseAsync(req.body);
  } catch (error) {
    res.status(400).json(error);
    return;
  }

  next();
};

export type LoginRequest = z.infer<typeof loginSchema>;
