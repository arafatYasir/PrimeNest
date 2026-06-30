import Container from "@/components/Container";
import PropertiesFilter from "@/components/properties/PropertiesFilter";
import { useEffect } from "react";

const PropertiesPage = () => {
    // Scrolling to the top of the page
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <main>
            <Container className="py-8 sm:py-12">
                {/* ---- Header Section ---- */}
                <div className="mb-8 sm:mb-10">
                    <nav className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-text-secondary tracking-wide uppercase">
                        <a href="/" className="hover:text-text transition-colors">Home</a>
                        <span className="text-text">/</span>
                        <span className="text-text">Properties</span>
                    </nav>

                    <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text">
                        Browse Properties
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-text-secondary max-w-xl">
                        Find your prime nest from our curated selection of properties.
                    </p>
                </div>

                {/* ---- Main Content Layout ---- */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* ---- Filters Sidebar ---- */}
                    <div className="lg:col-span-1">
                        <PropertiesFilter />
                    </div>

                    {/* ---- Property Cards ---- */}
                    <div className="lg:col-span-3">
                        
                    </div>
                </div>
            </Container>
        </main>
    );
};

export default PropertiesPage;
