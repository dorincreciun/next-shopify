"use client"

import { Button, Field, FieldGroup, FieldLabel, Input } from "@shared/ui"
import Link from "next/link"
import { useActionState } from "react"
import { register } from "@app/actions"

export const Form = () => {
    const [state, action, pending] = useActionState(register, undefined)

    return (
        <form action={action} noValidate className="space-y-6">
            <FieldGroup className="grid max-w-md gap-4">
                {/* Rândul 1: Prenume și Nume */}
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="firstName">
                            First Name <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                            id="firstName"
                            name="firstName"
                            placeholder="Jordan"
                            defaultValue="Jordan" // Schimbat din value
                            required
                            aria-invalid={!!state?.errors?.firstName}
                        />
                        {state?.errors?.firstName && (
                            <p className="text-destructive mt-1 text-sm">
                                {state.errors.firstName[0]}
                            </p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="lastName">
                            Last Name <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Lee"
                            defaultValue="Lee" // Schimbat din value
                            required
                            aria-invalid={!!state?.errors?.lastName}
                        />
                        {state?.errors?.lastName && (
                            <p className="text-destructive mt-1 text-sm">
                                {state.errors.lastName[0]}
                            </p>
                        )}
                    </Field>
                </div>

                {/* Rândul 2: Email */}
                <Field>
                    <FieldLabel htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jordan.lee@example.com"
                        defaultValue="jordan.lee@example.com" // Schimbat din value
                        required
                        aria-invalid={!!state?.errors?.email}
                    />
                    {state?.errors?.email && (
                        <p className="text-destructive mt-1 text-sm">{state.errors.email[0]}</p>
                    )}
                </Field>

                {/* Rândul 3: Parola */}
                <Field>
                    <FieldLabel htmlFor="password">
                        Password <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        defaultValue="Password1234!" // Schimbat din value
                        required
                        aria-invalid={!!state?.errors?.password}
                    />
                    {state?.errors?.password && (
                        <p className="text-destructive mt-1 text-sm">{state.errors.password[0]}</p>
                    )}
                </Field>

                {/* Rândul 4: Confirmare Parolă */}
                <Field>
                    <FieldLabel htmlFor="confirmPassword">
                        Confirm Password <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        defaultValue="Password1234!" // Schimbat din value
                        required
                        aria-invalid={!!state?.errors?.confirmPassword}
                    />
                    {state?.errors?.confirmPassword && (
                        <p className="text-destructive mt-1 text-sm">
                            {state.errors.confirmPassword[0]}
                        </p>
                    )}
                </Field>

                {/* Mesaj global de eroare */}
                {state?.message && !state?.success && (
                    <div className="bg-destructive/15 text-destructive mt-2 rounded-md p-3 text-sm">
                        {state.message}
                    </div>
                )}

                {/* Spațiere și Acțiuni (Buton + Link) */}
                <div className="space-y-4 pt-4">
                    <Button type="submit" className="w-full" disabled={pending}>
                        {pending ? "Creating account..." : "Sign Up"}
                    </Button>

                    <p className="text-muted-foreground text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            href="/admin/login"
                            className="text-primary font-medium underline-offset-4 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </FieldGroup>
        </form>
    )
}
