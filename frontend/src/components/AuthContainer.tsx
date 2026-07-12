import { Navigate, Outlet } from "react-router"
import { useUser } from '@clerk/react'
import { Loader } from "lucide-react";

const AuthContainer = () => {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div
                className="flex min-h-screen w-full items-center justify-center bg-background"
                role="status"
                aria-label="Loading application"
            >
                <div className="flex items-center gap-2">
                    {/* Spinner */}
                    <Loader className="animate-spin text-secondary size-6" strokeWidth={2} />

                    {/* Brand text */}
                    <span className="font-heading font-semibold tracking-widest uppercase text-text-secondary">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <>
            {isSignedIn ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}

export default AuthContainer