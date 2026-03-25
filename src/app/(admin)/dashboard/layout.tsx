import {ReactNode} from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        template: "Dashboard | %s",
        default: "Dashboard"
    },
};

interface DahsboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({children}: DahsboardLayoutProps) {
    return <>{children}</>
}