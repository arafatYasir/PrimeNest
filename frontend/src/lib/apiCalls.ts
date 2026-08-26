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
        throw new Error(data.message || "Failed to load properties");
    }

    return data;
}

export async function fetchProperty(id: string) {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/${id}`);
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to load the property");
    }

    return data.data;
}

export const fetchFeaturedProperties = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/featured`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to load featured properties");
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
        throw new Error(data.message || "Failed to load property statuses");
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
        throw new Error(data.message || "Failed to load your properties");
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
        throw new Error(data.message || "Failed to load saved properties");
    }

    return data;
}

export const uploadProfilePhoto = async (formData: FormData, token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me/profile-photo`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to upload profile photo");
    }

    return data;
}

export const updateAgentProfile = async (
    profileData: { fullName: string; phone: string; bio: string },
    token: string
) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
    });
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to update profile");
    }

    return data;
}

export const createProperty = async (token: string, formData: FormData) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to create property");
    }

    return data;
}

export const fetchPendingProperties = async (token: string, page?: number, sortBy?: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/pending?page=${page}&sortBy=${sortBy || "None"}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to load pending properties");
    }

    return data;
}

export const approveProperty = async (id: string, token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/${id}/approve`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to approve property");
    }

    return data;
}

export const rejectProperty = async (id: string, token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/${id}/reject`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to reject property");
    }

    return data;
}

export const fetchActivities = async (token: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/activities`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to load recent activities");
    }

    return data.data;
}

export const fetchNotifications = async (token: string, page: number, limit: number, signal?: AbortSignal) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/notifications?page=${page}&limit=${limit}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        signal
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message || "Failed to load recent notifications");
    }

    return data;
}