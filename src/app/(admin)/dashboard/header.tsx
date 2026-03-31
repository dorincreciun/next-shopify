import { Button, Input, InputControl, InputField, InputSlot } from "@/components/ui"
import { Bell, Mail, Search } from "lucide-react"

export const Header = () => {
    return (
        <header className="rounded-xl border border-black/5 bg-white px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Input className="min-w-64 max-w-112.5 flex-1">
                    <InputControl>
                        <InputSlot>
                            <Search size={18} className="text-[#888888]" />
                        </InputSlot>
                        <InputField placeholder="Search..." />
                    </InputControl>
                </Input>

                <div className="flex shrink-0 items-center gap-2">
                    <Button onlyIcon color="secondary" kind="soft">
                        <Bell size={18} />
                    </Button>
                    <Button onlyIcon color="secondary" kind="soft">
                        <Mail size={18} />
                    </Button>
                </div>
            </div>
        </header>
    )
}
