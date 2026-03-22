"use server"

import { SignUpFormState, signUpSchema } from "@shared/validators"
import prisma from "@shared/lib/prisma"
import bcrypt from "bcryptjs"

export async function signUp(state: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
    const rawData = Object.fromEntries(formData.entries())
    const validatedFields = signUpSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { fullName, email, password } = validatedFields.data

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return {
                errors: { email: ["Acest email este deja înregistrat."] },
            }
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        await prisma.user.create({
            data: { email, hashedPassword, fullName },
        })

        return { message: "Contul a fost creat cu succes." }
    } catch (error) {
        console.error("[signUp]", error)
        return {
            errors: { _form: ["Ceva nu a mers bine. Încearcă din nou."] },
        }
    }
}
