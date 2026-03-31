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
    return (
        <div>
            <div className="absolute top-1/2 left-1/2 w-87.5 -translate-1/2">{children}</div>
        </div>
    )
}
