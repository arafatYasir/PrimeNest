import FeaturedProperties from "@/components/home/FeaturedProperties"
import Hero from "@/components/home/Hero"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import { useEffect } from "react";

const HomePage = () => {
    // Scroll to the top on first page render
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);
    
    return (
        <>
            {/* ---- Hero Section ---- */}
            <Hero />

            {/* ---- Featured Properties Section ---- */}
            <FeaturedProperties />

            {/* ---- Why Choose Us Section ---- */}
            <WhyChooseUs />
        </>
    )
}

export default HomePage