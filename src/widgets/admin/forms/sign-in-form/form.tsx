"use client"

import Link from "next/link"
import { Button, Field, FieldDescription, FieldGroup, FieldLabel, Input } from "@shared/ui"
import { useActionState } from "react"
import { login } from "@app/actions"

export const Form = () => {
    const [state, action, pending] = useActionState(login, undefined)
    return (
        <form action={action}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Link
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                    <Input id="password" type="password" required />
                </Field>
                <Field>
                    <Button type="submit" disabled={pending}>
                        Login
                    </Button>
                    <Button variant="outline" type="button">
                        Login with Google
                    </Button>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account? <Link href="/admin/register">Sign up</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
