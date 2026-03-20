import { PropsWithChildren } from "react"

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <div>
            <aside>Sidebar</aside>
            <div>
                <header>Header</header>
                {children}
            </div>
        </div>
    )
}
