import { z } from "zod"

export const signUpSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(2, { message: "Numele trebuie să aibă cel puțin 2 caractere." })
            .max(50, { message: "Numele este prea lung." }),

        email: z.string().trim().email({ message: "Adresa de email nu este validă." }),

        password: z
            .string()
            .trim()
            .min(8, { message: "Parola trebuie să aibă cel puțin 8 caractere." })
            .regex(/[a-zA-Z]/, { message: "Parola trebuie să conțină cel puțin o literă." })
            .regex(/[0-9]/, { message: "Parola trebuie să conțină cel puțin o cifră." })
            .regex(/[^a-zA-Z0-9]/, { message: "Parola trebuie să conțină un caracter special." }),

        confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Parolele nu coincid.",
        path: ["confirmPassword"], // ✅ era "confirm_password" — snake_case greșit
    })

export type SignUpFormState =
    | {
          errors?: {
              fullName?: string[]
              email?: string[]
              password?: string[]
              confirmPassword?: string[] // ✅ era lipsă din tip
              _form?: string[] // ✅ adăugat pentru erori globale
          }
          message?: string
      }
    | undefined
