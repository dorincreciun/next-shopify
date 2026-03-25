"use client"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Field, FieldDescription, FieldLabel} from "@/components/ui/field"
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,} from "@/components/ui/input-otp"
import {Loader2, RefreshCwIcon} from "lucide-react"
import Link from "next/link";
import {useState} from "react";
import {useFormStatus} from "react-dom";

export interface VerifyFormProps {
    title?: string
    emailAddressToSend?: string
    handleResendCode?: () => void
    action?: (formData: FormData) => void
}

function SubmitButton() {
    const {pending} = useFormStatus();
    return (
        <Button
            type="submit"
            className="w-full max-w-62.5 mx-auto block"
            disabled={pending}
        >
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {pending ? "Verifying..." : "Verify"}
        </Button>
    );
}

export function VerifyForm({
                               title = "Verify your login",
                               emailAddressToSend = "m@example.com",
                               handleResendCode,
                               action
                           }: VerifyFormProps) {
    const [otp, setOtp] = useState("")

    return (
        <form action={action}>
            <Card className="mx-auto max-w-md">

                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        Enter the verification code we sent to your email address:{" "}
                        <span className="font-medium text-foreground">{emailAddressToSend}</span>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Field>
                        <div className="flex items-center justify-between mb-2">
                            <FieldLabel htmlFor="otp-verification">
                                Verification code
                            </FieldLabel>
                            <Button
                                type="button"
                                variant="outline"
                                size="xs"
                                onClick={handleResendCode}
                            >
                                <RefreshCwIcon className="mr-1 h-3 w-3" />
                                Resend Code
                            </Button>
                        </div>

                        <InputOTP
                            maxLength={6}
                            id="otp-verification"
                            required
                            value={otp}
                            onChange={setOtp}
                        >
                            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator className="mx-2" />
                            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        {/* Datele care pleacă spre Server Action */}
                        <input
                            type="hidden"
                            name="otpCode"
                            value={otp}
                        />
                        <input
                            type="hidden"
                            name="email"
                            value={emailAddressToSend}
                        />

                        <FieldDescription className="mt-2 text-center">
                            <Link
                                href="#"
                                className="hover:text-primary transition-colors"
                            >
                                I no longer have access to this email address.
                            </Link>
                        </FieldDescription>
                    </Field>
                </CardContent>
                <CardFooter>
                    <div className="w-full space-y-4">
                        <SubmitButton />
                        <div className="text-sm text-muted-foreground text-center">
                            Having trouble signing in?{" "}
                            <Link
                                href="#"
                                className="underline underline-offset-4 transition-colors hover:text-primary"
                            >
                                Contact support
                            </Link>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </form>
    )
}