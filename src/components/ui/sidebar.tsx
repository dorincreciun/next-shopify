import { PropsWithChildren } from "react"

export const Sidebar = ({ children }: PropsWithChildren) => {
    return (
        <aside className="flex w-72 shrink-0 flex-col rounded-xl border border-black/5 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            {children}
        </aside>
    )
}

export const SidebarHeader = ({ children }: PropsWithChildren) => {
    return (
        <div className="border-b border-black/5 px-2 pb-3 text-sm font-semibold tracking-tight text-[#2E2E2E]">
            {children}
        </div>
    )
}

export const SidebarFooter = ({ children }: PropsWithChildren) => {
    return <div className="mt-3 border-t border-black/5 px-2 pt-3 text-sm text-[#888888]">{children}</div>
}

export const SidebarContent = ({ children }: PropsWithChildren) => {
    return <div className="flex-1 px-2 py-3 text-sm text-[#555555]">{children}</div>
}
