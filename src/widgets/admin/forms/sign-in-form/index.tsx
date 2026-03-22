import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/ui/card"

import { cn } from "@shared/lib"
import { Form } from "./form"
import { ComponentProps } from "react"

export function SignInForm({ className, ...props }: ComponentProps<"div">) {
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
                    <Form />
                </CardContent>
            </Card>
        </div>
    )
}
