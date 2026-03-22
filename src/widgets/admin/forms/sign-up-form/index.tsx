import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/ui/card"

import { ComponentProps } from "react"
import { Form } from "./form"

export function SignUpForm({ ...props }: ComponentProps<typeof Card>) {
    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form />
            </CardContent>
        </Card>
    )
}
