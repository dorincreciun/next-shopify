"use client"

import {cn} from "@/shared/lib/utils"
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
import {loginAction} from "@/server/actions";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
    const [state, action, pending] = useActionState(loginAction, undefined)

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={action}>
                        <FieldGroup>
                            {/* Email Field */}
                            <Field data-invalid={!!state?.errors?.email}>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    aria-describedby={state?.errors?.email ? "email-error" : undefined}
                                    aria-invalid={!!state?.errors?.email}
                                    disabled={pending}
                                />
                                {state?.errors?.email && (
                                    <FieldDescription id="email-error">
                                        {state.errors.email}
                                    </FieldDescription>
                                )}
                            </Field>

                            {/* Password Field */}
                            <Field data-invalid={!!state?.errors?.password}>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Link
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    aria-describedby={state?.errors?.password ? "password-error" : undefined}
                                    aria-invalid={!!state?.errors?.password}
                                    disabled={pending}
                                />
                                {state?.errors?.password && (
                                    <FieldDescription id="password-error">
                                        {state.errors.password}
                                    </FieldDescription>
                                )}
                            </Field>

                            {/* Actions & Global Errors */}
                            <Field data-invalid={!!state?.errors?.form}>
                                <Button type="submit" disabled={pending}>
                                    {pending ? "Logging in..." : "Login"}
                                </Button>
                                <Button variant="outline" type="button" disabled={pending}>
                                    Login with Google
                                </Button>

                                {state?.errors?.form && (
                                    <FieldDescription className="text-center text-destructive">
                                        {state.errors.form}
                                    </FieldDescription>
                                )}

                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    <Link href={Routing.DASHBOARD_REGISTER} className="underline">
                                        Sign up
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}