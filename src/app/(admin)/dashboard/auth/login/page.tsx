import {Metadata} from "next";
import {LoginForm} from "@/components/common";

export const metadata: Metadata = {
    title: "Login"
}

export default function LoginPage() {
    return <LoginForm />
}