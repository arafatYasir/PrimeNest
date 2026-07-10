import Container from "@/components/Container";
import { fetchProperty } from "@/lib/apiCalls";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"

const PropertyDetailsPage = () => {
    // Get the property id
    const { id } = useParams();

    // Fetch the property details
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["property", id],
        queryFn: () => fetchProperty(id)
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
                        <span className="text-text">{data?.title || "Property Name"}</span>
                    </nav>
                </div>
            </Container>
        </main>
    )
}

export default PropertyDetailsPage