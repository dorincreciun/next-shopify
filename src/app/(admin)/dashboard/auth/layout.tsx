import {ReactNode} from "react";

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({children}: AuthLayoutProps) {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="max-w-112.5 w-full">
                {children}
            </div>
        </div>
    )
}