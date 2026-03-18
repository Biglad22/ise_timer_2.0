import z from "zod";
import { EmailSchema } from "./baseSchema";

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password too long")
  .regex(/[A-Z]/, "Must include uppercase letter")
  .regex(/[a-z]/, "Must include lowercase letter")
  .regex(/[0-9]/, "Must include number")
  .regex(/[^A-Za-z0-9]/, "Must include special character");


export const SignupFormSchema = z.object({
    first_name:z.string().min(1, {message:"First name is required."}),
    last_name:z.string().min(1, {message:"Last name is required."}),
    username:z.string().min(1, {message:"User name is required."}),
    email: EmailSchema.min(1, {message:" is required."}),
    password:passwordSchema,
    confirm_password: z.string()
}).refine(data => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"]
  });

export type SignupFormType = z.infer<typeof SignupFormSchema>