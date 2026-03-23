import { z } from "zod"
import { AUTH_MESSAGES } from "../constants/auth.messages"

export const signUpSchema = z
    .object({
        email: z.email({ message: AUTH_MESSAGES.EMAIL.INVALID }),
        password: z
            .string()
            .trim()
            .min(4, { message: AUTH_MESSAGES.PASSWORD.MIN })
            .max(255, { message: AUTH_MESSAGES.PASSWORD.MAX }),
        confirmPassword: z.string().trim(),
        firstName: z
            .string()
            .trim()
            .min(2, { message: AUTH_MESSAGES.FIRST_NAME.MIN })
            .max(255, { message: AUTH_MESSAGES.FIRST_NAME.MAX }),
        lastName: z
            .string()
            .trim()
            .min(2, { message: AUTH_MESSAGES.LAST_NAME.MIN })
            .max(255, { message: AUTH_MESSAGES.LAST_NAME.MAX }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: AUTH_MESSAGES.PASSWORD.MISMATCH,
        path: ["confirmPassword"],
    })

export type SignUpSchema = z.infer<typeof signUpSchema>
