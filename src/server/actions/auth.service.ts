"use server"

import {LoginSchema, RegisterSchema, VerifySchema} from "@/server/validators";
import type {FormState} from "@/shared/types";
import {z} from "zod";

const validateFields = <T extends z.ZodTypeAny>(schema: T, formData: FormData) => {
    const {data, error} = schema.safeParse(formData)

    if(error) {
        return {
            errors: error.flatten((m) => m.message)
        }
    }

    return data
}

export const loginAction = async (state: FormState<LoginSchema>, formData: FormData): Promise<FormState<LoginSchema>> => {}

export const registerAction = async (state: FormState<RegisterSchema>, formData: FormData): Promise<FormState<RegisterSchema>> => {}

export const verifyAction = async (state: FormState<VerifySchema>, formData: FormData): Promise<FormState<VerifySchema>> => {}
