import { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        default: "Dashboard",
        template: "Dashboard | %s",
    },
}

interface DashboardLayout {
    children: ReactNode
}

export default function DashboardLayout({children}: DashboardLayout) {
    return (
        <>
            <aside>sidebar</aside>
            {children}
        </>
    )
}