import type {Metadata} from "next";
import "./styles/index.css";
import {ReactNode} from "react";
import { Inter } from "next/font/google";
import { cn } from "@/shared/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
    title: {
        template: "%s",
        default: "App"
    },
};

interface RootLyoutProps {
    children: ReactNode
}

export default function RootLayout({children}: RootLyoutProps) {
    return (
        <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
