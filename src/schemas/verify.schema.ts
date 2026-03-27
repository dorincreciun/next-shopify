import * as z from "zod";
import {VerifyMessages} from "@/constants";

export const VerifySchema = z.object({
    email: z.email(VerifyMessages.email),
    code: z.string()
        .length(6, VerifyMessages.codeLength)
        .regex(/^[0-9]+$/, VerifyMessages.codeDigits)
});

export type VerifySchemaType = z.infer<typeof VerifySchema>;