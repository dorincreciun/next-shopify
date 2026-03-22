import { SignInForm } from "@/widgets/admin"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <div className="w-full max-w-112.5">
                <SignInForm />
            </div>
        </div>
    )
}
