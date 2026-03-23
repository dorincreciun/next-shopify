"use client"

import {
    Button,
    Field,
    FieldLabel,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@shared/ui"
import { RefreshCwIcon } from "lucide-react"
import { useActionState } from "react"
import Link from "next/link"
import { verifyAccount } from "@app/actions"

interface FormProps {
    email: string
}

export const Form = ({ email }: FormProps) => {
    const [state, action, pending] = useActionState(verifyAccount, undefined)
    return (
        <form action={action} id="verify-form" className="space-y-4">
            <input type="hidden" name="email" value={email} />

            <Field>
                <div className="mb-2 flex items-center justify-between">
                    <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs"
                        disabled={pending}
                    >
                        <RefreshCwIcon
                            className={`mr-2 h-3 w-3 ${pending ? "animate-spin" : ""}`}
                        />
                        Resend
                    </Button>
                </div>

                <InputOTP maxLength={6} id="otp" name="code" required disabled={pending}>
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator className="mx-2" />
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11">
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>

                {state?.errors?.code && (
                    <p className="text-destructive mt-2 text-sm font-medium">
                        {state.errors.code[0]}
                    </p>
                )}
            </Field>

            {state?.message && !state?.success && (
                <div className="bg-destructive/15 text-destructive rounded-md p-3 text-center text-sm">
                    {state.message}
                </div>
            )}

            <div className="flex flex-col gap-4">
                {/* Butonul de submit legat de formular prin atributul 'form' */}
                <Button form="verify-form" type="submit" className="w-full" disabled={pending}>
                    {pending ? "Verifying..." : "Verify Account"}
                </Button>

                <div className="text-muted-foreground text-center text-sm">
                    Having trouble?{" "}
                    <Link href="#" className="underline underline-offset-4">
                        Contact support
                    </Link>
                </div>
            </div>
        </form>
    )
}
