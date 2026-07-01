import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Bell, Home, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetTitle,
    SheetHeader,
} from "./ui/sheet";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { navItems } from "@/lib/data";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-999 w-full border-b border-border bg-background/80 backdrop-blur-sm supports-backdrop-filter:bg-background/50">
            <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* ---- Left: Hamburger ---- */}
                <div className="flex items-center gap-3 lg:gap-0">
                    {/* ---- Mobile menu trigger ---- */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger>
                            <Button
                                variant="outline"
                                size="icon-lg"
                                aria-label="Open menu"
                                className="text-text-secondary active:bg-section active:text-primary lg:hidden"
                            >
                                <Menu className="size-5" strokeWidth={2.25} />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="w-72 p-0">
                            <SheetHeader className="border-b border-border p-4">
                                {/* ---- Logo (sidebar) ---- */}
                                <SheetClose>
                                    <Link
                                        to="/"
                                        className="flex items-center gap-2.5"
                                        aria-label="PrimeNest Home"
                                    >
                                        <span className="flex size-7 xs:size-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                                            <Home className="size-4 xs:size-5" strokeWidth={2.5} />
                                        </span>
                                        <SheetTitle className="font-heading text-lg xs:text-xl font-bold tracking-tight text-primary">
                                            Prime<span className="text-accent">Nest</span>
                                        </SheetTitle>
                                    </Link>
                                </SheetClose>
                            </SheetHeader>

                            {/* ---- Nav links ---- */}
                            <ul className="flex flex-col gap-1 p-4">
                                {navItems.map((item) => (
                                    <li key={item.to}>
                                        <SheetClose>
                                            <NavLink
                                                to={item.to}
                                                className={({ isActive }) =>
                                                    cn(
                                                        "block rounded-md px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors active:bg-section active:text-primary",
                                                        isActive && "text-accent"
                                                    )
                                                }
                                            >
                                                {item.label}
                                            </NavLink>
                                        </SheetClose>
                                    </li>
                                ))}
                            </ul>

                            {/* ---- Action Buttons ---- */}
                            <div className="px-4 sm:hidden">
                                <Show when="signed-in">
                                    <SheetClose className="w-full">
                                        <Button size="lg" className="w-full">
                                            <Link to="/dashboard">
                                                Dashboard
                                            </Link>
                                        </Button>
                                    </SheetClose>
                                </Show>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* ---- Logo (main navbar) ---- */}
                    <Link
                        to="/"
                        className="group flex items-center gap-2.5"
                        aria-label="PrimeNest Home"
                    >
                        <span className="flex size-7 xs:size-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                            <Home className="size-4 xs:size-5" strokeWidth={2.5} />
                        </span>
                        <span className="font-heading text-lg xs:text-xl font-bold tracking-tight text-primary">
                            Prime<span className="text-accent">Nest</span>
                        </span>
                    </Link>

                    {/* ---- Nav links (desktop) ---- */}
                    <ul className="hidden items-center gap-8 lg:flex ml-3 lg:ml-10">
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

                {/* ---- Right: Auth actions ---- */}
                <div className="flex items-center gap-3">
                    <Show when="signed-in">
                        <Link to="/dashboard" className="hidden sm:block">
                            <Button size="lg">Dashboard</Button>
                        </Link>

                        {/* ---- Notifications ---- */}
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Notifications"
                            title="Notifications"
                            className="relative size-9 rounded-full text-text-secondary hover:text-primary active:text-primary"
                        >
                            <Bell className="size-4 xs:size-5" strokeWidth={2.25} />
                            <span className="absolute right-2.5 top-2 xs:right-1.5 xs:top-1.5 flex size-1 xs:size-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-error opacity-75" />
                                <span className="relative inline-flex size-1 xs:size-2 rounded-full bg-error ring-2 ring-background" />
                            </span>
                        </Button>

                        {/* ---- UserButton ---- */}
                        <UserButton
                            appearance={{
                                elements: { userButtonAvatarBox: "sm:size-8.5!" },
                            }}
                        />
                    </Show>
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <Button size="lg">
                                Sign In
                            </Button>
                        </SignInButton>
                    </Show>
                </div>
            </nav>
        </header >
    );
}