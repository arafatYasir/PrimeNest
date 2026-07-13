interface AllPropertiesParams {
    page?: number;
    sortBy?: string;
    location?: string;
    propertyType?: string;
    propertyStatus?: string;
    listingType?: string;
    minPrice?: string;
    maxPrice?: string;
    beds?: string;
    baths?: string;
    excludeId?: string;
    limit?: number;
}

export const fetchAllProperties = async ({
    page = 1,
    sortBy = "None",
    location = "",
    propertyType = "Any",
    propertyStatus = "Any",
    listingType = "Any",
    minPrice = "",
    maxPrice = "",
    beds = "Any",
    baths = "Any",
    excludeId = "",
    limit
}: AllPropertiesParams) => {
    const queryParams: Record<string, string> = {
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
    };

    if (excludeId) {
        queryParams.excludeId = excludeId;
    }

    if (limit !== undefined) {
        queryParams.limit = String(limit);
    }

    const queries = new URLSearchParams(queryParams);

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

export const fetchPropertyStatuses = async (token?: string) => {
    const headers: HeadersInit = {};
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/statuses`, {
        headers,
        credentials: token ? "omit" : "include"
    });
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to fetch property statuses");
    }

    return data.data;
}

export const fetchUser = async (clerkId: string, token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${clerkId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to fetch user");
    }

    return data.user;
}
