import { z } from "zod"

export const verifySchema = z.object({
    email: z.email(),
    code: z
        .string()
        .length(6, { message: "Codul trebuie să aibă exact 6 cifre." })
        .regex(/^\d+$/, { message: "Codul poate conține doar cifre." }),
})

export type VerifySchemaType = z.infer<typeof verifySchema>
