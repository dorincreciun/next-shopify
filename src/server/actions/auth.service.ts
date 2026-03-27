"use server"

import {LoginSchema, RegisterSchema, VerifySchema} from "@/server/validators";
import type {FormState} from "@/shared/types";
import prisma from "@/shared/lib/prisma";
import {validateFormFields} from "@/shared/utils";
import {generateSessionMetadata, hashPassword, setSession} from "@/server/services";

export const loginAction = async (state: FormState<LoginSchema>, formData: FormData): Promise<FormState<LoginSchema>> => {
    return undefined
}

export const registerAction = async (state: FormState<RegisterSchema>, formData: FormData): Promise<FormState<RegisterSchema>> => {
    const result = validateFormFields(RegisterSchema, formData);

    if (!result.success) {
        return { errors: result.error, messages: result.message };
    }

    const { data } = result;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
            return { errors: { email: ['Acest email este deja utilizat.'] } };
        }

        const hashedPassword = await hashPassword(data.password);
        const session = await generateSessionMetadata();

        await prisma.user.create({
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
        });

        await setSession({ token: session.token, expiresAt: session.expiresAt });
    } catch (e) {
        return { errors: { form: "Eroare la server. Vă rugăm să reîncercați." } };
    }

    return { messages: "Cont creat cu succes!"};
}

export const verifyAction = async (state: FormState<VerifySchema>, formData: FormData): Promise<FormState<VerifySchema>> => {
    return undefined
}
