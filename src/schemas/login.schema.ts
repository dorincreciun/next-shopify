import * as z from "zod";
import {LoginMessages} from "@/constants";

export const LoginSchema = z.object({
    email: z.email({message: LoginMessages.email}),
    password: z.string()
        .trim()
        .min(4, {message: LoginMessages.passwordMin})
        .max(60, {message: LoginMessages.passwordMax})
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;