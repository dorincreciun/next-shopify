"use server"

import { FormState } from "@shared/types"
import { verifySchema, VerifySchemaType } from "@shared/schemas"
import { validateFormFields } from "@shared/utils"
import prisma from "@shared/lib/prisma"
import { cookies } from "next/headers"
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

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user || !user.verifyToken) {
            return {
                success: false,
                message: AUTH_MESSAGES.VERIFICATION.NOT_FOUND,
            }
        }

        if (user.isVerified) {
            return {
                success: false,
                message: AUTH_MESSAGES.VERIFICATION.ALREADY_VERIFIED,
            }
        }

        if (user.verifyToken !== code) {
            return {
                success: false,
                errors: { code: [AUTH_MESSAGES.VERIFICATION.INVALID_CODE] },
                message: "Validare eșuată.",
            }
        }

        await prisma.user.update({
            where: { email },
            data: {
                isVerified: true,
                verifyToken: null,
            },
        })

        const cookieStore = await cookies()
        cookieStore.delete("pending_verification_email")

        return {
            success: true,
            message: AUTH_MESSAGES.VERIFICATION.SUCCESS,
        }
    } catch (error) {
        console.error("Verification Error:", error)
        return {
            success: false,
            message: AUTH_MESSAGES.GENERAL.ERROR,
        }
    }
}
