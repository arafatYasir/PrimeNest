import { Link, NavLink } from "react-router";
import { Home } from "lucide-react"
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

const navItems = [
    { label: "Browse Properties", to: "/properties" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" }
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm supports-backdrop-filter:bg-background/50">
            <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* ---- Logo + Nav links ---- */}
                <div className="flex items-center gap-10">
                    {/* ---- Logo ----*/}
                    <Link
                        to="/"
                        className="group flex items-center gap-2.5"
                        aria-label="PrimeNest Home"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                            <Home className="h-5 w-5" strokeWidth={2.5} />
                        </span>
                        <span className="font-heading text-xl font-bold tracking-tight text-primary">
                            Prime<span className="text-accent">Nest</span>
                        </span>
                    </Link>

                    {/* ---- Nav links ---- */}
                    <ul className="hidden items-center gap-8 md:flex">
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) =>
                                        cn(
                                            "group relative text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-primary",
                                            isActive && "text-primary"
                                        )
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {item.label}
                                            <span
                                                className={cn(
                                                    "absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-x-100",
                                                    isActive && "scale-x-100"
                                                )}
                                            />
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ---- Authentication Part ---- */}
                <div className="flex items-center gap-3">
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <Button size="lg">Sign In</Button>
                        </SignInButton>
                    </Show>
                    <Show when="signed-in">
                        <Link to="/dashboard">
                            <Button size="lg">Dashboard</Button>
                        </Link>
                        <UserButton appearance={{
                            elements: {
                                userButtonAvatarBox: "size-9!",
                            }
                        }} />
                    </Show>
                </div>
            </nav>
        </header>
    );
}