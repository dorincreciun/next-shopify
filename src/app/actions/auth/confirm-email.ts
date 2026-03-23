"use server"

import { FormState } from "@shared/types"
import { verifySchema, VerifySchemaType } from "@shared/schemas"
import { validateFormFields } from "@shared/utils"
import { AUTH_MESSAGES } from "@shared/constants/auth.messages"

type VerifyState = FormState<VerifySchemaType>

export async function verifyAccount(state: VerifyState, formData: FormData): Promise<VerifyState> {
    const result = validateFormFields(verifySchema, formData)

    if (!result.success) {
        return {
            errors: result.error,
            success: false,
            message: result.message || AUTH_MESSAGES.GENERAL.ERROR,
        }
    }

    const { email, code } = result.data
}
