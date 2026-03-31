import {
    Button,
    Input,
    InputControl,
    InputField,
    InputHelper,
    InputLabel,
    InputSlot,
} from "@/components/ui"
import { LockIcon, MailIcon } from "lucide-react"
import Link from "next/link"

export const LoginForm = () => {
    return (
        <form className="space-y-5">
            <Input>
                <InputLabel>Email</InputLabel>
                <InputControl variant="primary">
                    <InputSlot>
                        <MailIcon size={18} />
                    </InputSlot>
                    <InputField type="email" placeholder="exemplu@mail.com" />
                </InputControl>
                <InputHelper />
            </Input>

            <Input>
                <InputLabel>Parolă</InputLabel>
                <InputControl variant="primary">
                    <InputSlot>
                        <LockIcon size={18} />
                    </InputSlot>
                    <InputField type="password" placeholder="••••••••" />
                </InputControl>
                <InputHelper />
            </Input>

            {/* Afișare eroare de server (root) */}
            {/*{errors.root && (
                <div
                    className={cn(
                        "animate-in fade-in slide-in-from-top-1 mt-1.5 ml-1 text-[11px]",
                        "font-medium text-red-500 transition-all duration-300",
                    )}
                >
                    {errors.root.message}
                </div>
            )}*/}

            <Button className="w-full" type="submit">
                Conectare
            </Button>

            <div className="mt-2 flex items-center justify-center gap-2 border-t border-gray-100 pt-4 text-center">
                <p className="text-sm text-gray-600">Ai uitat parola?</p>
                <Link
                    href={""}
                    className="text-sm text-[#FE5F00] transition-colors hover:text-[#FE5F00]/70"
                >
                    Recuperează contul
                </Link>
            </div>
        </form>
    )
}
