import { ReactNode } from "react"
import type { Metadata } from "next"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui"
import { Header } from "@/app/(admin)/dashboard/header"

export const metadata: Metadata = {
    title: {
        default: "Dashboard",
        template: "Dashboard | %s",
    },
}

interface DashboardLayout {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayout) {
    return (
        <div className="flex min-h-screen w-full gap-4 bg-[#F9F9F9] p-4">
            <Sidebar>
                <SidebarHeader>
                    {/* Logo */}
                    Admin panel
                </SidebarHeader>
                <SidebarContent>SidebarContent</SidebarContent>
                <SidebarFooter>SidebarFooter</SidebarFooter>
            </Sidebar>
            <div className="flex min-w-0 flex-1 flex-col gap-4">
                <Header />
                <main className="flex-1 rounded-xl border border-black/5 bg-white p-5">{children}</main>
            </div>
        </div>
    )
}
