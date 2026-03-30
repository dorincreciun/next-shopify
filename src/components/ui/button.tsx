"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader } from "lucide-react"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib"

// --- TYPES ---
type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">

interface ButtonProps extends NativeButtonProps, VariantProps<typeof buttonCva> {
    isLoading?: boolean
    asChild?: boolean
    children?: ReactNode
}

// --- STYLES (CVA) ---

const buttonCva = cva(
    [
        // 1. Layout & Positioning
        "relative inline-flex items-center justify-center gap-2",
        "overflow-hidden shrink-0",

        // 2. Typography & Behavior
        "font-medium antialiased whitespace-nowrap",
        "select-none outline-none",
        "cursor-pointer data-[loading=true]:cursor-wait",

        // 3. Visual Style (The "Body")
        "rounded-xl border border-transparent",
        "transition-all duration-150 ease-out",

        // 4. Interactive States
        "enabled:hover:brightness-110",
        "active:scale-[0.97]",
        "focus-visible:ring-2 focus-visible:ring-offset-2",

        // 5. Disabled State
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    ],
    {
        variants: {
            size: {
                sm: "h-8 px-3 text-xs gap-1.5",
                md: "h-10 px-5 text-sm gap-2",
                lg: "h-12 px-7 text-base gap-2.5",
            },
            color: {
                primary: "",
                secondary: "",
                tertiary: "",
            },
            kind: {
                solid: "shadow-sm",
                outline: "border-current bg-transparent",
                ghost: "bg-transparent",
                soft: "",
            },
            onlyIcon: {
                true: "aspect-square px-0",
            },
        },
        defaultVariants: {
            size: "md",
            color: "primary",
            kind: "solid",
        },
        compoundVariants: [
            {
                color: "primary",
                kind: "solid",
                className: "bg-green-500 text-white hover:bg-green-600",
            },
        ],
    },
)

// --- COMPONENT ---

export const Button = ({
    className,
    isLoading,
    disabled,
    size,
    color,
    kind,
    children,
    onlyIcon,
    asChild = false,
    ...rest
}: ButtonProps) => {
    const { pending } = useFormStatus()

    const activeLoading = Boolean(isLoading || pending)
    const buttonDisabled = Boolean(activeLoading || disabled)

    const Comp = asChild ? Slot : "button"

    // Mapare dimensiune Loader în funcție de mărimea butonului
    const loaderSize = size === "sm" ? 14 : size === "lg" ? 20 : 18

    return (
        <Comp
            disabled={buttonDisabled}
            className={cn(buttonCva({ size, color, kind, onlyIcon }), className)}
            data-loading={activeLoading ? "true" : "false"}
            {...rest}
        >
            {/* Conținutul butonului - se ascunde când e loading pentru a păstra dimensiunea */}
            <span
                className={cn(
                    "gap-inherit inline-flex items-center justify-center",
                    "transition-opacity duration-200",
                    activeLoading ? "opacity-0" : "opacity-100",
                )}
            >
                {children}
            </span>

            {/* Spinner-ul centrat absolut */}
            {activeLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <Loader
                        className="animate-spin text-current"
                        size={loaderSize}
                        strokeWidth={2.5}
                    />
                </span>
            )}
        </Comp>
    )
}
