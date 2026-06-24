import FeaturedProperties from "@/components/home/FeaturedProperties"
import Hero from "@/components/home/Hero"
import WhyChooseUs from "@/components/home/WhyChooseUs"

const HomePage = () => {
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