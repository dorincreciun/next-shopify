import { z } from "zod"

type ValidationResult<T> =
    | { success: true; data: T; error: null }
    | { success: false; data: null; error: Record<string, string[]>; message: string }

export const validateFormFields = <T extends z.ZodType>(
    schema: T,
    formData: FormData,
): ValidationResult<z.infer<T>> => {
    const raw = Object.fromEntries(formData.entries())
    const result = schema.safeParse(raw)

    if (!result.success) {
        const flattened = result.error.flatten((issue) => issue.message)

        return {
            success: false,
            data: null,
            error: flattened.fieldErrors as Record<string, string[]>,
            message: "Datele introduse sunt invalide.",
        }
    }

    return {
        success: true,
        data: result.data,
        error: null,
    }
}
