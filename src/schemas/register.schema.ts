import * as z from "zod";
import {RegisterMessages} from "@/constants";

export const RegisterSchema = z.object({
    lastName: z.string().min(2, RegisterMessages.lastName),
    firstName: z.string().min(2, RegisterMessages.firstName),
    email: z.email(RegisterMessages.email),
    password: z.string()
        .trim()
        .min(6, RegisterMessages.passwordMin)
        .max(60, RegisterMessages.passwordMax),
    confirmPassword: z.string().trim()
}).refine((data) => data.password === data.confirmPassword, {
    message: RegisterMessages.confirmPassword,
    path: ["confirmPassword"],
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;