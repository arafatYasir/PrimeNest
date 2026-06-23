import { Search, MapPin, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-linear-to-t from-secondary/5 to-secondary/30">
            <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:py-36">
                {/* ---- Badge ---- */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-text-secondary shadow-sm">
                    <Home className="h-4 w-4 text-accent" />
                    Thousands of verified properties
                </div>

                <h1 className="font-heading text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
                    Find your{" "}
                    <span className="text-secondary">
                        Prime Nest
                    </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
                    Discover, explore, and secure your next home. Browse properties on the
                    map, search by location, and connect with sellers, all in one place.
                </p>

                {/* ---- Search Bar ---- */}
                <div className="mt-10 w-full max-w-xl">
                    <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-lg shadow-primary/5 transition-shadow focus-within:shadow-xl focus-within:shadow-primary/10">
                        <div className="flex flex-1 items-center gap-2 pl-3">
                            <MapPin className="h-5 w-5 shrink-0 text-text-secondary" />
                            <input
                                type="text"
                                placeholder="Search by city, neighborhood, or address"
                                className="w-full bg-transparent py-2.5 text-base text-text placeholder:text-text-secondary focus:outline-none"
                            />
                        </div>
                        <Button
                            size="lg"
                            className="cursor-pointer"
                        >
                            <Search className="h-4 w-4" />
                            <span className="hidden sm:inline">Search</span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}