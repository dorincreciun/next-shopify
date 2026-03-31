import type { Metadata } from "next"
import { LoginForm } from "@/app/(admin)/dashboard/auth/login/login-form"

export const metadata: Metadata = {
    title: "Login",
}

export default function LoginPage() {
    return <LoginForm />
}
