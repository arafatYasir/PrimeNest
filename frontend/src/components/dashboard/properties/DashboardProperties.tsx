import { fetchMyProperties } from "@/lib/apiCalls";
import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query"

const DashboardProperties = () => {
    // Get the user token
    const { getToken } = useAuth();

    // Fetch all properties of the current user
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["my-properties"],
        queryFn: async () => {
            const token = await getToken();
            return fetchMyProperties(token ?? "");
        }
    });

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    console.log(data);

    return (
        <div></div>
    )
}

export default DashboardProperties