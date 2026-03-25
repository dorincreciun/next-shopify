import {Metadata} from "next";
import {RegisterForm} from "@/components/common";

export const metadata: Metadata = {
    title: "Register"
}

export default function RegisterPage() {
    return <RegisterForm />
}