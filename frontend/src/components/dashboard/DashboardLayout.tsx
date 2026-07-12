import { Navigate, Outlet } from "react-router"
import { useUser } from '@clerk/react'
import { Loader2 } from "lucide-react";
import { Sidebar } from "./Sidebar";

const DashboardLayout = () => {
    // Authentication Checking
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
                    <Loader2 className="animate-spin text-secondary size-6" strokeWidth={2} />

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
            {
                isSignedIn ? (
                    <div className="flex min-h-screen">
                        <Sidebar />
                        <main className="flex-1 p-10">
                            <Outlet />
                        </main>
                    </div>
                ) : (
                    <Navigate to="/" />
                )
            }
        </>
    )
}

export default DashboardLayout