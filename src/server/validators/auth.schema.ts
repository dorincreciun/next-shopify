import * as z from "zod";
import {LoginMessages, RegisterMessages, VerifyMessages} from "@/shared/constants";

export const LoginSchema = z.object({
    email: z.email({message: LoginMessages.email}),
    password: z.string()
        .trim()
        .min(4, {message: LoginMessages.passwordMin})
        .max(60, {message: LoginMessages.passwordMax})
});

export type LoginSchema = z.infer<typeof LoginSchema>;

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

export type RegisterSchema = z.infer<typeof RegisterSchema>;

export const VerifySchema = z.object({
    email: z.email(VerifyMessages.email),
    otpCode: z.string()
        .length(6, VerifyMessages.codeLength)
        .regex(/^[0-9]+$/, VerifyMessages.codeDigits)
});

export type VerifySchema = z.infer<typeof VerifySchema>;