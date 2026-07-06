import { useEffect } from "react";
import AboutHero from "@/components/about/AboutHero";
import WhyBuiltPrimeNest from "@/components/about/WhyBuiltPrimeNest";
import WhatMakesUsDifferent from "@/components/about/WhatMakesUsDifferent";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
    // Scroll to the top on first page render
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <main className="bg-background min-h-screen">
            {/* ---- Hero ---- */}
            <AboutHero />

            {/* ---- Why We Built PrimeNest ---- */}
            <WhyBuiltPrimeNest />

            {/* ---- What Makes Us Different ---- */}
            <WhatMakesUsDifferent />

            {/* ---- CTA: Call To Action ---- */}
            <AboutCTA />
        </main>
    );
}
