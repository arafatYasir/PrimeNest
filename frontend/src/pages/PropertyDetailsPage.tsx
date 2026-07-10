import Container from "@/components/Container";
import { fetchProperty } from "@/lib/apiCalls";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import PropertyImageSlider from "@/components/property details/PropertyImageSlider";

const PropertyDetailsPage = () => {
    // Get the property id
    const { id } = useParams();

    // Fetch the property details
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["property", id],
        queryFn: () => fetchProperty(id!),
        enabled: !!id
    });

    if (isLoading) return <div className="text-3xl text-text font-bold text-center">Loading.....</div>

    if (isError) {
        return <div className="text-error text-3xl text-center font-semibold">{error.message}</div>
    }

    return (
        <main>
            <Container className="py-8 sm:py-12">
                {/* ---- Header Section ---- */}
                <div className="mb-8 sm:mb-10">
                    <nav className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-text-secondary tracking-wide uppercase">
                        <a href="/" className="hover:text-text active:text-text transition-colors">Home</a>
                        <span className="text-text">/</span>
                        <a href="/properties" className="hover:text-text active:text-text transition-colors">Properties</a>
                        <span className="text-text">/</span>
                        <span className="text-text">{data.title || "Property Name"}</span>
                    </nav>
                </div>

                {/* ---- Two Column Layout ---- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* ---- Left Side ---- */}
                    <div className="lg:col-span-9">
                        {/* ---- Property Image Slider / Single Image ---- */}
                        {
                            data.images.length > 1 ? (
                                // Image Slider
                                <PropertyImageSlider images={data.images} title={data.title} />
                            ) : (
                                // Single Image
                                <div className="overflow-hidden rounded-2xl border border-border/80">
                                    <img
                                        src={data.images[0]}
                                        alt={data.title}
                                        className="w-full aspect-video object-cover transition-all duration-500 hover:scale-[1.01]"
                                    />
                                </div>
                            )
                        }
                    </div>

                    {/* ---- Right Side ---- */}
                    <div>
                        HELLO World
                    </div>
                </div>
            </Container>
        </main>
    )
}

export default PropertyDetailsPage