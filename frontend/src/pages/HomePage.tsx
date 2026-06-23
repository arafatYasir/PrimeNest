import FeaturedProperties from "@/components/home/FeaturedProperties"
import Hero from "@/components/home/Hero"

const HomePage = () => {
    return (
        <>
            {/* ---- Hero Section ---- */}
            <Hero />

            {/* ---- Featured Properties Section ---- */}
            <FeaturedProperties />
        </>
    )
}

export default HomePage