import { Home } from "lucide-react";
import { Link } from "react-router";
import Container from "./Container";
import { FOOTER_COLUMNS } from "@/lib/data";
import type { FooterColumn } from "@/types/global";

function Footer() {
    return (
        <footer className="border-t border-border/60 bg-card">
            <Container className="py-10!">
                <div className="grid grid-cols-1 gap-y-10 sm:gap-x-20 lg:gap-x-10 sm:grid-cols-2 lg:grid-cols-12">
                    {/* ---- Logo + Description ---- */}
                    <div className="flex flex-col items-start gap-3 max-w-lg lg:col-span-5">
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
                        <p className="text-sm text-text-secondary leading-relaxed">
                            Your trusted marketplace to buy and sell properties with confidence. Whether you're searching for your dream home or listing a property, PrimeNest makes every step simple, transparent, and secure.
                        </p>
                    </div>

                    {/* ---- Link Columns ---- */}
                    {FOOTER_COLUMNS.map((column: FooterColumn) => (
                        <div key={column.title} className="flex flex-col items-start gap-4 lg:col-span-2">
                            <h4 className="text-sm font-semibold text-text">
                                {column.title}
                            </h4>
                            <ul className="flex flex-col items-start gap-2.5">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.href}
                                            className="text-sm text-text-secondary transition-colors duration-200 hover:text-text"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ---- Bottom Part ---- */}
                <div className="mt-10 border-t border-border/60 pt-6 text-center">
                    <p className="text-xs text-text-secondary">
                        &copy; {new Date().getFullYear()} PrimeNest. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;