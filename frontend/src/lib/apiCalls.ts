export const fetchFeaturedProperties = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/featured`);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch featured properties");
    }

    return data;
}