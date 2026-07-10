interface AllPropertiesParams {
    page: number;
    sortBy: string;
    location: string;
    propertyType: string;
    propertyStatus: string;
    listingType: string;
    minPrice: string;
    maxPrice: string;
    beds: string;
    baths: string;
}

export const fetchAllProperties = async ({
    page,
    sortBy,
    location,
    propertyType,
    propertyStatus,
    listingType,
    minPrice,
    maxPrice,
    beds,
    baths
}: AllPropertiesParams) => {
    const queries = new URLSearchParams({
        page: String(page),
        sortBy,
        location,
        propertyType,
        propertyStatus,
        listingType,
        minPrice,
        maxPrice,
        beds,
        baths,
    });

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties?${queries}`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch properties");
    }

    return data;
}

export async function fetchProperty(id: string) {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/${id}`);
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to fetch the property");
    }

    return data.data;
}

export const fetchFeaturedProperties = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/featured`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch featured properties");
    }

    return data;
}