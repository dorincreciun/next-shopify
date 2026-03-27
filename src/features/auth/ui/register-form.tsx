"use client"

import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Input
} from "@/shared/ui"
import Link from "next/link";
import {Routing} from "@/shared/constants";
import {ComponentProps, useActionState} from "react";
import {registerAction} from "@/server/actions";

export function RegisterForm({ ...props }: ComponentProps<typeof Card>) {
    const [state, action, pending] = useActionState(registerAction, undefined)

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={action}>
                    <FieldGroup>
                        <div className="grid grid-cols-2 gap-4">
                            {/* First Name */}
                            <Field data-invalid={!!state?.errors?.firstName}>
                                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="John"
                                    required
                                    disabled={pending}
                                    aria-invalid={!!state?.errors?.firstName}
                                    aria-describedby={state?.errors?.firstName ? "firstName-error" : undefined}
                                />
                                {state?.errors?.firstName && (
                                    <FieldDescription id="firstName-error">{state.errors.firstName}</FieldDescription>
                                )}
                            </Field>

                            {/* Last Name */}
                            <Field data-invalid={!!state?.errors?.lastName}>
                                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Doe"
                                    required
                                    disabled={pending}
                                    aria-invalid={!!state?.errors?.lastName}
                                    aria-describedby={state?.errors?.lastName ? "lastName-error" : undefined}
                                />
                                {state?.errors?.lastName && (
                                    <FieldDescription id="lastName-error">{state.errors.lastName}</FieldDescription>
                                )}
                            </Field>
                        </div>

                        {/* Email */}
                        <Field data-invalid={!!state?.errors?.email}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                disabled={pending}
                                aria-invalid={!!state?.errors?.email}
                                aria-describedby={state?.errors?.email ? "email-error" : undefined}
                            />
                            {state?.errors?.email && (
                                <FieldDescription id="email-error">{state.errors.email}</FieldDescription>
                            )}
                        </Field>

                        {/* Password */}
                        <Field data-invalid={!!state?.errors?.password}>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                disabled={pending}
                                aria-invalid={!!state?.errors?.password}
                                aria-describedby={state?.errors?.password ? "password-error" : "password-hint"}
                            />
                            {state?.errors?.password ? (
                                <FieldDescription id="password-error">{state.errors.password}</FieldDescription>
                            ) : (
                                <FieldDescription id="password-hint">Min. 6 characters.</FieldDescription>
                            )}
                        </Field>

                        {/* Confirm Password */}
                        <Field data-invalid={!!state?.errors?.confirmPassword}>
                            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                disabled={pending}
                                aria-invalid={!!state?.errors?.confirmPassword}
                                aria-describedby={state?.errors?.confirmPassword ? "confirm-error" : undefined}
                            />
                            {state?.errors?.confirmPassword && (
                                <FieldDescription id="confirm-error">{state.errors.confirmPassword}</FieldDescription>
                            )}
                        </Field>

                        {/* Actions & Global Errors */}
                        <div className="flex flex-col gap-2">
                            <Button type="submit" disabled={pending} className="w-full">
                                {pending ? "Creating account..." : "Create Account"}
                            </Button>

                            {state?.errors?.form && (
                                <p className="text-sm text-destructive text-center">{state.errors.form}</p>
                            )}

                            <Button variant="outline" type="button" disabled={pending} className="w-full">
                                Sign up with Google
                            </Button>

                            <FieldDescription className="text-center mt-2">
                                Already have an account?{" "}
                                <Link href={Routing.DASHBOARD_LOGIN} className="underline underline-offset-4">
                                    Sign in
                                </Link>
                            </FieldDescription>
                        </div>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}