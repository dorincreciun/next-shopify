"use client"

import type { ButtonHTMLAttributes } from "react"
import { Slot } from "@radix-ui/react-slot"
import { Loader } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib"

// --- TYPES ---

type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">

interface ButtonProps extends NativeButtonProps, VariantProps<typeof buttonCva> {
    isLoading?: boolean
    asChild?: boolean
}

// --- STYLES (CVA) ---

const buttonCva = cva(
    [
        "relative inline-flex items-center justify-center gap-2",
        "font-medium select-none outline-none",
        "rounded-xl cursor-pointer",
        "transition-all duration-150 ease-out",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        "active:scale-[0.98]",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        "overflow-hidden",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "before:transition-transform before:duration-700",
        "enabled:hover:before:translate-x-full",
        "data-[loading=true]:cursor-wait",
    ],
    {
        variants: {
            size: {
                sm: "h-8 px-3 text-xs",
                md: "h-10 px-4 text-sm",
                lg: "h-12 px-6 text-base",
            },
            color: {
                primary: "",
                secondary: "",
                tertiary: "",
            },
            kind: {
                solid: "",
                outline: "border bg-transparent",
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
                className: [
                    "bg-[#FE5F00] text-white shadow-sm",
                    "enabled:hover:bg-[#F45A00] enabled:hover:shadow-md",
                    "active:bg-[#FE5F00] active:shadow-sm active:brightness-[0.96]",
                    "focus-visible:ring-[#FE5F00]/50",
                ],
            },
            {
                color: "primary",
                kind: "outline",
                className: [
                    "border-[#FE5F00] text-[#FE5F00]",
                    "enabled:hover:bg-[#FE5F00]/10",
                    "active:bg-[#FE5F00]/15",
                    "focus-visible:ring-[#FE5F00]/50",
                ],
            },
            {
                color: "primary",
                kind: "ghost",
                className: [
                    "text-[#FE5F00]",
                    "enabled:hover:bg-[#FE5F00]/10",
                    "active:bg-[#FE5F00]/15",
                    "focus-visible:ring-[#FE5F00]/50",
                ],
            },
            {
                color: "primary",
                kind: "soft",
                className: [
                    "bg-[#FE5F00]/10 text-[#FE5F00]",
                    "enabled:hover:bg-[#FE5F00]/18",
                    "active:bg-[#FE5F00]/22",
                    "focus-visible:ring-[#FE5F00]/50",
                ],
            },
            {
                color: "secondary",
                kind: "solid",
                className: [
                    "bg-[#FFFAF4] text-[#FE5F00] shadow-sm",
                    "enabled:hover:bg-[#FFF4E6]",
                    "active:bg-[#FFFAF4] active:brightness-[0.97]",
                    "focus-visible:ring-[#FE5F00]/30",
                ],
            },
            {
                color: "secondary",
                kind: "outline",
                className: [
                    "border-[#EDEDED] text-[#888888]",
                    "enabled:hover:border-[#FE5F00] enabled:hover:text-[#FE5F00]",
                    "active:bg-black/5",
                    "focus-visible:ring-gray-300",
                ],
            },
            {
                color: "secondary",
                kind: "ghost",
                className: [
                    "text-[#888888]",
                    "enabled:hover:text-[#FE5F00] enabled:hover:bg-gray-50",
                    "active:bg-gray-100",
                    "focus-visible:ring-gray-300",
                ],
            },
            {
                color: "secondary",
                kind: "soft",
                className: [
                    "bg-gray-100 text-gray-700",
                    "enabled:hover:bg-gray-200",
                    "active:bg-gray-200 active:brightness-[0.97]",
                    "focus-visible:ring-gray-300",
                ],
            },
            {
                color: "tertiary",
                kind: "solid",
                className: [
                    "bg-[#F3F4F6] text-[#4B5563] shadow-sm",
                    "enabled:hover:bg-[#E5E7EB] enabled:hover:text-[#374151] enabled:hover:shadow-md",
                    "active:bg-[#F3F4F6] active:brightness-[0.98]",
                    "focus-visible:ring-[#9CA3AF]/50",
                ],
            },
            {
                color: "tertiary",
                kind: "outline",
                className: [
                    "border-[#D1D5DB] text-[#4B5563]",
                    "enabled:hover:border-[#9CA3AF] enabled:hover:bg-[#F9FAFB] enabled:hover:text-[#374151]",
                    "active:bg-[#F3F4F6]",
                    "focus-visible:ring-[#9CA3AF]/50",
                ],
            },
            {
                color: "tertiary",
                kind: "ghost",
                className: [
                    "text-[#4B5563]",
                    "enabled:hover:bg-[#F3F4F6] enabled:hover:text-[#374151]",
                    "active:bg-[#E5E7EB]",
                    "focus-visible:ring-[#9CA3AF]/50",
                ],
            },
            {
                color: "tertiary",
                kind: "soft",
                className: [
                    "bg-[#EEF2F7] text-[#4B5563]",
                    "enabled:hover:bg-[#E2E8F0] enabled:hover:text-[#374151]",
                    "active:bg-[#DCE3EC]",
                    "focus-visible:ring-[#9CA3AF]/50",
                ],
            },
        ],
    },
)

// --- COMPONENT ---

/**
 * Componentă fundamentală de tip Buton, polimorfică și configurabilă prin variante.
 * Suportă stări de încărcare automate (via `react-dom` Form Status) și animații de tip "shimmer".
 * @param className - Clase CSS adiționale (Tailwind) pentru personalizare.
 * @param isLoading - Forțează afișarea stării de încărcare (spinner) și dezactivează interacțiunea.
 * @param disabled - Dezactivează butonul și previne interacțiunile utilizatorului.
 * @param size - Dimensiunea butonului. Opțiuni: `sm`, `md`, `lg`. Implicit: `md`.
 * @param color - Tema de culoare. Opțiuni: `primary`, `secondary`, `tertiary`. Implicit: `primary`.
 * @param kind - Stilul vizual al butonului. Opțiuni: `solid`, `outline`, `ghost`, `soft`. Implicit: `solid`.
 * @param children - Conținutul afișat în interiorul butonului.
 * @param onlyIcon - Dacă este `true`, aplică un raport de aspect pătrat, optimizat pentru iconițe.
 * @param asChild - Dacă este `true`, butonul va randa copilul său (folosind Radix Slot), păstrând stilurile.
 * @param rest - Restul atributelor native de buton HTML (ex: `onClick`, `type`, `form`).
 * @remarks
 * **Caracteristici speciale:**
 * 1. **Form Integration**: Utilizează `useFormStatus` pentru a afișa automat starea de loading în formulare.
 * 2. **Polimorfism**: Prin `asChild`, poate deveni un link (`<a>`) sau alt element, păstrând design-ul.
 * @example
 * ```tsx
 * <Button color="primary" kind="solid" onClick={() => console.log('click')}>
 *      Cumpără acum
 * </Button>
 * ```
 */
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

    return (
        <Comp
            disabled={buttonDisabled}
            className={cn(buttonCva({ size, color, kind, onlyIcon }), className)}
            data-loading={activeLoading ? "true" : "false"}
            {...rest}
        >
            <span
                className={cn(
                    "inline-flex items-center justify-center gap-2",
                    "transition-opacity duration-150",
                    activeLoading && "opacity-0",
                )}
            >
                {children}
            </span>

            {activeLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <Loader className="animate-spin" size={20} />
                </span>
            )}
        </Comp>
    )
}
