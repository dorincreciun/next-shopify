"use server"

import { signUpSchema, SignUpSchema } from "@shared/schemas"
import { FormState } from "@shared/types"
import { validateFormFields } from "@shared/utils"
import { redirect } from "next/navigation"

type SignUpState = FormState<SignUpSchema>

export async function register(state: SignUpState, formData: FormData): Promise<SignUpState> {
    const result = validateFormFields(signUpSchema, formData)

    if (!result.success) {
        return {
            errors: result.error,
            success: false,
            message: result.message,
        }
    }

    const { data } = result

    redirect("/admin/verify")
}
