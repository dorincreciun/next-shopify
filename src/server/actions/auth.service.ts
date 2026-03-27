"use server"

import {LoginSchema, RegisterSchema, VerifySchema} from "@/server/validators";
import type {FormState} from "@/shared/types";
import prisma from "@/shared/lib/prisma";
import {cookies} from "next/headers";
import {validateFormFields} from "@/shared/utils";
import {generateSessionMetadata, hashPassword} from "@/server/services";

export const loginAction = async (state: FormState<LoginSchema>, formData: FormData): Promise<FormState<LoginSchema>> => {
    return undefined
}

export const registerAction = async (state: FormState<RegisterSchema>, formData: FormData): Promise<FormState<RegisterSchema>> => {
    const result = validateFormFields(RegisterSchema, formData)

    if (!result.success) {
        return {
            errors: result.error,
            messages: result.message,
        }
    }

    const {data} = result

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email}
        })

        if (existingUser) {
            return { errors: { email: ['Acest email este deja utilizat.'] } };
        }

        const hashedPassword = await hashPassword(data.password)
        const session = await generateSessionMetadata()

        const newUser = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                sessions: {
                    create: {
                        token: session.token,
                        expiresAt: session.expiresAt,
                    }
                }
            }
        })

        const cookiesStore = await cookies()
        cookiesStore.set('session-token', session.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: session.expiresAt,
            path: '/',
        })

    } catch (e) {
        console.error(e)
    }
}

export const verifyAction = async (state: FormState<VerifySchema>, formData: FormData): Promise<FormState<VerifySchema>> => {
    return undefined
}
