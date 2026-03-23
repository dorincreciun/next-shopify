import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/ui"

import { Form } from "./form"

interface VerifyFormProps {
    email: string
}

export const VerifyForm = ({ email }: VerifyFormProps) => {
    return (
        <Card className="mx-auto max-w-md border-none shadow-none sm:border sm:shadow-sm">
            <CardHeader>
                <CardTitle>Verify your login</CardTitle>
                <CardDescription>
                    Enter the verification code we sent to:{" "}
                    <span className="text-primary font-medium">{email}</span>
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form email={email} />
            </CardContent>
        </Card>
    )
}
