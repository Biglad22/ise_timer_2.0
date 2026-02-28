import z from "zod";

export const LoginFormSchema = z.object({
    email_username : z.string().min(1, {message: "username or email is required"}),
    password:z.string().min(1, {message: "password is required"})
})

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>