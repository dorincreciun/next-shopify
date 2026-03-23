import { VerifyForm } from "@/widgets/admin"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function VerifyPage() {
    const cookieStore = await cookies()
    const email = cookieStore.get("pending_verification_email")?.value

    if (!email) redirect("/admin/register")

    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <div className="w-full max-w-112.5">
                <VerifyForm email={email} />
            </div>
        </div>
    )
}
