import { useEffect } from "react";
import AboutHero from "@/components/about/AboutHero";

export default function AboutPage() {
    // Scroll to the top on first page render
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <main className="bg-background min-h-screen">
            {/* ---- About Hero Section ---- */}
            <AboutHero />
        </main>
    );
}
