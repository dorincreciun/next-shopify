"use client"

import {
    Button,
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    Input,
} from "@shared/ui"
import Link from "next/link"
import { useActionState } from "react"
import { signUp } from "@app/actions"

export const Form = () => {
    const [state, action, pending] = useActionState(signUp, undefined)

    return (
        <form action={action}>
            <FieldGroup>
                <Field data-invalid={Boolean(state?.errors?.fullName)}>
                    <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                    <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        required
                    />
                    {state?.errors?.fullName && <FieldError>{state.errors.fullName[0]}</FieldError>}
                </Field>

                <Field data-invalid={Boolean(state?.errors?.email)}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                    <FieldDescription>
                        We&apos;ll use this to contact you. We will not share your email with anyone
                        else.
                    </FieldDescription>
                    {state?.errors?.email && <FieldError>{state.errors.email[0]}</FieldError>}
                </Field>

                <Field data-invalid={Boolean(state?.errors?.password)}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" name="password" type="password" required />
                    <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                    {state?.errors?.password && <FieldError>{state.errors.password[0]}</FieldError>}
                </Field>

                <Field data-invalid={Boolean(state?.errors?.confirmPassword)}>
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <Input id="confirmPassword" name="confirmPassword" type="password" required />
                    <FieldDescription>Please confirm your password.</FieldDescription>
                    {state?.errors?.confirmPassword && (
                        <FieldError>{state.errors.confirmPassword[0]}</FieldError>
                    )}
                </Field>

                {state?.errors?._form && <FieldError>{state.errors._form[0]}</FieldError>}

                <FieldGroup>
                    <Field>
                        <Button type="submit" disabled={pending}>
                            {pending ? "Se creează..." : "Create Account"}
                        </Button>
                        <Button variant="outline" type="button">
                            Sign up with Google
                        </Button>
                        <FieldDescription className="px-6 text-center">
                            Already have an account? <Link href="/admin/login">Sign in</Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    )
}
