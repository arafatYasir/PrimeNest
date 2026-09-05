import { fetchMyProperties, deleteProperty } from "@/lib/apiCalls";
import { useAuth } from "@clerk/react";
import { keepPreviousData, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { CirclePlus, Building, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardProperty from "./DashboardProperty";
import ConfirmationModal from "@/components/ConfirmationModal";
import DashboardPropertySkeleton from "./DashboardPropertySkeleton";
import type { Property } from "@/types/global";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sortOptions } from "@/lib/data";
import { toast } from "sonner";
import NotFound from "../NotFound";
import DashboardError from "../DashboardError";
import DashboardPropertyEditModal from "./DashboardPropertyEditModal";

const DashboardProperties = () => {
    // States
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("None");
    const [deletePropertyId, setDeletePropertyId] = useState<string | null>(null);
    const [editPropertyId, setEditPropertyId] = useState<string | null>(null);

    const queryClient = useQueryClient();

    // Get the user token
    const { getToken } = useAuth();

    // Fetch all properties of the current user
    const { data, isLoading, isError, error, refetch, isPlaceholderData } = useQuery({
        queryKey: ["my-properties", page, sortBy],
        queryFn: async () => {
            const token = await getToken();
            return fetchMyProperties(token ?? "", page, sortBy);
        },
        placeholderData: keepPreviousData
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken();
            return deleteProperty(id, token ?? "");
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["my-properties", page, sortBy] });
            const previousProperties = queryClient.getQueryData(["my-properties", page, sortBy]);

            queryClient.setQueryData(["my-properties", page, sortBy], (old: { properties: Property[] }) => ({
                ...old,
                properties: old?.properties.filter((p: Property) => p._id !== id)
            }));

            return { previousProperties };
        },
        onError: (error, _id, context) => {
            queryClient.setQueryData(["my-properties", page, sortBy], context?.previousProperties);

            toast.error(error.message, {
                className: "text-error!"
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["my-properties"] });
        },
        onSuccess: (data) => {
            toast.success(data.message, {
                className: "text-success!"
            });
        }
    });

    // Scroll to the top of the page on first load
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [page]);

    const handleDeleteProperty = (id: string) => {
        setDeletePropertyId(id);
    };

    const handleEditProperty = (id: string) => {
        setEditPropertyId(id);
    }

    const confirmDelete = () => {
        if (deletePropertyId) {
            deleteMutation.mutate(deletePropertyId);
            setDeletePropertyId(null);
        }
    };

    if (isError) {
        return (
            <DashboardError
                title={error.message}
                render={
                    <Button variant="outline" size="lg" onClick={() => refetch()}>
                        <RefreshCw className="size-4 mr-1" />
                        Retry
                    </Button>
                }
            />
        );
    }

    if (!isLoading && data?.properties.length === 0) {
        return (
            <NotFound
                title="No properties listed"
                icon={Building}
                description="You haven't listed any properties yet. Start listing your properties to reach potential buyers and renters."
                render={
                    <Link to="/dashboard/add-property">
                        <Button variant="secondary">
                            <CirclePlus className="size-4 mr-1" />
                            Add Property
                        </Button>
                    </Link>
                }
            />
        );
    }

    return (
        <div>
            {/* ---- Sort Dropdown ---- */}
            <div className="flex justify-start mt-6">
                <div className="w-full xs:w-56">
                    <label className="text-xs font-sans font-bold text-text uppercase tracking-wider mb-2 block">
                        Sort By
                    </label>
                    <Select
                        value={sortBy}
                        onValueChange={(value) => {
                            setSortBy(value ?? "None");
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-full h-10! rounded-lg border-border px-3.5 text-sm! text-text font-sans bg-card">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((item) => (
                                <SelectItem
                                    key={item.value}
                                    value={item.value}
                                    className="font-sans"
                                >
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
                {
                    isLoading ? (
                        Array.from({ length: 5 }).map((_, i: number) => (
                            <DashboardPropertySkeleton key={i} />
                        ))
                    ) : (
                        data?.properties.map((property: Property) => (
                            <DashboardProperty
                                key={property._id}
                                property={property}
                                onDelete={handleDeleteProperty}
                                onEdit={handleEditProperty}
                            />
                        ))
                    )
                }
            </div>

            {/* ---- Pagination ---- */}
            {
                data && data?.pagination?.totalPages > 0 && (
                    <div className="mt-10 flex items-center justify-center gap-5">
                        <Button
                            variant="outline"
                            size="lg"
                            disabled={data.pagination.currentPage <= 1 || isPlaceholderData}
                            onClick={() => setPage(prev => prev - 1)}
                        >
                            Previous
                        </Button>

                        <span className="text-sm font-medium text-text">
                            Page {data.pagination.currentPage} of {data.pagination.totalPages}
                        </span>

                        <Button
                            variant="outline"
                            size="lg"
                            disabled={data.pagination.currentPage >= data.pagination.totalPages || isPlaceholderData}
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            Next
                        </Button>
                    </div>
                )
            }

            {/* ---- Property Delete Confirmation Modal ---- */}
            <ConfirmationModal
                isOpen={deletePropertyId !== null}
                title="Delete Property"
                description="Are you sure you want to delete this property? This action cannot be undone."
                confirmText="Delete"
                onConfirm={confirmDelete}
                onClose={() => setDeletePropertyId(null)}
                isLoading={deleteMutation.isPending}
            />

            {/* ---- Property Edit Modal ---- */}
            {
                editPropertyId && <DashboardPropertyEditModal id={editPropertyId} onClose={() => setEditPropertyId(null)} />
            }
        </div>
    );
};

export default DashboardProperties;