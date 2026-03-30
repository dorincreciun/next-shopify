import { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        default: "Client",
        template: "Client | %s",
    },
}

interface ClientLayout {
    children: ReactNode
}

export default function ClientLayout({children}: ClientLayout) {
    return (
        <>
            <aside>sidebar</aside>
            {children}
        </>
    )
}