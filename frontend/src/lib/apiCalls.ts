import type { AllPropertiesParams } from "@/types/global";

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

export const fetchPropertyStatuses = async (token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/statuses`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
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

export const fetchMyProperties = async (token: string, page?: number, sortBy?: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/me?page=${page}&sortBy=${sortBy || "None"}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to fetch your properties");
    }

    return data;
}

export const deleteProperty = async (id: string, token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to delete the property");
    }

    return data;
}

export const saveProperty = async (propertyId: string, token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me/saved-properties/${propertyId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to save property");
    }

    return data;
}

export const unsaveProperty = async (propertyId: string, token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me/saved-properties/${propertyId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to unsave property");
    }

    return data;
}

export const fetchSavedProperties = async (token: string, page?: number, sortBy?: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me/saved-properties?page=${page}&sortBy=${sortBy || "None"}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to fetch saved properties");
    }

    return data;
}