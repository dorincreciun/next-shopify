"use client"

import {
    createContext,
    type InputHTMLAttributes,
    type LabelHTMLAttributes,
    type ReactNode,
    useContext,
    useId,
} from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib"

const inputVariants = cva(
    [
        "flex items-center w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "rounded-xl border outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]",
    ],
    {
        variants: {
            variant: {
                primary: "bg-[#FAFAFA] border-black/6 focus-within:bg-white",
                secondary: "bg-white border-black/8",
            },
            inputSize: {
                sm: "h-8 px-2.5 text-xs gap-1.5",
                md: "h-10 px-3 text-sm gap-2",
                lg: "h-12 px-4 text-base gap-2.5",
            },
            status: {
                default: [
                    "focus-within:ring-1 focus-within:ring-[#FE5F00]/40",
                    "focus-within:border-[#FE5F00]/40 focus-within:shadow-[0_0_0_4px_rgba(254,95,0,0.04)]",
                ],
                error: [
                    "border-red-500/30 bg-red-50/20",
                    "focus-within:ring-1 focus-within:ring-red-500/40 focus-within:border-red-500/40",
                    "focus-within:shadow-[0_0_0_4px_rgba(239,68,68,0.06)]",
                ],
                success: [
                    "border-emerald-500/30 bg-emerald-50/20",
                    "focus-within:ring-1 focus-within:ring-emerald-500/40",
                    "focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.06)]",
                ],
                loading: [],
                disabled: [
                    "bg-gray-100/80 border-gray-200/50 opacity-60 shadow-none cursor-not-allowed select-none",
                ],
            },
        },
        defaultVariants: {
            variant: "primary",
            inputSize: "md",
            status: "default",
        },
    },
)

export type InputStatus = "default" | "error" | "success" | "loading" | "disabled"

interface InputContextValue {
    id: string
    status: InputStatus
}

const InputContext = createContext<InputContextValue | null>(null)

const useInputContext = (): InputContextValue => {
    const ctx = useContext(InputContext)
    if (!ctx) throw new Error("Sub-componentele Input.* trebuie folosite în <Input />")
    return ctx
}

interface InputRootProps {
    id?: string
    status?: InputStatus
    children: ReactNode
    className?: string
}

/**
 * Componentă container principală pentru câmpurile de introducere date.
 * Gestionează contextul de stare (error, success, etc.) și ID-ul unic pentru accesibilitate.
 * @example
 * ```tsx
 * <Input status="default">
 *      <InputLabel>Adresă de email</InputLabel>
 *      <InputControl variant="primary">
 *          <InputSlot><Mail size={18} /></InputSlot>
 *          <InputField type="email" placeholder="exemplu@mail.com" />
 *      </InputControl>
 *      <InputHelper>Nu vom partaja email-ul tău.</InputHelper>
 * </Input>
 * ```
 */
export const Input = ({
    id: externalId,
    status = "default",
    children,
    className,
}: InputRootProps) => {
    const generatedId = useId()
    const id = externalId ?? generatedId

    return (
        <InputContext.Provider value={{ id, status }}>
            <div className={cn("group/field flex w-full flex-col", className)}>{children}</div>
        </InputContext.Provider>
    )
}

const labelStatusStyles: Record<InputStatus, string> = {
    default: "text-gray-700",
    error: "text-red-600",
    success: "text-emerald-700",
    loading: "text-gray-700",
    disabled: "text-gray-400 cursor-not-allowed",
}

/**
 * Componentă pentru eticheta (label) input-ului.
 * Se leagă automat la `InputField` prin ID-ul partajat.
 * @example
 * ```tsx
 * <InputLabel className="uppercase tracking-wide">
 *      Nume utilizator
 * </InputLabel>
 * ```
 */
export const InputLabel = ({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => {
    const { id, status } = useInputContext()

    return (
        <label
            htmlFor={id}
            className={cn(
                "mb-1.5 ml-1 block text-sm font-medium transition-colors duration-300",
                labelStatusStyles[status],
                className,
            )}
            {...props}
        />
    )
}

interface InputControlProps extends VariantProps<typeof inputVariants> {
    children: ReactNode
    className?: string
}

/**
 * Wrapper-ul vizual al input-ului care gestionează bordurile, background-ul și stările de focus.
 * @param variant - Stilul de fundal: `primary` sau `secondary`.
 * @param inputSize - Înălțimea și padding-ul: `sm`, `md`, `lg`.
 * @example
 * ```tsx
 * <InputControl variant="secondary" inputSize="lg">
 *      <InputField placeholder="Scrie aici..." />
 * </InputControl>
 * ```
 */
export const InputControl = ({ children, variant, inputSize, className }: InputControlProps) => {
    const { status } = useInputContext()

    return (
        <div className={cn(inputVariants({ variant, inputSize, status }), className)}>
            {children}
        </div>
    )
}

interface InputSlotProps {
    children: ReactNode
    className?: string
}

/**
 * Container pentru elemente decorative (iconițe, butoane, text static) în interiorul `InputControl`.
 * @example
 * ```tsx
 * <InputSlot className="text-blue-500">
 *      <SearchIcon size={16} />
 * </InputSlot>
 * ```
 */
export const InputSlot = ({ children, className }: InputSlotProps) => (
    <div
        className={cn(
            "flex shrink-0 items-center justify-center text-gray-400 select-none",
            className,
        )}
    >
        {children}
    </div>
)

/**
 * Elementul nativ `<input />` stilizat.
 * Preia automat ID-ul și starea de `disabled` din context.
 * @example
 * ```tsx
 * <InputField
 *      type="password"
 *      placeholder="••••••••"
 *      onChange={(e) => console.log(e.target.value)}
 * />
 * ```
 */
export const InputField = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
    const { id, status } = useInputContext()
    const isDisabled = status === "disabled" || status === "loading" || props.disabled

    return (
        <input
            {...props}
            id={id}
            disabled={isDisabled}
            className={cn(
                "h-full w-full border-none bg-transparent px-0 outline-none focus:ring-0",
                "font-light tracking-tight text-gray-700 placeholder:text-gray-300",
                isDisabled && "cursor-not-allowed",
                className,
            )}
        />
    )
}

const helperStatusStyles: Record<InputStatus, string> = {
    default: "text-gray-400",
    error: "text-red-500 font-medium",
    success: "text-emerald-600 font-medium",
    loading: "text-gray-400",
    disabled: "text-gray-300",
}

interface InputHelperProps {
    children?: ReactNode
    className?: string
}

/**
 * Text informativ sau de eroare afișat sub input.
 * Își schimbă automat culoarea și rolul ARIA în funcție de starea input-ului.
 * @example
 * ```tsx
 * <InputHelper>
 *      Parola trebuie să conțină minim 8 caractere.
 * </InputHelper>
 * ```
 */
export const InputHelper = ({ children, className }: InputHelperProps) => {
    const { id, status } = useInputContext()

    if (!children) return null

    return (
        <p
            id={`${id}-helper`}
            role={status === "error" ? "alert" : "status"}
            className={cn(
                "animate-in fade-in slide-in-from-top-1 mt-1.5 ml-1 text-[11px] transition-all duration-300",
                helperStatusStyles[status],
                className,
            )}
        >
            {children}
        </p>
    )
}
