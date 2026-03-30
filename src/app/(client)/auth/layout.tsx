import { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        default: "Authorization",
        template: "Authorization | %s",
    },
}

interface AuthLayout {
    children: ReactNode
}

export default function AuthLayout({ children }: AuthLayout) {
    return <>{children}</>
}
