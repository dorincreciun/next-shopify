"use server"

import { signUpSchema, SignUpSchema } from "@shared/schemas"
import { FormState } from "@shared/types"
import { validateFormFields } from "@shared/utils"
import prisma from "@shared/lib/prisma"
import { AUTH_MESSAGES } from "@shared/constants/auth.messages"
import { hash } from "bcryptjs"
import { randomInt } from "node:crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type SignUpState = FormState<SignUpSchema>

export async function signUp(state: SignUpState, formData: FormData): Promise<SignUpState> {
    const result = validateFormFields(signUpSchema, formData)

    if (!result.success) {
        return {
            errors: result.error,
            success: false,
            message: result.message,
        }
    }

    const { data } = result

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        })

        if (existingUser) {
            return {
                errors: { email: [AUTH_MESSAGES.EMAIL.ALREADY_EXISTS] },
                success: false,
            }
        }

        const hashedPassword = await hash(data.password, 12)
        const verifyToken = randomInt(100000, 999999).toString()

        await prisma.user.create({
            data: {
                email: data.email,
                hashedPassword: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                verifyToken: verifyToken,
                isVerified: false,
            },
        })

        const cookie = await cookies()
        const cookieName = "pending_verification_email"
        cookie.set(cookieName, data.email, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 15,
            path: "/",
        })

        /*        return {
            success: true,
            message: AUTH_MESSAGES.SUCCESS.REGISTERED,
        }*/
    } catch (e) {
        console.error("SignUp Error:", e)
        return {
            success: false,
            message: AUTH_MESSAGES.GENERAL.ERROR,
        }
    }

    redirect("/admin/verify")
}
