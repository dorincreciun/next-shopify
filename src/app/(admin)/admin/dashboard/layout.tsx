import { PropsWithChildren } from "react"
import { SidebarInset, SidebarProvider } from "@shared/ui/sidebar"
import { AdminSidebar, Header } from "@/widgets/admin"
import { TooltipProvider } from "@shared/ui/tooltip"

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <TooltipProvider>
            <SidebarProvider>
                <AdminSidebar />
                <SidebarInset>
                    <Header />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    )
}
